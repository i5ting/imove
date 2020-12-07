import React from 'react';

import 'antd/es/checkbox/style';
import styles from './index.module.less';

import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface IProps {
  value: any;
  name: string;
  title: string;
  disabled?: boolean;
  description?: string;
  onValueChange: (val: boolean) => void;
}

const Checkbox: React.FC<IProps> = (props) => {
  const { name, title, value, disabled, onValueChange } = props;
  const onChange = (evt: CheckboxChangeEvent): void => {
    console.log(evt.target.checked);
    if (evt.target.checked !== value) {
      onValueChange(evt.target.checked);
    }
  };
  return (
    <div className={styles.container}>
      <p className={styles.titleText}>{title}</p>
      <AntdCheckbox name={name} checked={value} disabled={disabled} onChange={onChange} />
    </div>
  );
};

export default Checkbox;
