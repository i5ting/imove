import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import EditModal from './editModal';

interface IProps {
  confirmToSync: () => Promise<void>;
}

const Configuration: React.FC<IProps> = (props: IProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  // events
  const onOpenEditModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const onCloseEditModal = useCallback(() => {
    setVisible(false);
  }, []);
  const onOk = useCallback(() => {
    onCloseEditModal();
    props.confirmToSync();
  }, [onCloseEditModal]);

  return (
    <div>
      <Button size="small" type="text" onClick={onOpenEditModal}>
        <SettingOutlined />
      </Button>
      <EditModal visible={visible} onOk={onOk} onCancel={onCloseEditModal} />
    </div>
  );
};

export default Configuration;
