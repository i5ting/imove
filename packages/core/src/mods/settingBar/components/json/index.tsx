import React, { useState, useEffect } from 'react';

import 'antd/es/modal/style';
import 'antd/es/button/style';
import 'antd/es/message/style';
import styles from './index.module.less';

// import AceEditor from 'react-ace';
import { ControlledEditor } from "@monaco-editor/react";
import JsonView from 'react-json-view';
import { Button, Modal, message } from 'antd';
import { safeParse } from '../../../../utils';
// import 'ace-builds/src-noconflict/mode-json';
// import 'ace-builds/src-noconflict/theme-dracula';
// import 'ace-builds/src-noconflict/snippets/json';
// import 'ace-builds/src-noconflict/ext-language_tools';

interface IJsonProps {
  value: any;
  name: string;
  title: string;
  onValueChange: (value: string) => void;
}

const Json: React.FC<IJsonProps> = (props) => {
  const { title, value, onValueChange } = props;
  const [visible, setVisible] = useState<boolean>(false);

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
      <JsonView
        name={null}
        collapsed={true}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        src={safeParse(value)}
      />
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
  height: 400,
};
const CODE_EDITOR_OPTIONS = {
  useWorker: false,
};

const EditModal: React.FC<IEditorModalProps> = (props) => {
  const { visible, title, value, onOk, onCancel } = props;
  const [json, setJson] = useState<string>('');

  // life
  useEffect(() => {
    // set value when opening modal
    // clear content when closing modal
    if (visible) {
      setJson(value);
    } else {
      setJson('');
    }
  }, [visible]);

  // events
  const onClickOk = (): void => {
    try {
      JSON.parse(json);
      onOk(json);
    } catch (error) {
      message.error('内容必须是合法json');
      console.log('save failed, the error is:', error.message);
    }
  };
  const onChangeJson = (ev: any, newJson: string): void => {
    if (newJson !== json) {
      setJson(newJson);
    }
  };

  return (
    <Modal
      className={styles.editModal}
      title={title}
      okText={'保存'}
      visible={visible}
      cancelText={'取消'}
      onOk={onClickOk}
      onCancel={onCancel}
    >
      <ControlledEditor
        width="100%"
        height="400px"
        value={json}
        // @ts-ignore
        onChange={onChangeJson}
        language="javascript"
        theme="dark"
      />
      {/* <AceEditor
        style={CODE_EDITOR_STYLE}
        tabSize={2}
        value={json}
        focus={true}
        mode={'json'}
        theme={'dracula'}
        name={'json-editor'}
        enableSnippets={true}
        enableBasicAutocompletion={true}
        setOptions={CODE_EDITOR_OPTIONS}
        onChange={onChangeJson}
      /> */}
    </Modal>
  );
};

export default Json;
