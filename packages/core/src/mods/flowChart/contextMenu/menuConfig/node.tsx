import React from 'react';

import {
  CopyOutlined,
  EditOutlined,
  CodeOutlined,
  FormOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import XIcon from '../../../../components/xIcon';
import shortcuts from '../../../../common/shortcuts';

const nodeMenuConfig = [
  {
    key: 'copy',
    title: '复制',
    icon: <CopyOutlined />,
    handler: shortcuts.copy.handler
  },
  {
    key: 'delete',
    title: '删除',
    icon: <DeleteOutlined />,
    handler: shortcuts.delete.handler
  },
  {
    key: 'rename',
    title: '编辑文本',
    icon: <EditOutlined />,
    showDividerBehind: true,
    handler() {
      // TODO
    }
  },
  {
    key: 'bringToTop',
    title: '置于顶层',
    icon: <XIcon type={'icon-bring-to-top'} />,
    handler:shortcuts.bringToTop.handler
  },
  {
    key: 'bringToBack',
    title: '置于底层',
    icon: <XIcon type={'icon-bring-to-bottom'} />,
    showDividerBehind: true,
    handler:shortcuts.bringToBack.handler
  },
  {
    key: 'editCode',
    title: '编辑代码',
    icon: <FormOutlined />,
    handler() {
      // TODO
    }
  },
  {
    key: 'executeCode',
    title: '执行代码',
    icon: <CodeOutlined />,
    handler() {
      // TODO
    }
  }
];

export default nodeMenuConfig;
