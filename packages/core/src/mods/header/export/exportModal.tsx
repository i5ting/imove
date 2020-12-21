import React from 'react';

import 'antd/es/modal/style';
import styles from './index.module.less';

import { Modal } from 'antd';
import { Graph } from '@antv/x6';
import { base64Url2Blob, downloadFile } from '../../../utils';

interface IExportModalProps {
  flowChart: Graph;
  visible: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<IExportModalProps> = (props) => {

  const { flowChart, visible, onClose } = props;
  const onExportDSL = () => {
    const dsl = JSON.stringify(flowChart.toJSON(), null, 2);
    const blob = new Blob([dsl], { type: 'text/plain' });
    downloadFile('imove.dsl.json', blob);
  };
  const onExportFlowChart = () => {
    flowChart.toJPEG((dataUri: string) => {
      const blob = base64Url2Blob(dataUri);
      downloadFile('flowChart.png', blob);
    });
  };

  return (
    <Modal
      className={styles.editModal}
      visible={visible}
      footer={null}
      title={'导出'}
      onOk={onClose}
      onCancel={onClose}
    >
      <div className={styles.modalContent}>
        <div className={styles.downloadWrap} onClick={onExportDSL}>
          <img src="//gw.alicdn.com/tfs/TB1FaTkuqNj0u4jSZFyXXXgMVXa-128-128.png" />
          <span>DSL</span>
        </div>
        <div className={styles.downloadWrap} onClick={onExportFlowChart}>
          <img src="//gw.alicdn.com/tfs/TB1WZeT4Hr1gK0jSZFDXXb9yVXa-128-128.png" />
          <span>流程图</span>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;
