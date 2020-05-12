/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Row, Col, Tooltip, Input, Checkbox, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUIState, useSetUIState } from '../store/ui';
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
  const uiState = useUIState();
  const setUIState = useSetUIState();
  const { formVisible } = uiState;

  const toggleFormVisible = (): void => {
    setUIState((prev) => ({ ...prev, formVisible: !formVisible }));
  };

  return (
    <Row
      css={css`
        margin-top: 10px;
      `}
    >
      <Col span="24">
        <Row align="middle">
          <Col span="8">
            <Row align="middle">
              <Col span="2">
                {formVisible ? (
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
                      <Checkbox
                        checked={false}
                        onChange={(): void => {
                          // code
                        }}
                      />
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
            <Input value="" placeholder="Title" addonAfter={<EditIcon />} />
          </Col>
          <Col span="5">
            <Input value="" placeholder="Description" addonAfter={<EditIcon />} />
          </Col>
          <Col span="3">
            <Tooltip placement="top" title={t('setting')}>
              <SettingIcon />
            </Tooltip>
            <Tooltip placement="top" title={t('add_child_node')}>
              <PlusIcon />
            </Tooltip>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default EditorHead;
