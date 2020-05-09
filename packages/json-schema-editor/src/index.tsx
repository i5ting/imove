/** @jsx jsx */
import { useEffect } from 'react';
import { Global, jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Row, Col, Tooltip, Input, Checkbox, Select, Button } from 'antd';
import { CaretDownOutlined, EditOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import globalStyles from './utils/styles/global';
import './i18n';

interface EditorProps {
  lang?: string;
}

const { Option } = Select;

const FieldInput = styled(Input)`
  .ant-input-group-addon {
    background: transparent;
    border: none;
  }
`;

function JsonSchemaEditor({ lang }: EditorProps): JSX.Element {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!lang) return;
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <div
      className="json-schema-editor"
      css={css`
        padding: 5px;
      `}
    >
      <Global styles={globalStyles} />
      <Button type="primary">{t('import_json')}</Button>
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
                  <CaretDownOutlined className="editor-icon" />
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
              <Input value="" placeholder="Title" addonAfter={<EditOutlined />} />
            </Col>
            <Col span="5">
              <Input value="" placeholder="Description" addonAfter={<EditOutlined />} />
            </Col>
            <Col span="3">
              <SettingOutlined className="editor-icon" style={{ color: '#00a854' }} />
              <PlusOutlined className="editor-icon" style={{ color: '#2395f1' }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default JsonSchemaEditor;
