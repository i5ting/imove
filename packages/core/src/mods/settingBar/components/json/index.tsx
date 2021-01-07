import React, { useState, useEffect } from 'react';

import 'antd/es/modal/style';
import 'antd/es/button/style';
import 'antd/es/message/style';
import styles from './index.module.less';

import JsonView from 'react-json-view';
import { Button, Modal, message } from 'antd';
import { safeParse } from '../../../../utils';
import CodeEditor from '../../../../components/codeEditor';
import CodeRun from '../../../../components/codeRun';

interface IJsonProps {
  value: any;
  name: string;
  title: string;
  onlyInput?: boolean;
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
        onlyInput={props.onlyInput}
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
  onlyInput?: boolean;
  onOk: (val: string) => void;
  onCancel: () => void;
}

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
  const onChangeJson = (ev: any, newJson: string | undefined = ''): void => {
    // TODO 投放配置schema转化、普通json识别
    console.log({ newJson })
    if (newJson !== json) {
      setJson(newJson);
    }
  };

  return (
    <Modal
      className={styles.editModal}
      width={props.onlyInput ? 800 : 1200}
      title={title}
      okText={'保存'}
      visible={visible}
      cancelText={'取消'}
      onOk={onClickOk}
      onCancel={onCancel}
    >
      {props.onlyInput ?
        <CodeEditor
          value={json}
          width={'100%'}
          height={'600px'}
          language={'json'}
          onChange={onChangeJson}
        /> :
        <CodeRun isConfig={true} onChange={onChangeJson} />
      }
    </Modal>
  );
};

export default Json;
