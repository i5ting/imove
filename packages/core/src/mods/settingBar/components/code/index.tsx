import React, { useState, useEffect } from 'react';

import 'antd/es/modal/style';
import 'antd/es/button/style';
import styles from './index.module.less';

import { Graph } from '@antv/x6';
import { Button, Modal, message } from 'antd';
import CodeEditor from '../../../../components/codeEditor';
import { monaco, EditorDidMount } from '@monaco-editor/react';

interface IProps {
  value: any;
  name: string;
  title: string;
  flowChart: Graph;
  onValueChange: (value: string) => void;
}

// NOTE: avoid monaco init many times
let KeyMod: any = {};
let KeyCode: any = {};
monaco.init().then(monaco => {
  KeyMod = monaco.KeyMod;
  KeyCode = monaco.KeyCode;
});

const Code: React.FC<IProps> = (props) => {
  const { title, value, onValueChange, flowChart } = props;
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    flowChart.on('settingBar:clickEditCode', onClickEdit);
    return () => {
      flowChart.off('settingBar:clickEditCode', onClickEdit);
    };
  }, []);

  // events
  const onClickEdit = (): void => {
    setVisible(true);
  };
  const onClickCancel = (): void => {
    setVisible(false);
  };
  const onClickOk = (newCode: string): void => {
    setVisible(false);
    onValueChange(newCode);
  };
  const onSave = (newCode: string): void => {
    onValueChange(newCode);
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
        onSave={onSave}
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
  onSave: (val: string) => void;
  onOk: (val: string) => void;
  onCancel: () => void;
}

const EditModal: React.FC<IEditorModalProps> = (props) => {
  const { visible, title, value, onSave, onOk, onCancel } = props;
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
  const onEditorDidMount: EditorDidMount = (getEditorValue, editor) => {
    // doc: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html#addcommand
    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_S, () => {
      onSave(getEditorValue());
      message.success('保存成功', 1);
    });
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
        editorDidMount={onEditorDidMount}
      />
    </Modal>
  );
};

export default Code;
