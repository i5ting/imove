import React, { ReactElement } from 'react';

import 'antd/es/menu/style';

import { Menu } from 'antd';
import { Graph } from '@antv/x6';
import { safeGet } from '../../../utils';
import makeDropdownWidget from './common/makeDropdownWidget';
import { hasNodeSelected, getSelectedNodes } from '../../../utils/flowChartUtils';
import {
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';

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
    };
  };
}

const MenuItem = Menu.Item;
const ALIGN_MAP: { [key: string]: AlignItem } = {
  top: {
    text: '上对齐',
    icon: <VerticalAlignTopOutlined />,
    attrs: {
      refY: 0,
      refY2: 10,
      textVerticalAlign: 'start',
      align: {
        vertical: 'top',
      },
    },
  },
  center: {
    text: '居中对齐',
    icon: <VerticalAlignMiddleOutlined />,
    attrs: {
      refY: 0.5,
      refY2: 0,
      textVerticalAlign: 'middle',
      align: {
        vertical: 'center',
      },
    },
  },
  bottom: {
    text: '下对齐',
    icon: <VerticalAlignBottomOutlined />,
    attrs: {
      refY: 0.99,
      refY2: -10,
      textVerticalAlign: 'end',
      align: {
        vertical: 'bottom',
      },
    },
  },
};

const VerticalAlign: React.FC<IProps> = makeDropdownWidget({
  tooltip: '垂直对齐',
  getIcon(flowChart: Graph) {
    let alignType = 'center';
    const nodes = getSelectedNodes(flowChart);
    if (nodes.length > 0) {
      alignType = safeGet(nodes, '0.attrs.label.align.vertical', 'center');
    }
    return ALIGN_MAP[alignType].icon;
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    return (
      <Menu onClick={({ key }) => onChange(ALIGN_MAP[key].attrs)}>
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
    getSelectedNodes(flowChart).forEach((node) => node.setAttrs({ label: value }));
  },
  disabled(flowChart: Graph) {
    return !hasNodeSelected(flowChart);
  },
});

export default VerticalAlign;
