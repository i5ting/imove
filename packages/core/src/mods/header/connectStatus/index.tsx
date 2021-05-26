import React, { useState, useEffect } from 'react';

import 'antd/es/tag/style';
import { Tag } from 'antd';
import styles from './index.module.less';

export enum Status {
  connected = 'success',
  disconnected = 'error',
}

interface IProps {
  // flowChart: Graph;
  status: Status;
  projectName: string;
  syncLocal: () => Promise<void>;
  confirmToSync: () => Promise<void>;
}

const PULSE_RATE = 10 * 1000; // try to connect to local servet per 10 seconds

const ConnectStatus: React.FC<IProps> = (props: IProps) => {
  const { status, confirmToSync, syncLocal, projectName } = props;

  // life
  useEffect(() => {
    confirmToSync();
    const timer = setInterval(syncLocal, PULSE_RATE);
    return () => clearInterval(timer);
  }, []);

  let tagText = '本地连接失败';
  if (status === Status.connected) {
    tagText = [projectName, '本地连接成功'].join(' ');
  }

  return (
    <div className={styles.container}>
      <Tag color={status}>{tagText}</Tag>
    </div>
  );
};

export default ConnectStatus;
