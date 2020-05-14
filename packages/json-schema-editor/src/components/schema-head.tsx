/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Row, Col, Tooltip, Input, Checkbox, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useTranslation } from 'react-i18next';
import { useUIState, useSetUIState } from '../store/ui';
import { useSchemaDispatch } from '../store/schema';
import {
  CaretDownIcon,
  CaretRightIcon,
  EditIcon,
  SettingIcon,
  PlusIcon,
} from '../utils/styles/common';

const { Option } = Select;

const FieldInput = styled(Input)`
  .ant-input-group-addon {
    background: transparent;
    border: none;
  }
`;

function EditorHead(): JSX.Element {
  const { t } = useTranslation();
  const schemaDispatch = useSchemaDispatch();
  const setUIState = useSetUIState();
  const uiState = useUIState();
  const key = 'properties';
  const visible = uiState[key];

  const [checked, setChecked] = useState(false);

  const toggleFormVisible = (): void => {
    setUIState((prev) => ({ ...prev, [key]: !visible }));
  };

  const addChildField = (): void => {
    schemaDispatch({ type: 'ADD_CHILD_FIELD', keyRoute: ['properties'] });
  };

  const toggleAllChecked = (e: CheckboxChangeEvent): void => {
    setChecked(e.target.checked);
    schemaDispatch({ type: 'TOGGLE_ALL_CHECKED', checked: e.target.checked });
  };

  return (
    <Row css={{ marginTop: '10px' }}>
      <Col span="24">
        <Row align="middle">
          <Col span="8">
            <Row align="middle">
              <Col span="2">
                {visible ? (
                  <CaretDownIcon onClick={toggleFormVisible} />
                ) : (
                  <CaretRightIcon onClick={toggleFormVisible} />
                )}
              </Col>
              <Col span="22">
                <FieldInput
                  disabled
                  value="root"
                  addonAfter={
                    <Tooltip placement="top" title={t('select_all')}>
                      <Checkbox checked={checked} onChange={toggleAllChecked} />
                    </Tooltip>
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col span="3">
            <Select value="object" disabled>
              <Option value="object">object</Option>
            </Select>
          </Col>
          <Col span="5">
            <Input value="" placeholder={t('title')} addonAfter={<EditIcon />} />
          </Col>
          <Col span="5">
            <Input value="" placeholder={t('description')} addonAfter={<EditIcon />} />
          </Col>
          <Col span="3">
            <Tooltip placement="top" title={t('setting')}>
              <SettingIcon />
            </Tooltip>
            <Tooltip placement="top" title={t('add_child_node')}>
              <PlusIcon onClick={addChildField} />
            </Tooltip>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default EditorHead;
