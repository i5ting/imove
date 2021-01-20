// at.alicdn.com/t/font_2024452_s39le1337k9.js
import React from 'react';

import { Graph } from '@antv/x6';
import XIcon from '../../../components/xIcon';
import shortcuts from '../../../common/shortcuts';
import makeBtnWidget from './common/makeBtnWidget';
import { hasNodeSelected } from '../../../utils/flowChartUtils';

interface IProps {
  flowChart: Graph;
}

const BringToTop: React.FC<IProps> = makeBtnWidget({
  tooltip: '置于顶层',
  handler: shortcuts.bringToTop.handler,
  getIcon() {
    return <XIcon type={'icon-bring-to-top'} />;
  },
  disabled(flowChart: Graph) {
    return !hasNodeSelected(flowChart);
  },
});

export default BringToTop;
