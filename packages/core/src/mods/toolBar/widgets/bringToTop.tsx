//at.alicdn.com/t/font_2024452_s39le1337k9.js
import React from 'react';

import {Graph} from '@antv/x6';
import makeBtnWidget from './makeBtnWidget';
import XIcon from '../../../components/xIcon';
import shortcuts from '../../../common/shortcuts';

interface IProps {
  flowChart: Graph
}

const BringToTop: React.FC<IProps> = makeBtnWidget({
  tooltip: '置于顶层',
  getIcon() {
    return <XIcon type={'icon-bringtotop'}/>;
  },
  handler(flowChart: Graph) {
    const cells = flowChart.getSelectedCells();
    if(cells.length === 1) {
      cells[0].toFront();
    }
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  }
});

export default BringToTop;