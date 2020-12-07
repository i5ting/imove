import React, { useState, useEffect } from 'react';

import 'antd/es/tag/style';
import 'antd/es/modal/style';
import 'antd/es/message/style';
import styles from './index.module.less';

import { Graph } from '@antv/x6';
import EditModal from './editModal';
import { Tag, Modal, message } from 'antd';
import { localConnect } from '../../../api';

enum Status {
  connected = 'success',
  disconnected = 'error',
}

interface IProps {
  flowChart: Graph;
}

const PULSE_RATE = 10 * 1000; // try to connect to local servet per 10 seconds

const ConnectStatus: React.FC<IProps> = (props) => {
  const { flowChart } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.disconnected);

  // life
  useEffect(() => {
    confirmToSync();
    const timer = setInterval(syncLocal, PULSE_RATE);
    return () => clearInterval(timer);
  }, []);

  // network
  const syncLocal = () => {
    return localConnect()
      .then((res) => res.json())
      .then((data = {}) => {
        const { projectName } = data;
        setStatus(Status.connected);
        setProjectName(projectName);
        return data;
      })
      .catch((error) => {
        setStatus(Status.disconnected);
        console.log('connect local failed, the error is:', error.message);
      });
  };
  const confirmToSync = () => {
    syncLocal().then((data) => {
      const { dsl } = data || {};
      dsl &&
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
    });
  };

  // events
  const onOpenEditModal = (): void => {
    setVisible(true);
  };
  const onCloseEditModal = (): void => {
    setVisible(false);
  };
  const onOk = (): void => {
    onCloseEditModal();
    confirmToSync();
  };

  let tagText = '本地连接失败 点击修改配置';
  if (status === Status.connected) {
    tagText = [projectName, '本地连接成功'].join(' ');
  }

  return (
    <div className={styles.container}>
      <Tag className={styles.tag} color={status} onClick={onOpenEditModal}>
        {tagText}
      </Tag>
      <EditModal visible={visible} onOk={onOk} onCancel={onCloseEditModal} />
    </div>
  );
};

export default ConnectStatus;
