import React, { ReactElement } from 'react';

import 'antd/es/menu/style';

import { Menu } from 'antd';
import { Cell, Graph } from '@antv/x6';
import XIcon from '../../../components/xIcon';
import makeDropdownWidget from './common/makeDropdownWidget';
import { getSelectedNodes } from '../../../utils/flowChartUtils';

interface IProps {
  flowChart: Graph;
}

interface AlignItem {
  text: string;
  icon: ReactElement;
  handler: (selectedNodes: Cell[]) => void;
}

const MenuItem = Menu.Item;
const ALIGN_MAP: { [key: string]: AlignItem } = {
  left: {
    text: '左对齐',
    icon: <XIcon type={'icon-align-left'} />,
    handler(selectedNodes: Cell[]) {
      let minLeftValue = Infinity;
      selectedNodes.forEach(node => {
        const { x } = node.getProp<{ x: number, y: number }>('position');
        if (x < minLeftValue) {
          minLeftValue = x;
        }
      });
      selectedNodes.forEach(node => node.setProp({ position: { x: minLeftValue } }));
    }
  },
  horizontalCenter: {
    text: '水平居中',
    icon: <XIcon type={'icon-align-horizontal-center'} />,
    handler(selectedNodes: Cell[]) {
      let minLeftValue = Infinity;
      let maxRightValue = -Infinity;
      selectedNodes.forEach(node => {
        const { x } = node.getProp<{ x: number, y: number }>('position');
        const { width } = node.getProp<{ width: number, height: number }>('size');
        if (x < minLeftValue) {
          minLeftValue = x;
        }
        if (x + width > maxRightValue) {
          maxRightValue = x + width;
        }
      });
      const centerValue = (minLeftValue + maxRightValue) / 2;
      selectedNodes.forEach(node => {
        const { width } = node.getProp<{ width: number, height: number }>('size');
        node.setProp({ position: { x: centerValue - width / 2 } });
      });
    }
  },
  right: {
    text: '右对齐',
    icon: <XIcon type={'icon-align-right'} />,
    handler(selectedNodes: Cell[]) {
      let maxRightValue = -Infinity;
      selectedNodes.forEach(node => {
        const { x } = node.getProp<{ x: number, y: number }>('position');
        const { width } = node.getProp<{ width: number, height: number }>('size');
        if (x + width > maxRightValue) {
          maxRightValue = x + width;
        }
      });
      selectedNodes.forEach(node => {
        const { width } = node.getProp<{ width: number, height: number }>('size');
        node.setProp({ position: { x: maxRightValue - width } })
      });
    }
  },
  top: {
    text: '顶部对齐',
    icon: <XIcon type={'icon-align-top'} />,
    handler(selectedNodes: Cell[]) {
      let minTopValue = Infinity;
      selectedNodes.forEach(node => {
        const { y } = node.getProp<{ x: number, y: number }>('position');
        if (y < minTopValue) {
          minTopValue = y;
        }
      });
      selectedNodes.forEach(node => node.setProp({ position: { y: minTopValue } }));
    }
  },
  verticalCenter: {
    text: '垂直居中',
    icon: <XIcon type={'icon-align-vertical-center'} />,
    handler(selectedNodes: Cell[]) {
      let minTopValue = Infinity;
      let maxBottomValue = -Infinity;
      selectedNodes.forEach(node => {
        const { y } = node.getProp<{ x: number, y: number }>('position');
        const { height } = node.getProp<{ width: number, height: number }>('size');
        if (y < minTopValue) {
          minTopValue = y;
        }
        if (y + height > maxBottomValue) {
          maxBottomValue = y + height;
        }
      });
      const centerValue = (minTopValue + maxBottomValue) / 2;
      selectedNodes.forEach(node => {
        const { height } = node.getProp<{ width: number, height: number }>('size');
        node.setProp({ position: { y: centerValue - height / 2 } });
      });
    }
  },
  bottom: {
    text: '底部对齐',
    icon: <XIcon type={'icon-align-bottom'} />,
    handler(selectedNodes: Cell[]) {
      let maxTopValue = -Infinity;
      selectedNodes.forEach(node => {
        const { y } = node.getProp<{ x: number, y: number }>('position');
        const { height } = node.getProp<{ width: number, height: number }>('size');
        if (y + height > maxTopValue) {
          maxTopValue = y + height;
        }
      });
      selectedNodes.forEach(node => {
        const { height } = node.getProp<{ width: number, height: number }>('size');
        node.setProp({ position: { y: maxTopValue - height } })
      });
    }
  }
};

const NodeAlign: React.FC<IProps> = makeDropdownWidget({
  tooltip: '对齐',
  getIcon() {
    return ALIGN_MAP['left'].icon;
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    return (
      <Menu onClick={({ key }) => onChange(key)}>
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
    const selectedNodes = getSelectedNodes(flowChart);
    ALIGN_MAP[value].handler(selectedNodes);
  },
  disabled(flowChart: Graph) {
    const selectedNodes = getSelectedNodes(flowChart);
    return selectedNodes.length < 2;
  },
});

export default NodeAlign;
