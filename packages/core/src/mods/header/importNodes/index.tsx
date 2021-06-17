import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import styles from './index.module.less';

const ImportNodes: React.FC = (props) => {
  const [disabled, setDisabled] = useState(false);
  const beforeUpload = (file: any) => {
    setDisabled(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setDisabled(false);
      if (!evt.target) {
        message.error('加载文件失败!');
      } else {
        const dsl = evt.target.result;
        document.dispatchEvent(new CustomEvent('services', { detail: dsl }));
      }
    };
    reader.readAsText(file);
    return false;
  };

  return (
    <Upload
      className={styles.container}
      accept={'.json'}
      disabled={disabled}
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      <Button type={'primary'} size={'small'}>
        导入节点池
      </Button>
    </Upload>
  );
};

export default ImportNodes;
