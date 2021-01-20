import React, { useState } from 'react';

import { Button } from 'antd';
import GuideModal from './guideModal';

const Export: React.FC = (props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onOpenModal = () => setModalVisible(true);
  const onCloseModal = () => setModalVisible(false);

  return (
    <div>
      <Button type={'primary'} size={'small'} onClick={onOpenModal}>
        帮助指引
      </Button>
      <GuideModal visible={modalVisible} onClose={onCloseModal} />
    </div>
  );
};

export default Export;
