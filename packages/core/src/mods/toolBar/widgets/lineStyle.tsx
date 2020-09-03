import React, {ReactElement} from 'react';

import 'antd/es/menu/style';

import {Menu} from 'antd';
import {Graph, Cell} from '@antv/x6';
import {safeGet} from '../../../utils';
import XIcon from '../../../components/xIcon';
import makeDropdownWidget from './makeDropdownWidget';

interface IProps {
  flowChart: Graph;
}

interface LineStyleItem {
  text: string;
  icon: ReactElement;
  attrs: {
    type: string;
    strokeDasharray: string;
  }
}

const MenuItem = Menu.Item;
const LINE_STYLE_MAP: {[key: string]: LineStyleItem} = {
  straight: {
    text: '直线',
    icon: <XIcon type={'icon-line'}/>,
    attrs: {
      type: 'straight',
      strokeDasharray: '5, 0'
    }
  },
  dashed: {
    text: '虚线',
    icon: <XIcon type={'icon-dash'}/>,
    attrs: {
      type: 'dashed',
      strokeDasharray: '5, 5'
    }
  }
};

const LineStyle: React.FC<IProps> = makeDropdownWidget({
  tooltip: '线条样式',
  getIcon(flowChart: Graph) {
    let lineType = 'straight';
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      lineType = safeGet(cells, '0.attrs.line.type', 'straight');
    }
    return LINE_STYLE_MAP[lineType].icon;
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    return (
      <Menu onClick={({key}) => onChange(LINE_STYLE_MAP[key].attrs)}>
        {Object.keys(LINE_STYLE_MAP).map((lineType: string) => (
          <MenuItem key={lineType}>
            {LINE_STYLE_MAP[lineType].icon}
            <span>{LINE_STYLE_MAP[lineType].text}</span>
          </MenuItem>
        ))}
      </Menu>
    );
  },
  handler: (flowChart: Graph, value: any) => {
    const edges = flowChart.getSelectedCells().filter((cell: Cell) => cell.isEdge());
    if(edges.length > 0) {
      edges.forEach(edge => edge.setAttrs({line: value}));
      flowChart.trigger('toolBar:forceUpdate');
    }
  },
  disabled(flowChart: Graph) {
    const edges = flowChart.getSelectedCells().filter((cell: Cell) => cell.isEdge());
    return edges.length === 0;
  },
});

export default LineStyle;
