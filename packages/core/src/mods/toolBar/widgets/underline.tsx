import React from 'react';

import { Graph } from '@antv/x6';
import { safeGet } from '../../../utils';
import shortcuts from '../../../common/shortcuts';
import makeBtnWidget from './common/makeBtnWidget';
import { UnderlineOutlined } from '@ant-design/icons';

interface IProps {
  flowChart: Graph;
}

const Underline: React.FC<IProps> = makeBtnWidget({
  tooltip: '下划线',
  handler: shortcuts.underline.handler,
  getIcon() {
    return <UnderlineOutlined />;
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  },
  selected(flowChart: Graph) {
    const cells = flowChart.getSelectedCells();
    if (cells.length > 0) {
      return safeGet(cells, '0.attrs.label.textDecoration', 'none') === 'underline';
    } else {
      return false;
    }
  },
});

export default Underline;
