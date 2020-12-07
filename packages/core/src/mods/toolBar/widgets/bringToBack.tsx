import React from 'react';

import { Graph } from '@antv/x6';
import XIcon from '../../../components/xIcon';
import makeBtnWidget from './common/makeBtnWidget';
import { getSelectedNodes, hasNodeSelected } from '../../../utils/flowChartUtils';

interface IProps {
  flowChart: Graph;
}

const BringToBack: React.FC<IProps> = makeBtnWidget({
  tooltip: '置于底层',
  getIcon() {
    return <XIcon type={'icon-bringtobottom'} />;
  },
  handler(flowChart: Graph) {
    getSelectedNodes(flowChart).forEach((node) => node.toBack());
  },
  disabled(flowChart: Graph) {
    return !hasNodeSelected(flowChart);
  },
});

export default BringToBack;
