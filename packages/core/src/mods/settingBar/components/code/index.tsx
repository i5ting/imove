import React, { useState, useEffect } from 'react';

import 'antd/es/modal/style';
import 'antd/es/button/style';
import styles from './index.module.less';

import { Graph } from '@antv/x6';
import { Button, Modal, message } from 'antd';
import { monaco, EditorDidMount } from '@monaco-editor/react';
import CodeEditor from '../../../../components/codeEditor';
import CodeRun from '../../../../components/codeRun';
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
  const [editorInst, setEditorInst] = useState<any>();
  const [codeRunVisible, setCodeRunVisible] = useState<boolean>(false);

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
  useEffect(() => {
    if (editorInst) {
      // NOTE: how to add command(https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html#addcommand)
      editorInst.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_S, () => {
        onSave(editorInst.getValue());
        message.success('保存成功', 1);
      });
    }
  }, [editorInst, onSave]);

  // events
  const onEditOk = (): void => {
    // onOk(code);
    setCodeRunVisible(true)
  };

  const onRunOk = (): void => {
    // setCodeRunVisible(false)
  }
  const onRunCancel = (): void => {
    setCodeRunVisible(false)
  }
  const onChangeCode = (ev: any, newCode: string | undefined = ''): void => {
    if (newCode !== code) {
      setCode(newCode);
    }
  };
  const onEditorDidMount: EditorDidMount = (getEditorValue, editor) => {
    setEditorInst(editor);
  };

  return (
    <Modal
      className={styles.editModal}
      width={1000}
      title={title}
      okText={'执行代码'}
      visible={visible}
      cancelText={'取消'}
      onOk={onEditOk}
      onCancel={onCancel}
    >
      <CodeEditor
        value={code}
        width={'100%'}
        height={'600px'}
        onChange={onChangeCode}
        editorDidMount={onEditorDidMount}
      />
      <Modal
        className={styles.runModal}
        width={1000}
        title={'执行代码'}
        okText={'运行'}
        visible={codeRunVisible}
        cancelText={'取消'}
        onOk={onRunOk}
        onCancel={onRunCancel}
      >
        <CodeRun />
      </Modal>
    </Modal>
  );
};

export default Code;
