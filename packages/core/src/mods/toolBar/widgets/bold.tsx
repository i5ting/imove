import React from 'react';

import { Graph } from '@antv/x6';
import { safeGet } from '../../../utils';
import { BoldOutlined } from '@ant-design/icons';
import shortcuts from '../../../common/shortcuts';
import makeBtnWidget from './common/makeBtnWidget';

interface IProps {
  flowChart: Graph;
}

const Bold: React.FC<IProps> = makeBtnWidget({
  tooltip: '加粗',
  handler: shortcuts.bold.handler,
  getIcon() {
    return <BoldOutlined />;
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  },
  selected(flowChart: Graph) {
    const cells = flowChart.getSelectedCells();
    if (cells.length > 0) {
      return safeGet(cells, '0.attrs.label.fontWeight', 'normal') === 'bold';
    } else {
      return false;
    }
  },
});

export default Bold;
