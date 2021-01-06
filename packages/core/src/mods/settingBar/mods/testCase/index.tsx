import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { Graph } from '@antv/x6';
import { Modal } from 'antd';
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
  const runCode = useCallback(() => {
    // TODO: 运行节点代码
  }, []);

  return (
    <EditModal
      visible={visible}
      onOk={runCode}
      onCancel={closeModal}
    />
  );
};

interface IEditModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const EditModal: React.FC<IEditModalProps> = (props): JSX.Element => {
  const { visible, onOk, onCancel } = props;
  return (
    <Modal
      width={1400}
      centered={true}
      bodyStyle={{ height: 700, overflowY: 'auto' }}
      title={'运行代码'}
      visible={visible}
      okText={'运行'}
      cancelText={'取消'}
      onOk={onOk}
      onCancel={onCancel}
    >
      <CodeRun />
    </Modal>
  );
};

export default TestCase;
