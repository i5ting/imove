import React, { useState, useEffect, useRef } from 'react';
import Generator from 'fr-generator';
import 'antd/es/modal/style';
import 'antd/es/button/style';
import 'antd/es/message/style';
import JsonView from 'react-json-view';
import { Button, Tabs, Modal, Card, message } from 'antd';
const { TabPane } = Tabs;
import { safeParse } from '../../../../utils';
import CodeEditor from '../../../../components/codeEditor';
import SchemaForm from '../../../../components/schemaForm'

import { compData } from './json'
import styles from './index.module.less';
interface IJsonProps {
  value: any;
  name: string;
  title: string;
  isConfig?: boolean; // true为为可视化、json联动输入框，false为普通json输入框
  onValueChange: (value: string) => void;
}

const Json: React.FC<IJsonProps> = (props) => {
  const { title, value, isConfig, onValueChange } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [schema, setSchema] = useState({})

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
  const changeSchema = (schema: object) => {
    setVisible(false);
    setSchema(schema);
  }

  return (
    <Card title={title} extra={<Button type="link" onClick={onClickEdit}>编辑</Button>}>
      {!isConfig && <JsonView
        name={null}
        collapsed={true}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        src={safeParse(value)}
      />}

      {/* @ts-ignore */}
      {isConfig && <SchemaForm schema={schema} />}

      <EditModal
        title={title}
        value={value}
        visible={visible}
        isConfig={props.isConfig}
        onOk={onClickOk}
        onCancel={onClickCancel}
        changeSchema={changeSchema}
      />
    </Card>
  );
};

interface IEditorModalProps {
  visible: boolean;
  title: string;
  value: string;
  isConfig?: boolean;
  onOk: (val: string) => void;
  onCancel: () => void;
  changeSchema: (val: object) => void
}

const EditModal: React.FC<IEditorModalProps> = (props) => {
  const { visible, title, value, onOk, onCancel } = props;
  const [json, setJson] = useState<string>('');
  const formRef = useRef<HTMLDivElement>()

  const tabChange = (tab: string) => {
    const JSON_TAB = 'JsonTab'
    const VISUAL_TAB = 'VisualTab'
    if (tab === JSON_TAB) form2code() // 可视化同步到编辑器
    if (tab === VISUAL_TAB) code2form() // 编辑器同步到可视化
  }

  const form2code = () => {
    // @ts-ignore
    const formSchema = formRef.current && formRef.current.getValue()
    setJson(JSON.stringify(formSchema, null, 2))
  }

  const code2form = () => {
    try {
      const codeObj = JSON.parse(json)
      // @ts-ignore
      formRef.current.setValue(codeObj)
    } catch (error) {
      console.log('can\'t parse code string to form schema, the error is:', error.message);
    }
  }

  const onJsonChange = (ev: any, newJson: string | undefined = ''): void => {
    setJson(newJson)
    props.isConfig && code2form()
  }

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
      if (props.isConfig) {
        if (JSON.stringify(JSON.parse(json)) === '{}') {
          // @ts-ignore
          const value = formRef.current && formRef.current.getValue()
          props.changeSchema(value.schema)
          setJson(value)
        } else {
          props.changeSchema(JSON.parse(json).schema)
        }
      } else {
        JSON.parse(json);
        onOk(json);
      }
    } catch (error) {
      message.error('内容必须是合法json');
      console.log('save failed, the error is:', error.message);
    }
  };

  return (
    <Modal
      className={styles.editModal}
      width={props.isConfig ? 1200 : 800}
      title={title}
      okText={'保存'}
      visible={visible}
      cancelText={'取消'}
      onOk={onClickOk}
      onCancel={onCancel}
    >
      {props.isConfig ?
        <Tabs
          type="card"
          tabBarGutter={0}
          defaultActiveKey={'basic'}
          onChange={tabChange}
          tabBarStyle={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TabPane className={styles.tabPane} tab={'可视化'} key={'VisualTab'}>
            <div className={styles.form}>
              <Generator
                ref={formRef}
                settings={[{
                  title: '表单组件库',
                  widgets: compData,
                }]}
              />
            </div>
          </TabPane>
          <TabPane className={styles.tabPane} tab={'JSON'} key={'JsonTab'}>
            <div className={styles.configInput}>
              <CodeEditor
                width={'100%'}
                language={'json'}
                value={json}
                onChange={onJsonChange}
              />
            </div>
          </TabPane>
        </Tabs> :
        <CodeEditor
          value={json}
          width={'100%'}
          height={'600px'}
          language={'json'}
          onChange={onJsonChange}
        />
      }
    </Modal>
  );
};

export default Json;
