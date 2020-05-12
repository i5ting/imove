/** @jsx jsx */
import { useEffect } from 'react';
import { Global, jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout';
import { UIProvider } from './store/ui';
import globalStyles from './utils/styles/global';
import './i18n';

interface EditorProps {
  lang?: string;
}

function JsonSchemaEditor({ lang }: EditorProps): JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!lang) return;
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <UIProvider>
      <Global styles={globalStyles} />
      <Layout />
    </UIProvider>
  );
}

export default JsonSchemaEditor;
