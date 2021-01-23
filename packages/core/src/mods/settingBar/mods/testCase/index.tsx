import React, { useState, useEffect, useCallback } from 'react';

import { Modal } from 'antd';
import { Graph } from '@antv/x6';
import CodeRun from '../../../../components/codeRun';

interface IProps {
  flowChart: Graph;
  selectedCell: any;
}

const TestCase: React.FC<IProps> = (props) => {
  const { flowChart } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    flowChart.on('settingBar:runCode', showModal);
    return () => {
      flowChart.off('settingBar:runCode', showModal);
    };
  }, [flowChart]);

  const showModal = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);

  return (
    <EditModal visible={visible} flowChart={flowChart} onClose={closeModal} />
  );
};

interface IEditModalProps {
  visible: boolean;
  flowChart: Graph;
  onClose: () => void;
}

const EditModal: React.FC<IEditModalProps> = (props): JSX.Element => {
  const { visible, flowChart, onClose } = props;

  return (
    <Modal
      width={1000}
      centered={true}
      bodyStyle={{ padding: 0, height: 650 }}
      title={'执行代码'}
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      <CodeRun flowChart={flowChart} />
    </Modal>
  );
};

export default TestCase;
