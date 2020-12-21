import React, {useState} from 'react';

import styles from './index.module.less';

import { Button } from 'antd';
import { Graph } from '@antv/x6';
import ExportModal from './exportModal';

interface IProps {
  flowChart: Graph;
}

const Export: React.FC<IProps> = props => {

  const {flowChart} = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onOpenModal = () => setModalVisible(true);
  const onCloseModal = () => setModalVisible(false);

  return (
    <div className={styles.container}>
      <Button type={'primary'} size={'small'} onClick={onOpenModal}>导出</Button>
      <ExportModal
        flowChart={flowChart}
        visible={modalVisible}
        onClose={onCloseModal}
      />
    </div>
  );
};

export default Export;
