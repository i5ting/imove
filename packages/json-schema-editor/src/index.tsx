/** @jsx jsx */
import { useEffect } from 'react';
import { Global, jsx, css } from '@emotion/core';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import './i18n';

interface EditorProps {
  lang?: string;
}

function JsonSchemaEditor({ lang }: EditorProps): JSX.Element {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!lang) return;
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <div
      css={css`
        padding: 5px;
      `}
    >
      <Global
        styles={css`
          * {
            font-size: 12px;
          }
        `}
      />
      <Button type="primary">{t('import_json')}</Button>
    </div>
  );
}

export default JsonSchemaEditor;
