import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';
import { Modal } from 'antd';
import JsonView from 'react-json-view';
import CodeEditor from '../../../../components/codeEditor';

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

// mock
const defaultInputData = `const inputData = {
  // 上游数据
  pipe: {

  },
  // 公用数据
  context: {

  },
  // 通用数据
  payload: {
    
  }
}`;
const mockRunResult = {
  pipe: {
    success: false,
    message: '未登录'
  },
  context: {
    data: {
      isLogin: false
    }
  }
}

const EditModal: React.FC<IEditModalProps> = (props): JSX.Element => {
  const { visible, onOk, onCancel } = props;
  return (
    <Modal
      className={styles.editModal}
      width={800}
      title={'运行代码'}
      visible={visible}
      okText={'运行一次'}
      cancelText={null}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div className={styles.content}>
        <div className={styles.half}>
          <p>输入：</p>
          <CodeEditor
            width={'350px'}
            height={'400px'}
            value={defaultInputData}
          />
        </div>
        <div className={styles.half}>
          <p>输出：</p>
          <JsonView
            name={null}
            collapsed={false}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            src={mockRunResult}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TestCase;
