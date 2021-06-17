import React, { useState, useCallback } from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';
import { Modal, message } from 'antd';
import Guide from './guide';
import Export from './export';
import ImportDSL from './importDSL';
import ImportNodes from './ImportNodes';
import ConnectStatus, { Status } from './connectStatus';
import Configuration from './configuration';
import { localConnect } from '../../api';

interface IProps {
  flowChart: Graph;
}

const Header: React.FC<IProps> = (props: IProps) => {
  const { flowChart } = props;
  const [projectName, setProjectName] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.disconnected);

  // network
  const syncLocal = useCallback(() => {
    return localConnect()
      .then((res) => res.json())
      .then((data = {}) => {
        setStatus(Status.connected);
        setProjectName(data.projectName);
        return data;
      })
      .catch((error) => {
        console.log(error);
        setStatus(Status.disconnected);
        console.log('connect local failed, the error is:', error.message);
      });
  }, [setStatus, setProjectName]);

  const confirmToSync = useCallback(() => {
    return syncLocal().then((data) => {
      const { dsl } = data || {};
      if (dsl) {
        Modal.confirm({
          title: '本地连接成功，是否将数据同步至当前项目？',
          onOk() {
            try {
              flowChart.fromJSON(dsl);
            } catch (error) {
              message.error('同步失败！');
            }
          },
        });
      }
    });
  }, [syncLocal, flowChart]);

  return (
    <div className={styles.container}>
      <a href="https://github.com/imgcook/imove">
        <span className={styles.titleText}>iMove</span>
      </a>
      <div className={styles.widgets}>
        <Guide />
        <Export flowChart={flowChart} />
        <ImportDSL flowChart={flowChart} />
        <ImportNodes />
        <ConnectStatus
          status={status}
          projectName={projectName}
          syncLocal={syncLocal}
          confirmToSync={confirmToSync}
        />
        <Configuration confirmToSync={confirmToSync} />
      </div>
    </div>
  );
};

export default Header;
