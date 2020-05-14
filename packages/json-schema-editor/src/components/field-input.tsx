import * as React from 'react';
import styled from '@emotion/styled';
import { Tooltip, Input, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

interface FieldInputProps {
  value: string;
  required: boolean;
  changeField: (value: string) => void;
  toggleRequired: (value: string) => void;
}

const CustomInput = styled(Input)`
  .ant-input-group-addon {
    background: transparent;
    border: none;
  }
`;

function FieldInput(props: FieldInputProps): JSX.Element {
  const { value: initValue, changeField, required, toggleRequired } = props;
  const [value, setValue] = React.useState(initValue);
  const [prevInitValue, setPrevInitValue] = React.useState(initValue);

  const { t } = useTranslation();

  // mock getDerivedStateFromProps
  if (initValue !== prevInitValue) {
    setValue(initValue);
    setPrevInitValue(initValue);
  }

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
      addonAfter={
        <Tooltip placement="top" title={t('required')}>
          <Checkbox
            checked={required}
            onChange={(): void => {
              toggleRequired(value);
            }}
          />
        </Tooltip>
      }
    />
  );
}

export default React.memo(FieldInput);
