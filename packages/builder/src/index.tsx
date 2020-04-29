import * as React from 'react';
import { Form, Input } from 'antd';
import schemaEditor from 'json-schema-editor-visual';

const SchemaEditor = schemaEditor({});

const { Item } = Form;

const Builder: React.FC<{}> = () => {
  const labelCol = { span: 7 };

  return (
    <div>
      <Form labelCol={labelCol}>
        <Item label="元件名称" name="name">
          <Input />
        </Item>
        <Item label="元件描述" name="name">
          <Input />
        </Item>
        <Item label="元件描述" name="name">
          <Input />
        </Item>
        {/* <SchemaEditor /> */}
      </Form>
    </div>
  );
};

export default Builder;
