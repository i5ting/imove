import React, { useState } from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';
import { Button, Upload, message } from 'antd';

interface IProps {
  flowChart: Graph;
}

const ImportDSL: React.FC<IProps> = props => {

  const {flowChart} = props;
  const [disabled, setDisabled] = useState(false);
  const beforeUpload = (file: any) => {
    setDisabled(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setDisabled(false);
      if(!evt.target) {
        message.error('加载文件失败!');
      } else {
        const dsl = evt.target.result as string;
        try {
          flowChart.fromJSON(JSON.parse(dsl));
        } catch (err) {
          message.error('DSL解析失败!');
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
      <Button type={'primary'} size={'small'}>导入DSL</Button>
    </Upload>
  );
};

export default ImportDSL;
