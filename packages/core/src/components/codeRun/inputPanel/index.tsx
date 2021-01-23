import React, { useRef, useEffect } from 'react';

import styles from './index.module.less';

import CodeEditor from '../../codeEditor';
import { Tabs, Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const inputItems = [
  { type: 'pipe', desc: '上一节点返回值' },
  { type: 'context', desc: '当前逻辑流程公用数据' },
  { type: 'payload', desc: '当前逻辑流程通用数据' },
  { type: 'config', desc: '当前节点投放配置' },
];

interface IVisualFormItemProps {
  type: string;
  desc: string;
}

const VisualFormItem: React.FC<IVisualFormItemProps> = (props) => {
  const { type, desc } = props;

  return (
    <React.Fragment>
      <div className={styles.itemHeader}>
        <span className={styles.itemTitleText}>{type}</span>
        <span className={styles.itemDescText}>{desc}</span>
      </div>
      <Form.List name={type}>
        {(fields, { add, remove }) => (
          <React.Fragment>
            {fields.map((field) => (
              <Space key={field.key} align={'baseline'}>
                <Form.Item
                  {...field}
                  label={'key'}
                  name={[field.name, 'key']}
                  fieldKey={[field.fieldKey, 'key']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...field}
                  label={'value'}
                  name={[field.name, 'value']}
                  fieldKey={[field.fieldKey, 'value']}
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                block={true}
                type={'dashed'}
                icon={<PlusOutlined />}
                onClick={() => add()}
              >
                新增
              </Button>
            </Form.Item>
          </React.Fragment>
        )}
      </Form.List>
    </React.Fragment>
  );
};

interface IVisualPanelProps {
  data: any;
  onChange: (value: object) => void;
}

const VisualPanel: React.FC<IVisualPanelProps> = (props) => {
  const { data, onChange } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    const filedsValue: { [key: string]: any } = {};
    for (const { type } of inputItems) {
      const mockValue = data[type] || {};
      filedsValue[type] = Object.keys(mockValue).map((key) => ({
        key,
        value: mockValue[key],
      }));
    }
    form.setFieldsValue(filedsValue);
  }, [data]);

  const onFormValuesChange = () => {
    const input: { [key: string]: any } = {};
    const filedsValue = form.getFieldsValue();
    for (const { type } of inputItems) {
      const mockValue = filedsValue[type] || [];
      input[type] = mockValue.reduce(
        (prev: any, cur: { key: string; value: any }) => {
          const { key = '', value } = cur || {};
          prev[key] = value;
          return prev;
        },
        {},
      );
    }
    onChange(input);
  };

  return (
    <div className={styles.visualInput}>
      <Form form={form} autoComplete={'on'} onValuesChange={onFormValuesChange}>
        {inputItems.map(({ type, desc }, index) => (
          <VisualFormItem key={index} type={type} desc={desc} />
        ))}
      </Form>
    </div>
  );
};

interface IInputPanelProps {
  data: any;
  onChange: (data: any) => void;
}

const InputPanel: React.FC<IInputPanelProps> = (props) => {
  const cache: any = useRef({});
  const { data, onChange } = props;

  const onVisualChange = (newForm: any) => {
    clearTimeout(cache.current.timer);
    cache.current.timer = setTimeout(() => onChange(newForm), 1000);
  };
  const onEditorChange = (ev: any, newCode: string | undefined = '') => {
    clearTimeout(cache.current.timer);
    cache.current.timer = setTimeout(() => {
      try {
        onChange(JSON.parse(newCode));
      } catch (err) {
        // cancel log to avoid wasting Console outputs
      }
    }, 1000);
  };

  return (
    <Tabs type={'card'} defaultActiveKey={'visualTab'}>
      <Tabs.TabPane
        className={styles.tabPane}
        tab={'可视化模式'}
        key={'visualTab'}
      >
        <VisualPanel data={data} onChange={onVisualChange} />
      </Tabs.TabPane>
      <Tabs.TabPane className={styles.tabPane} tab={'源码模式'} key={'jsonTab'}>
        <CodeEditor
          height={'100%'}
          language={'json'}
          value={JSON.stringify(data, null, 2)}
          onChange={onEditorChange}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default InputPanel;
