import React from 'react';
import {
  Form,
  Input,
  Switch,
  Select,
  Checkbox,
  DatePicker,
  TimePicker,
  Empty,
  Button,
  message,
} from 'antd';
import moment from 'moment';
import styles from './index.module.less';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
interface INum {
  label: string;
  value: string;
}

interface IConfigData {
  [key: string]: any;
}
interface IProps {
  schema: {
    type: string;
    properties: { [key: string]: any };
  };
  configData: IConfigData;
  changeConfigData: (data: IConfigData) => void;
}

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SchemaForm: React.FC<IProps> = (props) => {
  const { schema, configData, changeConfigData } = props;
  const [form] = Form.useForm();
  const onClickSave = (): void => {
    changeConfigData(form.getFieldsValue());
    message.success('保存成功！');
  };

  return schema && Object.keys(schema).length > 0 ? (
    <Form form={form} initialValues={configData} {...formLayout}>
      {schema?.properties &&
        Object.keys(schema.properties).map((key: string) => {
          const obj = schema.properties[key];
          const options: INum[] = obj.enum
            ? obj.enum.map((item: string, idx: number) => {
                return { label: item, value: obj.enumNames[idx] };
              })
            : [];
          let ele = null;
          // 输入框
          if (
            obj.type === 'string' &&
            !obj.hasOwnProperty('format') &&
            !obj.hasOwnProperty('enum')
          ) {
            ele = <Input />;
          }
          // 编辑框
          if (obj.type === 'string' && obj.format === 'textarea') {
            ele = <Input.TextArea />;
          }
          // switch
          if (obj.type === 'boolean' && obj['ui:widget'] === 'switch') {
            ele = <Switch />;
          }
          // 下拉单选
          if (
            obj.type === 'string' &&
            obj.hasOwnProperty('enum') &&
            !obj.hasOwnProperty('ui:widget')
          ) {
            ele = (
              <Select allowClear>
                {options.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            );
          }
          // 下拉多选
          if (
            obj.type === 'array' &&
            obj.hasOwnProperty('enum') &&
            obj['ui:widget'] === 'multiSelect'
          ) {
            ele = (
              <Select allowClear mode="multiple">
                {options.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            );
          }
          // 点击多选
          if (
            obj.type === 'array' &&
            obj.hasOwnProperty('enum') &&
            !obj.hasOwnProperty('ui:widget')
          ) {
            ele = <Checkbox.Group options={options} />;
          }
          // 时间选择
          if (obj.type === 'string' && obj.format === 'time') {
            ele = <TimePicker defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
          }
          // 日期范围
          if (obj.type === 'range' && obj.format === 'date') {
            ele = <DatePicker />;
          }
          // 日期选择
          if (obj.type === 'string' && obj.format === 'date') {
            ele = <RangePicker />;
          }
          return (
            <FormItem label={obj.title} name={key} key={key}>
              {ele}
            </FormItem>
          );
        })}
      <div className={styles.btnWrap}>
        <Button
          size="small"
          className={styles.btn}
          type={'primary'}
          onClick={onClickSave}
        >
          保存
        </Button>
      </div>
    </Form>
  ) : (
    <Empty
      description={'请编辑投放配置schema'}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

export default SchemaForm;
