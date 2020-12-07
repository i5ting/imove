// at.alicdn.com/t/font_2024452_s39le1337k9.js
import React from 'react';

import { Graph } from '@antv/x6';
import XIcon from '../../../components/xIcon';
import makeBtnWidget from './common/makeBtnWidget';
import { getSelectedNodes, hasNodeSelected } from '../../../utils/flowChartUtils';

interface IProps {
  flowChart: Graph;
}

const BringToTop: React.FC<IProps> = makeBtnWidget({
  tooltip: '置于顶层',
  getIcon() {
    return <XIcon type={'icon-bringtotop'} />;
  },
  handler(flowChart: Graph) {
    getSelectedNodes(flowChart).forEach((node) => node.toFront());
  },
  disabled(flowChart: Graph) {
    return !hasNodeSelected(flowChart);
  },
});

export default BringToTop;
