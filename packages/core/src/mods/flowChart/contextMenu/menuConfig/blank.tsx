import React from 'react';

import { Graph } from '@antv/x6';
import XIcon from '../../../../components/xIcon';
import shortcuts from '../../../../common/shortcuts';
import { SnippetsOutlined } from '@ant-design/icons';

const blankMenuConfig = [
  {
    key: 'selectAll',
    title: '全选',
    icon: <XIcon type={'icon-select-all'} />,
    handler: shortcuts.selectAll.handler,
  },
  {
    key: 'paste',
    title: '粘贴',
    icon: <SnippetsOutlined />,
    disabled: (flowChart: Graph) => flowChart.isClipboardEmpty(),
    handler: shortcuts.paste.handler,
  },
];

export default blankMenuConfig;
