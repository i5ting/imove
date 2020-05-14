/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Row, Col, Tooltip, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUIState, useSetUIState } from '../store/ui';
import { useSchemaDispatch } from '../store/schema';
import { schemaType } from '../utils/schema';
import { SchemaType, SchemaItem, KeyRoute } from '../model';
import FieldInput from './field-input';
import AddNode from './add-node';
import {
  CaretDownIcon,
  CaretRightIcon,
  EditIcon,
  SettingIcon,
  PlusIcon,
  CloseIcon,
} from '../utils/styles/common';

const { Option } = Select;

interface SchemaItemProps {
  field: string;
  data: SchemaItem;
  required: boolean;
  keyRoute: KeyRoute;
  children: React.ReactChild | null;
}

function SchemaFormItem(props: SchemaItemProps): JSX.Element {
  const { field, data, required, keyRoute, children } = props;
  const { t } = useTranslation();
  const schemaDispatch = useSchemaDispatch();
  const setUIState = useSetUIState();
  const uiState = useUIState();
  const key = keyRoute.join('-');
  const visible = uiState[key] !== false;

  const toggleFormVisible = (): void => {
    setUIState((prev) => ({ ...prev, [key]: !visible }));
  };

  const toggleRequired = (value: string): void => {
    const fieldKeyRoute = keyRoute.slice(0, -1).concat(value);

    if (required) {
      schemaDispatch({ type: 'REMOVE_REQUIRED', keyRoute: fieldKeyRoute });
    } else {
      schemaDispatch({ type: 'ADD_REQUIRED', keyRoute: fieldKeyRoute });
    }
  };

  const addChildField = (): void => {
    schemaDispatch({ type: 'ADD_CHILD_FIELD', keyRoute: keyRoute.concat('properties') });
  };

  const addSiblingField = (): void => {
    schemaDispatch({ type: 'ADD_SIBLING_FIELD', keyRoute });
  };

  const removeField = (): void => {
    schemaDispatch({ type: 'REMOVE_FIELD', keyRoute });
  };

  const changeField = (value: string): void => {
    schemaDispatch({ type: 'CHANGE_FIELD', keyRoute, field: value });
  };

  const changeType = (value: SchemaType): void => {
    schemaDispatch({ type: 'CHANGE_TYPE', keyRoute, fieldType: value });
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    schemaDispatch({ type: 'CHANGE_TITLE', keyRoute, title: e.target.value });
  };

  const changeDesc = (e: React.ChangeEvent<HTMLInputElement>): void => {
    schemaDispatch({ type: 'CHANGE_DESC', keyRoute, desc: e.target.value });
  };

  return (
    <div css={{ marginTop: '10px' }}>
      <Row align="middle">
        <Col span="8" css={{ paddingLeft: `${keyRoute.length * 10}px` }}>
          <Row align="middle">
            <Col span="2">
              {data.type === 'object' && visible && <CaretDownIcon onClick={toggleFormVisible} />}
              {data.type === 'object' && !visible && <CaretRightIcon onClick={toggleFormVisible} />}
            </Col>
            <Col span="22">
              <FieldInput
                value={field}
                required={required}
                changeField={changeField}
                toggleRequired={toggleRequired}
              />
            </Col>
          </Row>
        </Col>
        <Col span="3">
          <Select value={data.type} onChange={changeType}>
            {schemaType.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span="5">
          <Input
            value={data.title}
            onChange={changeTitle}
            placeholder={t('title')}
            addonAfter={<EditIcon />}
          />
        </Col>
        <Col span="5">
          <Input
            value={data.description}
            onChange={changeDesc}
            placeholder={t('description')}
            addonAfter={<EditIcon />}
          />
        </Col>
        <Col span="3">
          <Tooltip placement="top" title={t('setting')}>
            <SettingIcon />
          </Tooltip>
          <CloseIcon onClick={removeField} />
          {data.type === 'object' ? (
            <AddNode addChildField={addChildField} addSiblingField={addSiblingField} />
          ) : (
            <Tooltip placement="top" title={t('add_sibling_node')}>
              <PlusIcon onClick={addSiblingField} />
            </Tooltip>
          )}
        </Col>
      </Row>
      {visible && children ? <div css={{ marginTop: '10px' }}>{children}</div> : null}
    </div>
  );
}

export default SchemaFormItem;
