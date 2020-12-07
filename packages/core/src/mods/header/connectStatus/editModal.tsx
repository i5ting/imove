import React, { useState, useEffect, useRef } from 'react';

import 'antd/es/form/style';
import 'antd/es/modal/style';
import 'antd/es/input/style';
import styles from './index.module.less';

import { Input, Form, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ILocalConfig, localConfig, updateLocalConfig } from '../../../api';

const PORT_REGEX = /^\d{1,5}$/;
const IP_REGEX = /^(localhost)|(((2(5[0-5]|[0-4]\d))|[01]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[01]?\d{1,2})){3})$/;
const makeRules = (regex: RegExp, errTip: string) => {
  return [
    { required: true, message: '不能为空!' },
    {
      validator: (_: any, val: string) =>
        regex.test(val) ? Promise.resolve() : Promise.reject(errTip),
    },
  ];
};

interface IEditorModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const EditModal: React.FC<IEditorModalProps> = (props) => {
  const { visible, onOk, onCancel } = props;
  const formRef = useRef<FormInstance>(null);

  // events
  const onClickOk = (): void => {
    formRef.current &&
      formRef.current
        .validateFields()
        .then((formValues) => {
          updateLocalConfig(formValues as ILocalConfig);
          onOk();
        })
        .catch((error) => {
          console.log(error.message);
        });
  };

  return (
    <Modal
      className={styles.editModal}
      visible={visible}
      okText={'保存'}
      cancelText={'取消'}
      title={'本地连接配置'}
      onOk={onClickOk}
      onCancel={onCancel}
    >
      <Form ref={formRef} labelCol={{ span: 4 }} initialValues={localConfig}>
        <Form.Item label={'ip'} name={'ip'} rules={makeRules(IP_REGEX, 'IP格式不合法')}>
          <Input />
        </Form.Item>
        <Form.Item label={'port'} name={'port'} rules={makeRules(PORT_REGEX, 'port格式不合法')}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
