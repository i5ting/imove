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
          if (!(Object.prototype.toString.call(dsl) === '[object Array]')) {
            message.error('格式错误！文件内容不是数组');
            return;
          }
          if (
            !(
              [...new Set(dsl.map((item: any) => item.id))].length ===
              dsl.length
            )
          ) {
            message.error('内容错误！文件内容存在重复id');
            return;
          }
          if (
            !dsl
              .map((item: any) => {
                const { domain, id, name, funcName, provider, providerType } =
                  item;
                if (
                  domain &&
                  id &&
                  name &&
                  funcName &&
                  provider &&
                  providerType
                ) {
                  return true;
                }
                return false;
              })
              .every((bool: boolean) => !!bool)
          ) {
            message.error(
              '内容错误！文件的数组元素应该包括domain, id, name, funcName, provider, providerType属性，请检查后重新上传',
            );
            return;
          }
          document.dispatchEvent(
            new CustomEvent('services', { detail: dslStr }),
          );
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
