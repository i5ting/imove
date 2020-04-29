import * as React from 'react';
import { Form, Input, InputNumber } from 'antd';

const { Item } = Form;

const labelCol = { span: 7 };

export interface SchemaFormProps {
  schema: any;
  data: any;
}

export interface SchemaFormState {
  data: any;
}

class SchemaForm extends React.Component<SchemaFormProps, SchemaFormState> {
  constructor(props: SchemaFormProps) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  changeValue = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
    const { data } = this.state;
    const value = e.target.value.trim();
    data[key] = value;
    this.setState({ data });
  };

  changeNumValue = (value: number | undefined, key: string): void => {
    const { data } = this.state;
    data[key] = value;
    this.setState({ data });
  };

  render(): JSX.Element {
    const { data } = this.state;
    const {
      schema: { properties },
    } = this.props;

    return (
      <Form labelCol={labelCol} initialValues={data}>
        {Object.keys(properties).map((key) => (
          <Item label={properties[key].title} name={properties[key].title}>
            {properties[key].type === 'string' ? (
              <Input
                onChange={(e): void => {
                  this.changeValue(e, key);
                }}
              />
            ) : (
              <InputNumber
                onChange={(value): void => {
                  this.changeNumValue(value, key);
                }}
              />
            )}
          </Item>
        ))}
      </Form>
    );
  }
}

export default SchemaForm;
