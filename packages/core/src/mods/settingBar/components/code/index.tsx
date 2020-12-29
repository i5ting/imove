import React, { useState, useEffect } from 'react';

import 'antd/es/modal/style';
import 'antd/es/button/style';
import styles from './index.module.less';

import { Graph } from '@antv/x6';
import { Button, Modal } from 'antd';
import CodeEditor from '../../../../components/codeEditor';

interface IProps {
  value: any;
  name: string;
  title: string;
  flowChart: Graph;
  onValueChange: (value: string) => void;
}

const Code: React.FC<IProps> = (props) => {
  const { title, value, onValueChange, flowChart } = props;
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    flowChart.on('node:dblclick', () => {
      onClickEdit();
    });
  }, []);

  // events
  const onClickEdit = (): void => {
    setVisible(true);
  };
  const onClickCancel = (): void => {
    setVisible(false);
  };
  const onClickOk = (newJson: string): void => {
    setVisible(false);
    onValueChange(newJson);
  };

  return (
    <div className={styles.container}>
      <p className={styles.titleText}>{title}</p>
      <Button block={true} className={styles.btn} onClick={onClickEdit}>
        编辑
      </Button>
      <EditModal
        title={title}
        value={value}
        visible={visible}
        onOk={onClickOk}
        onCancel={onClickCancel}
      />
    </div>
  );
};

interface IEditorModalProps {
  visible: boolean;
  title: string;
  value: string;
  onOk: (val: string) => void;
  onCancel: () => void;
}

const EditModal: React.FC<IEditorModalProps> = (props) => {
  const { visible, title, value, onOk, onCancel } = props;
  const [code, setCode] = useState<string>(value);

  // life
  useEffect(() => {
    // set value when opening modal
    // clear content when closing modal
    if (visible) {
      setCode(value);
    } else {
      setCode('');
    }
  }, [visible]);

  // events
  const onClickOk = (): void => {
    onOk(code);
  };
  const onChangeCode = (ev: any, newCode: string | undefined = ''): void => {
    if (newCode !== code) {
      setCode(newCode);
    }
  };

  return (
    <Modal
      className={styles.editModal}
      width={800}
      title={title}
      okText={'保存'}
      visible={visible}
      cancelText={'取消'}
      onOk={onClickOk}
      onCancel={onCancel}
    >
      <CodeEditor
        value={code}
        width={'100%'}
        height={'600px'}
        onChange={onChangeCode}
      />
    </Modal>
  );
};

export default Code;
