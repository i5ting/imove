/** @jsx jsx */
import { useEffect } from 'react';
import { Global, jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout';
import { UIProvider } from './store/ui';
import { SchemaProvider } from './store/schema';
import globalStyles from './utils/styles/global';
import { SchemaState } from './model';
import './utils/styles/antd';
import './i18n';

interface EditorProps {
  lang?: string;
  data: SchemaState;
  onChange: (value: SchemaState) => void;
}

function JsonSchemaEditor({ lang, data, onChange }: EditorProps): JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!lang) return;
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <UIProvider>
      <SchemaProvider initialData={data}>
        <Global styles={globalStyles} />
        <Layout onChange={onChange} />
      </SchemaProvider>
    </UIProvider>
  );
}

export default JsonSchemaEditor;
