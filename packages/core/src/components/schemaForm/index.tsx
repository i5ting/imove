import React from 'react';
import { Form, Input, Switch, Select, Radio, Checkbox, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item
const { RangePicker } = DatePicker;
const { Option } = Select;

interface INum {
  label: string,
  value: string
}

interface IProps {
  schema: {
    type: string,
    properties: { [key: string]: any }
  }
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const SchemaForm: React.FC<IProps> = (props) => {
  return (
    <Form {...formLayout}>
      {props.schema?.properties && Object.keys(props.schema.properties).map((key: string) => {
        const obj = props.schema.properties[key]
        const options: INum[] = obj.enum ? obj.enum.map((item: string, idx: number) => {
          return { label: item, value: obj.enumNames[idx] }
        }) : []
        let ele = null
        // 输入框
        if (obj.type === 'string' && !obj.hasOwnProperty('format') && !obj.hasOwnProperty('enum')) {
          ele = <Input />
        }
        // 编辑框
        if (obj.type === 'string' && obj.format === 'textarea') {
          ele = <Input.TextArea />
        }
        // switch
        if (obj.type === 'boolean' && obj['ui:widget'] === 'switch') {
          ele = <Switch />
        }
        // 下拉单选
        if (obj.type === 'string' && obj.hasOwnProperty('enum') && !obj.hasOwnProperty('ui:widget')) {
          ele = <Select allowClear>{options.map(item =>
            <Option key={item.value} value={item.value}>{item.label}</Option>
          )}</Select>
        }
        // 点击单选
        if (obj.type === 'string' && obj.hasOwnProperty('enum') && obj['ui:widget'] === 'radio') {
          ele = <Radio />
        }
        // 下拉多选
        if (obj.type === 'array' && obj.hasOwnProperty('enum') && obj['ui:widget'] === 'multiSelect') {
          ele = <Select allowClear mode="multiple">
            {options.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
          </Select>
        }
        // 点击多选
        if (obj.type === 'array' && obj.hasOwnProperty('enum') && !obj.hasOwnProperty('ui:widget')) {
          ele = <Checkbox.Group options={options} />
        }
        // 时间选择
        if (obj.type === 'string' && obj.format === 'time') {
          ele = <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
        }
        // 日期范围
        if (obj.type === 'range' && obj.format === 'date') {
          ele = <DatePicker />
        }
        // 日期选择
        if (obj.type === 'string' && obj.format === 'date') {
          ele = <RangePicker />
        }
        return <FormItem
          label={obj.title}
          name={obj.title}
        >
          {ele}
        </FormItem>
      })}
    </Form>
  );
};

export default SchemaForm
