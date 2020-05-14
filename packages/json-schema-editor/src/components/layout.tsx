/** @jsx jsx */
import { useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import EditorHead from './schema-head';
import SchemaForm from './schema-form';
import { useUIState } from '../store/ui';
import { useSchemaState } from '../store/schema';
import { SchemaState } from '../model';

let temp: SchemaState | null = null;

interface LayoutProps {
  onChange: (value: SchemaState) => void;
}

function Layout({ onChange }: LayoutProps): JSX.Element {
  const { t } = useTranslation();

  const uiState = useUIState();
  const key = 'properties';
  const visible = uiState[key] !== false;

  const schemaState = useSchemaState();

  useEffect(() => {
    if (temp !== schemaState) {
      temp = schemaState;
      onChange(schemaState);
    }
  });

  return (
    <div
      className="json-schema-editor"
      css={css`
        padding: 5px;
      `}
    >
      <Button type="primary">{t('import_json')}</Button>
      <EditorHead />
      {visible && <SchemaForm data={schemaState} keyRoute={['properties']} />}
    </div>
  );
}

export default Layout;
