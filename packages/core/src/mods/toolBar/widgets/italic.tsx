import React from 'react';

import { Graph } from '@antv/x6';
import { safeGet } from '../../../utils';
import makeBtnWidget from './common/makeBtnWidget';
import { ItalicOutlined } from '@ant-design/icons';
import shortcuts from '../../../common/shortcuts';

interface IProps {
  flowChart: Graph;
}

const Italic: React.FC<IProps> = makeBtnWidget({
  tooltip: '斜体',
  handler: shortcuts.italic.handler,
  getIcon() {
    return <ItalicOutlined />;
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  },
  selected(flowChart: Graph) {
    const cells = flowChart.getSelectedCells();
    if (cells.length > 0) {
      return safeGet(cells, '0.attrs.label.fontStyle', 'normal') === 'italic';
    } else {
      return false;
    }
  },
});

export default Italic;
