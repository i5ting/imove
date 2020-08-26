import React, {ReactElement} from 'react';

import 'antd/es/menu/style';

import {Menu} from 'antd';
import {Graph} from '@antv/x6';
import {safeGet} from '../../../utils';
import makeDropdownWidget from './makeDropdownWidget';
import {VerticalAlignTopOutlined, VerticalAlignMiddleOutlined, VerticalAlignBottomOutlined} from '@ant-design/icons';

interface IProps {
  flowChart: Graph;
}

interface AlignItem {
  text: string;
  icon: ReactElement;
  attrs: {
    refY: number;
    refY2?: number;
    textVerticalAlign: string;
    align: {
      vertical: string;
    }
  }
}

const MenuItem = Menu.Item;
const ALIGN_MAP: {[key: string]: AlignItem} = {
  top: {
    text: '上对齐',
    icon: <VerticalAlignTopOutlined/>,
    attrs: {
      refY: 0,
      refY2: 10,
      textVerticalAlign: 'start',
      align: {
        vertical: 'top'
      }
    }
  },
  center: {
    text: '居中对齐',
    icon: <VerticalAlignMiddleOutlined/>,
    attrs: {
      refY: 0.5,
      refY2: 0,
      textVerticalAlign: 'middle',
      align: {
        vertical: 'center'
      }
    }
  },
  bottom: {
    text: '下对齐',
    icon: <VerticalAlignBottomOutlined/>,
    attrs: {
      refY: 0.99,
      refY2: -10,
      textVerticalAlign: 'end',
      align: {
        vertical: 'bottom'
      }
    }
  }
};

const VerticalAlign: React.FC<IProps> = makeDropdownWidget({
  tooltip: '垂直对齐',
  getIcon(flowChart: Graph) {
    let alignType = 'center';
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      alignType = safeGet(cells, '0.attrs.label.align.vertical', 'center');
    }
    return ALIGN_MAP[alignType].icon;
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    return (
      <Menu onClick={({key}) => onChange(ALIGN_MAP[key].attrs)}>
        {Object.keys(ALIGN_MAP).map((alignType: string) => (
          <MenuItem key={alignType}>
            {ALIGN_MAP[alignType].icon}
            <span>{ALIGN_MAP[alignType].text}</span>
          </MenuItem>
        ))}
      </Menu>
    );
  },
  handler: (flowChart: Graph, value: any) => {
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      cells.forEach(cell => cell.setAttrs({label: value}));
      flowChart.trigger('toolBar:forceUpdate');
    }
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  },
});

export default VerticalAlign;
