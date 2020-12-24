import React, { useState, useEffect } from 'react';

import 'antd/es/modal/style';
import 'antd/es/button/style';
import styles from './index.module.less';

import AceEditor from 'react-ace';
import { Button, Modal } from 'antd';
import {  Graph } from '@antv/x6';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/ext-language_tools';

interface IProps {
  value: any;
  name: string;
  title: string;
  onValueChange: (value: string) => void;
  flowChart: Graph;
}

const Code: React.FC<IProps> = (props) => {
  const { title, value, onValueChange, flowChart } = props;
  const [visible, setVisible] = useState<boolean>(false);

  flowChart.on('cell:dblclick', (args) => {
    onClickEdit()
  });

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

const CODE_EDITOR_STYLE = {
  width: '100%',
  height: 600,
};
const CODE_EDITOR_OPTIONS = {
  fontSize: 14,
  useWorker: false,
};

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
  const onChangeCode = (newCode: string): void => {
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
      <AceEditor
        style={CODE_EDITOR_STYLE}
        tabSize={2}
        value={code}
        focus={true}
        theme={'dracula'}
        mode={'javascript'}
        name={'code-editor'}
        enableSnippets={true}
        enableLiveAutocompletion={true}
        enableBasicAutocompletion={true}
        setOptions={CODE_EDITOR_OPTIONS}
        onChange={onChangeCode}
      />
    </Modal>
  );
};

export default Code;
