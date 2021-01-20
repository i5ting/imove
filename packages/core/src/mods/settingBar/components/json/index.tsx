import React, { useState, useEffect, useRef, useMemo } from 'react';
import Generator from 'fr-generator';
import 'antd/es/modal/style';
import 'antd/es/button/style';
import 'antd/es/message/style';
import JsonView from 'react-json-view';
import { Button, Tabs, Modal, Card, message } from 'antd';
import { safeParse } from '../../../../utils';
import CodeEditor from '../../../../components/codeEditor';
import SchemaForm from '../../../../components/schemaForm';
import { compData } from './json';
import styles from './index.module.less';
const { TabPane } = Tabs;

const JSON_TAB = 'JsonTab';
const VISUAL_TAB = 'VisualTab';

interface IJsonProps {
  value: any;
  name: string;
  title: string;
  selectedCell?: any;
  isConfig?: boolean;
  onValueChange: (value: string) => void;
}

interface IConfigData {
  [key: string]: any;
}

interface ISchemaProps {
  type: string;
  properties: { [key: string]: any };
}

const Json: React.FC<IJsonProps> = (props) => {
  const { title, value, isConfig, onValueChange, selectedCell } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [schema, setSchema] = useState<ISchemaProps>({
    type: '',
    properties: {},
  });

  const defaultSchema = useMemo(() => {
    if (selectedCell) {
      const { configSchema } = selectedCell.getData();
      if (configSchema) {
        const schema = JSON.parse(configSchema).schema;
        setSchema(schema);
        return schema;
      }
    }
  }, [selectedCell]);

  const defaultConfigData = useMemo(() => {
    if (selectedCell) {
      const { configData = {} } = selectedCell.getData();
      return configData;
    }
  }, [selectedCell]);

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
  const changeSchema = (schema: ISchemaProps) => {
    setVisible(false);
    setSchema(schema);
  };
  const changeConfigData = (configData: IConfigData) => {
    selectedCell && selectedCell.setData({ configData });
  };

  return (
    <Card
      title={title}
      extra={
        <Button type="link" onClick={onClickEdit}>
          编辑
        </Button>
      }
    >
      {!isConfig && (
        <JsonView
          name={null}
          collapsed={true}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          src={safeParse(value)}
        />
      )}

      {isConfig && (
        <SchemaForm
          schema={schema}
          changeConfigData={changeConfigData}
          configData={defaultConfigData}
        />
      )}

      <EditModal
        title={title}
        value={value}
        visible={visible}
        isConfig={props.isConfig}
        onOk={onClickOk}
        onCancel={onClickCancel}
        changeSchema={changeSchema}
        defaultSchema={defaultSchema}
      />
    </Card>
  );
};

interface IEditorModalProps {
  visible: boolean;
  title: string;
  value: string;
  isConfig?: boolean;
  defaultSchema: object;
  onOk: (val: string) => void;
  onCancel: () => void;
  changeSchema: (val: ISchemaProps) => void;
}

interface FormInstance {
  setValue: (val: object) => void;
  getValue: () => {
    schema: ISchemaProps;
  };
}

const EditModal: React.FC<IEditorModalProps> = (props) => {
  const { visible, title, value, onOk, onCancel, defaultSchema } = props;
  const [json, setJson] = useState<string>('');
  const [tab, setTab] = useState<string>(VISUAL_TAB);
  const formRef = useRef<FormInstance>(null);

  const defaultValue = useMemo(() => {
    if (defaultSchema && Object.keys(defaultSchema).length > 0) {
      const codeObj = {
        schema: Object.assign({}, defaultSchema),
        displayType: 'row',
        showDescIcon: true,
      };
      return codeObj;
    }
  }, [defaultSchema]);

  const tabChange = (tab: string) => {
    if (tab === JSON_TAB) {
      setTab(JSON_TAB);
      form2code();
    }
    if (tab === VISUAL_TAB) {
      setTab(VISUAL_TAB);
      code2form();
    }
  };

  const form2code = () => {
    const formSchema = formRef.current && formRef.current.getValue();
    setJson(JSON.stringify(formSchema, null, 2));
  };

  const code2form = () => {
    try {
      const codeObj = JSON.parse(json);
      formRef.current && formRef.current.setValue(codeObj);
    } catch (error) {
      console.log(
        "can't parse code string to form schema, the error is:",
        error.message,
      );
    }
  };

  const onJsonChange = (ev: any, newJson: string | undefined = ''): void => {
    setJson(newJson);
    props.isConfig && code2form();
  };

  // life
  useEffect(() => {
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
        if (tab === VISUAL_TAB && formRef.current) {
          const value = formRef.current.getValue();
          props.changeSchema(formRef.current.getValue().schema);
          setJson(JSON.stringify(value, null, 2));
          onOk(JSON.stringify(value));
        } else {
          props.changeSchema(JSON.parse(json).schema);
          onOk(json);
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
      {props.isConfig ? (
        <Tabs
          type="card"
          tabBarGutter={0}
          defaultActiveKey={'basic'}
          onChange={tabChange}
          tabBarStyle={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TabPane className={styles.tabPane} tab={'可视化'} key={'VisualTab'}>
            <div className={styles.form}>
              <Generator
                ref={formRef}
                settings={[
                  {
                    title: '表单组件库',
                    widgets: compData,
                  },
                ]}
                defaultValue={defaultValue}
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
        </Tabs>
      ) : (
        <CodeEditor
          value={json}
          width={'100%'}
          height={'600px'}
          language={'json'}
          onChange={onJsonChange}
        />
      )}
    </Modal>
  );
};

export default Json;
