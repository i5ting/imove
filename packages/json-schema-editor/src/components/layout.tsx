/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import EditorHead from './editor-head';
import SchemaForm from './schema-form';
import { useUIState } from '../store/ui';

function Layout(): JSX.Element {
  const { t } = useTranslation();
  const uiState = useUIState();
  const { formVisible } = uiState;

  return (
    <div
      className="json-schema-editor"
      css={css`
        padding: 5px;
      `}
    >
      <Button type="primary">{t('import_json')}</Button>
      <EditorHead />
      {formVisible && <SchemaForm />}
    </div>
  );
}

export default Layout;
