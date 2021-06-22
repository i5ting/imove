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
        const dslStr: any = evt.target.result || '{}';
        try {
          const dsl = JSON.parse(dslStr);
          // 检验文件格式
          const isOk =
            Object.prototype.toString.call(dsl) === '[object Array]' &&
            dsl
              .map((item: any) => {
                const { domain, id, name, funcName, provider } = item;
                if (domain && id && name && funcName && provider) {
                  return true;
                }
                return false;
              })
              .every((bool: boolean) => !!bool);
          if (isOk) {
            document.dispatchEvent(
              new CustomEvent('services', { detail: dslStr }),
            );
          } else {
            message.error('上传文件格式错误!');
          }
        } catch (err) {
          console.log('解析错误！');
        }
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
