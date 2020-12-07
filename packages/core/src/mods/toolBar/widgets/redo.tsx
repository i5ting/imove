import React from 'react';

import { Graph } from '@antv/x6';
import { RedoOutlined } from '@ant-design/icons';
import shortcuts from '../../../common/shortcuts';
import makeBtnWidget from './common/makeBtnWidget';

interface IProps {
  flowChart: Graph;
}

const Save: React.FC<IProps> = makeBtnWidget({
  tooltip: '重做',
  handler: shortcuts.redo.handler,
  getIcon() {
    return <RedoOutlined />;
  },
  disabled(flowChart: Graph) {
    return !flowChart.canRedo();
  },
});

export default Save;
