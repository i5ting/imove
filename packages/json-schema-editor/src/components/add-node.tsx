import * as React from 'react';
import { Menu, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusIcon } from '../utils/styles/common';

interface AddNodeProps {
  addChildField: () => void;
  addSiblingField: () => void;
}

function AddNodeIcon({ addChildField, addSiblingField }: AddNodeProps): JSX.Element {
  const { t } = useTranslation();
  const menu = (
    <Menu>
      <Menu.Item>
        <div tabIndex={0} role="button" onClick={addChildField} onKeyDown={addChildField}>
          {t('child_node')}
        </div>
      </Menu.Item>
      <Menu.Item>
        <div tabIndex={0} role="button" onClick={addSiblingField} onKeyDown={addSiblingField}>
          {t('sibling_node')}
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <PlusIcon />
    </Dropdown>
  );
}

export default AddNodeIcon;
