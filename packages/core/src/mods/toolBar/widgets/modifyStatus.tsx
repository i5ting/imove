import React, { useEffect, useState } from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';

enum Status {
  pending = 0,
  syncing = 1,
  successful = 2,
  failed = 3,
}

interface IProps {
  flowChart: Graph;
}

const statusMap = {
  [Status.pending]: {
    color: '',
    text: '',
  },
  [Status.syncing]: {
    color: '#999',
    text: '正在保存...',
  },
  [Status.successful]: {
    color: '#999',
    text: '所有更改已保存',
  },
  [Status.failed]: {
    color: '#EC5B56',
    text: '同步失败，进入离线模式',
  },
};

const ModifyStatus: React.FC<IProps> = (props) => {
  const { flowChart } = props;
  const [status, setStatus] = useState<Status>(Status.pending);

  useEffect(() => {
    flowChart.on('graph:change:modify', () => {
      setStatus(Status.syncing);
    });
    flowChart.on('graph:modified', (res: any) => {
      const { success } = res;
      if (success) {
        setStatus(Status.successful);
      } else {
        setStatus(Status.failed);
      }
    });
    return () => {
      flowChart.off('graph:change:modify');
      flowChart.off('graph:modified');
    };
  }, []);

  const { color, text } = statusMap[status];
  return status === Status.pending ? null : (
    <div className={styles.modifyStatusContainer}>
      <span style={{ color }}>{text}</span>
    </div>
  );
};

export default ModifyStatus;
