import React from 'react';

import {Graph} from '@antv/x6';
import makeBtnWidget from './makeBtnWidget';
import XIcon from '../../../components/xIcon';

interface IProps {
  flowChart: Graph
}

const BringToBack: React.FC<IProps> = makeBtnWidget({
  tooltip: '置于底层',
  getIcon() {
    return <XIcon type={'icon-bringtobottom'}/>;
  },
  handler(flowChart: Graph) {
    const cells = flowChart.getSelectedCells();
    if(cells.length === 1) {
      cells[0].toBack();
    }
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  }
});

export default BringToBack;