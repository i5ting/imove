import * as React from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';

interface FieldInputProps {
  value: string;
  changeField: (value: string) => void;
  addonAfter: JSX.Element;
}

const CustomInput = styled(Input)`
  .ant-input-group-addon {
    background: transparent;
    border: none;
  }
`;

function FieldInput({ value: initValue, changeField, addonAfter }: FieldInputProps): JSX.Element {
  const [value, setValue] = React.useState(initValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value !== initValue) {
      changeField(e.target.value);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent): void => {
    const { value: newValue } = e.target as HTMLInputElement;
    if (e.keyCode === 13 && newValue !== initValue) {
      changeField(newValue);
    }
  };

  return (
    <CustomInput
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      addonAfter={addonAfter}
    />
  );
}

export default FieldInput;
