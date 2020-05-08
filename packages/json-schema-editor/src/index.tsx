/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

i18n.changeLanguage('en');

function JsonSchemaEditor(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div>
      <Button>{t('home')}</Button>
    </div>
  );
}

export default JsonSchemaEditor;
