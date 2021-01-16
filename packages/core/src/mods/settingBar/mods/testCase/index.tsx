import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import { Modal } from 'antd';
import { Graph } from '@antv/x6';
import { executeScript } from '../../../../utils';
import CodeRun from '../../../../components/codeRun';
import { compileForOnline } from '@imove/compile-code';
import { toSelectedCellsJSON } from '../../../../utils/flowChartUtils';

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
    // TODO: 展示运行结果
    const compiledCode = compileForOnline(toSelectedCellsJSON(flowChart));
    executeScript(compiledCode);
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

  const onChange = (value: any) => {
    // console.log({ value })
  }

  return (
    <Modal
      width={1000}
      centered={true}
      bodyStyle={{ padding: 0, height: 600 }}
      title={'执行代码'}
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
