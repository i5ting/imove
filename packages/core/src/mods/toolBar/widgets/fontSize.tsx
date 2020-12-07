import React from 'react';

import 'antd/es/menu/style';

import { Menu } from 'antd';
import { Graph } from '@antv/x6';
import { safeGet } from '../../../utils';
import makeDropdownWidget from './common/makeDropdownWidget';

interface IProps {
  flowChart: Graph;
}

const MenuItem = Menu.Item;
const FONT_SIZE_SET = [9, 10, 11, 12, 13, 14, 15, 16, 19, 22, 24, 29, 32];

const FontSize: React.FC<IProps> = makeDropdownWidget({
  tooltip: '字号',
  getIcon(flowChart: Graph) {
    let fontSize = 14;
    const cells = flowChart.getSelectedCells();
    if (cells.length > 0) {
      fontSize = safeGet(cells, '0.attrs.label.fontSize', 14);
    }
    return <span style={{ fontSize: 14 }}>{fontSize}px</span>;
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    return (
      <Menu onClick={(args) => onChange(args.key)}>
        {FONT_SIZE_SET.map((fontSize) => (
          <MenuItem key={fontSize}>
            <span>{fontSize} px</span>
          </MenuItem>
        ))}
      </Menu>
    );
  },
  handler: (flowChart: Graph, value: any) => {
    flowChart.getSelectedCells().forEach((cell) => cell.setAttrs({ label: { fontSize: value } }));
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  },
});

export default FontSize;
