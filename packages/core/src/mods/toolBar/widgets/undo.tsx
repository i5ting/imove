import React from 'react';

import {Graph} from '@antv/x6';
import makeBtnWidget from './makeBtnWidget';
import {UndoOutlined} from '@ant-design/icons';
import shortcuts from '../../../common/shortcuts';

interface IProps {
  flowChart: Graph
}

const Save: React.FC<IProps> = makeBtnWidget({
  tooltip: '撤销',
  handler: shortcuts['undo'].handler,
  getIcon() {
    return <UndoOutlined/>;
  },
  disabled(flowChart: Graph) {
    return !flowChart.canUndo();
  }
});

export default Save;
