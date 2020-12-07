import React from 'react';

import 'antd/es/menu/style';
import styles from './index.module.less';

import { Graph } from '@antv/x6';
import { safeGet } from '../../../utils';
import XIcon from '../../../components/xIcon';
import ColorPicker from '../../../components/colorPicker';
import makeDropdownWidget from './common/makeDropdownWidget';
import { hasNodeSelected, getSelectedNodes } from '../../../utils/flowChartUtils';

interface IProps {
  flowChart: Graph;
}

const options = {
  tooltip: '文本颜色',
  getCurTextColor(flowChart: Graph) {
    let textColor = '#DDD';
    const nodes = getSelectedNodes(flowChart);
    if (nodes.length > 0) {
      textColor = safeGet(nodes, '0.attrs.label.fill', '#575757');
    }
    return textColor;
  },
  getIcon(flowChart: Graph) {
    const textColor = options.getCurTextColor(flowChart);
    return (
      <div className={styles.textColorContainer}>
        <XIcon className={styles.textIcon} type={'icon-A'} />
        <div className={styles.colorPreview} style={{ backgroundColor: textColor }} />
      </div>
    );
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    const textColor = options.getCurTextColor(flowChart);
    const onChangeComplete = (color: string) => onChange(color);
    return <ColorPicker color={textColor} onChangeComplete={onChangeComplete} />;
  },
  handler: (flowChart: Graph, value: any) => {
    flowChart.getSelectedCells().forEach((node) => node.setAttrs({ label: { fill: value } }));
  },
  disabled(flowChart: Graph) {
    return !hasNodeSelected(flowChart);
  },
};

const TextColor: React.FC<IProps> = makeDropdownWidget(options);

export default TextColor;
