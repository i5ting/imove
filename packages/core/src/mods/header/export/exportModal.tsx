import React from 'react';

import 'antd/es/modal/style';
import styles from './index.module.less';

import JSZip from 'jszip';
import { Modal } from 'antd';
import { DataUri, Graph } from '@antv/x6';
import { compileForProject } from '@imove/compile-code';

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
    DataUri.downloadBlob(blob, 'imove.dsl.json');
  };
  const onExportCode = () => {
    const zip = new JSZip();
    const dsl = flowChart.toJSON();
    const output = compileForProject(dsl);
    Helper.recursiveZip(zip, output);
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      DataUri.downloadBlob(blob, 'logic.zip');
    });
  };
  const onExportFlowChart = () => {
    flowChart.toPNG(
      (dataUri: string) => {
        DataUri.downloadDataUri(dataUri, 'flowChart.png');
      },
      { padding: 50, ratio: '3.0' },
    );
  };

  return (
    <Modal
      width={700}
      visible={visible}
      footer={null}
      title={'导出'}
      onOk={onClose}
      onCancel={onClose}
    >
      <div className={styles.modalContent}>
        <div className={styles.downloadWrap} onClick={onExportDSL}>
          <img
            className={styles.picPreview}
            src="//img.alicdn.com/imgextra/i2/O1CN01lvanDL1YKp54hGgMS_!!6000000003041-2-tps-247-247.png"
          />
          <span>DSL</span>
        </div>
        <div className={styles.downloadWrap} onClick={onExportCode}>
          <img
            className={styles.picPreview}
            src="//img.alicdn.com/imgextra/i3/O1CN01V3wg6S27JuqePTXZv_!!6000000007777-2-tps-247-247.png"
          />
          <span>代码</span>
        </div>
        <div className={styles.downloadWrap} onClick={onExportFlowChart}>
          <img
            className={styles.picPreview}
            src="//img.alicdn.com/imgextra/i1/O1CN01sVItyC1exeLraUhf6_!!6000000003938-2-tps-247-247.png"
          />
          <span>流程图</span>
        </div>
      </div>
    </Modal>
  );
};

const Helper = {
  recursiveZip(root: JSZip, json: any) {
    if (typeof json !== 'object' || json === null) {
      return;
    }
    for (const key in json) {
      const val = json[key];
      if (typeof val === 'string') {
        root.file(key, val);
      } else {
        const dir = root.folder(key) as JSZip;
        Helper.recursiveZip(dir, val);
      }
    }
  },
};

export default ExportModal;
