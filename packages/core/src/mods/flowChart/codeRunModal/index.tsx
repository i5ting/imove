import React, { useState, useEffect, useCallback } from 'react';

import styles from './index.module.less';

import { Modal } from 'antd';
import { Graph } from '@antv/x6';
import CodeRun from '../../../components/codeRun';

interface IEditModalProps {
  title?: string;
  flowChart: Graph;
}

const CodeRunModal: React.FC<IEditModalProps> = (props): JSX.Element => {
  const { title = '执行代码', flowChart } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(true);
    flowChart.on('graph:runCode', handler);
    return () => {
      flowChart.off('graph:runCode', handler);
    };
  }, [flowChart]);

  // events
  const onClose = useCallback((): void => {
    setVisible(false);
  }, []);

  return (
    <Modal
      className={styles.modal}
      width={1000}
      title={title}
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      <CodeRun flowChart={flowChart} />
    </Modal>
  );
};

export default CodeRunModal;
