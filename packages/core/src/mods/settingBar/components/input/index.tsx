import React from 'react';

import 'antd/es/input/style';
import styles from './index.module.less';

import { Input as AntdInput } from 'antd';

interface IProps {
  value: any;
  name: string;
  title: string;
  disabled?: boolean;
  description?: string;
  onValueChange: (val: string) => void;
}

const Input: React.FC<IProps> = (props) => {
  const { name, title, value, disabled, onValueChange } = props;
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.value !== value) {
      onValueChange(evt.target.value);
    }
  };
  return (
    <div className={styles.container}>
      <p className={styles.titleText}>{title}</p>
      <AntdInput name={name} value={value} disabled={disabled} onChange={onChange} />
    </div>
  );
};

export default Input;
