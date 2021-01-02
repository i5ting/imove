import React from 'react';

import { Graph } from '@antv/x6';
import XIcon from '../../../components/xIcon';
import shortcuts from '../../../common/shortcuts';
import makeBtnWidget from './common/makeBtnWidget';
import { hasNodeSelected } from '../../../utils/flowChartUtils';

interface IProps {
  flowChart: Graph;
}

const BringToBack: React.FC<IProps> = makeBtnWidget({
  tooltip: '置于底层',
  handler: shortcuts.bringToBack.handler,
  getIcon() {
    return <XIcon type={'icon-bring-to-bottom'} />;
  },
  disabled(flowChart: Graph) {
    return !hasNodeSelected(flowChart);
  },
});

export default BringToBack;
