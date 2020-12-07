import React, { ReactElement } from 'react';

import 'antd/es/menu/style';

import { Menu } from 'antd';
import { Graph } from '@antv/x6';
import { safeGet } from '../../../utils';
import makeDropdownWidget from './common/makeDropdownWidget';
import { hasNodeSelected, getSelectedNodes } from '../../../utils/flowChartUtils';
import { AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined } from '@ant-design/icons';

interface IProps {
  flowChart: Graph;
}

interface AlignItem {
  text: string;
  icon: ReactElement;
  attrs: {
    refX: number;
    refX2?: number;
    textAnchor: string;
    align: {
      horizontal: string;
    };
  };
}

const MenuItem = Menu.Item;
const ALIGN_MAP: { [key: string]: AlignItem } = {
  left: {
    text: '左对齐',
    icon: <AlignLeftOutlined />,
    attrs: {
      refX: 0,
      refX2: 5,
      textAnchor: 'start',
      align: {
        horizontal: 'left',
      },
    },
  },
  center: {
    text: '居中对齐',
    icon: <AlignCenterOutlined />,
    attrs: {
      refX: 0.5,
      refX2: 0,
      textAnchor: 'middle',
      align: {
        horizontal: 'center',
      },
    },
  },
  right: {
    text: '右对齐',
    icon: <AlignRightOutlined />,
    attrs: {
      refX: 0.99,
      refX2: -5,
      textAnchor: 'end',
      align: {
        horizontal: 'right',
      },
    },
  },
};

const HorizontalAlign: React.FC<IProps> = makeDropdownWidget({
  tooltip: '水平对齐',
  getIcon(flowChart: Graph) {
    let alignType = 'center';
    const nodes = getSelectedNodes(flowChart);
    if (nodes.length > 0) {
      alignType = safeGet(nodes, '0.attrs.label.align.horizontal', 'center');
    }
    return ALIGN_MAP[alignType].icon;
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    return (
      <Menu onClick={({ key }) => onChange(ALIGN_MAP[key].attrs)}>
        {Object.keys(ALIGN_MAP).map((alignType) => (
          <MenuItem key={alignType}>
            {ALIGN_MAP[alignType].icon}
            <span>{ALIGN_MAP[alignType].text}</span>
          </MenuItem>
        ))}
      </Menu>
    );
  },
  handler: (flowChart: Graph, value: any) => {
    getSelectedNodes(flowChart).forEach((node) => node.setAttrs({ label: value }));
  },
  disabled(flowChart: Graph) {
    return !hasNodeSelected(flowChart);
  },
});

export default HorizontalAlign;
