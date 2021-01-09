import React from 'react';
import JsonView from 'react-json-view';
import { Tabs, Form, Input, Button, Space } from 'antd';
const { TabPane } = Tabs;
import CodeEditor from '../codeEditor';
import { inputJson, outputJson } from './json'
import styles from './index.module.less';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
interface IProps {
  onChange: (value: object) => void
}
interface MyFormItemProps {
  type: string
}

const MyFormItem: React.FC<MyFormItemProps> = (props) => {
  return (
    <>
      <h3>{props.type}</h3>
      <Form.List name={props.type}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  label="key"
                  name={[field.name, 'key']}
                  fieldKey={[field.fieldKey, 'key']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="value"
                  name={[field.name, 'value']}
                  fieldKey={[field.fieldKey, 'value']}
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>新增</Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  )
}


const VisualInput: React.FC<IProps> = (props) => {
  const [form] = Form.useForm()
  const PAYLOAD = 'payload', PIPE = 'pipe', CONTEXT = 'context', CONFIG = 'config'
  const onChange = () => {
    props.onChange(form.getFieldsValue())
  }

  return (
    <div className={styles.visualInput}>
      <Form form={form} name="form" autoComplete="off" onValuesChange={onChange}>
        <MyFormItem type={PAYLOAD} />
        <MyFormItem type={PIPE} />
        <MyFormItem type={CONTEXT} />
        <MyFormItem type={CONFIG} />
      </Form>
    </div>
  )
}

const CodeRun: React.FC<IProps> = (props) => {
  const onFormChange = (value: any) => {
    props.onChange(value)
  }
  const onJsonChange = (ev: any, newCode: any): void => {
    const codeStr = newCode.slice(15)
    const formatCodeStr = codeStr.replace(/ |\/\/.*/g, '').replace(/\s/g, '').replace(/(\w+):/g, '"$1":').replace(/'/g, '"')
    try {
      props.onChange(JSON.parse(formatCodeStr))
    } catch (err) {
      props.onChange({})
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Tabs
          type="card"
          tabBarGutter={0}
          defaultActiveKey={'basic'}
          tabBarStyle={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TabPane className={styles.tabPane} tab={'可视化'} key={'visualTab'}>
            <VisualInput onChange={onFormChange} />
          </TabPane>
          <TabPane className={styles.tabPane} tab={'JSON输入'} key={'jsonTab'}>
            <CodeEditor
              value={inputJson}
              className={styles.editor}
              onChange={onJsonChange}
            />
          </TabPane>
        </Tabs>
      </div>

      <div className={styles.right}>
        <div className={styles.rightTop}>
          <p>输出</p>
          <JsonView
            name={null}
            collapsed={false}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            src={outputJson}
          />
        </div>
        <div className={styles.rightBottom}>
          我是console控制台
        </div>
      </div>
    </div>

  )
}

export default CodeRun;
