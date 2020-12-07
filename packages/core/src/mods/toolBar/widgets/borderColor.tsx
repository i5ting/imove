import React from 'react';

import 'antd/es/menu/style';
import styles from './index.module.less';

import { Graph } from '@antv/x6';
import { safeGet } from '../../../utils';
import { HighlightOutlined } from '@ant-design/icons';
import ColorPicker from '../../../components/colorPicker';
import makeDropdownWidget from './common/makeDropdownWidget';
import { hasNodeSelected, getSelectedNodes } from '../../../utils/flowChartUtils';

interface IProps {
  flowChart: Graph;
}

const options = {
  tooltip: '边框颜色',
  getCurBorderColor(flowChart: Graph) {
    let borderColor = '#DDD';
    const nodes = getSelectedNodes(flowChart);
    if (!options.disabled(flowChart) && nodes.length > 0) {
      borderColor = safeGet(nodes, '0.attrs.body.stroke', '#333');
    }
    return borderColor;
  },
  getIcon(flowChart: Graph) {
    const borderColor = options.getCurBorderColor(flowChart);
    return (
      <div className={styles.borderColorContainer}>
        <HighlightOutlined className={styles.borderColorIcon} />
        <div className={styles.colorPreview} style={{ backgroundColor: borderColor }} />
      </div>
    );
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    const borderColor = options.getCurBorderColor(flowChart);
    const onChangeComplete = (color: string) => onChange(color);
    return <ColorPicker color={borderColor} onChangeComplete={onChangeComplete} />;
  },
  handler: (flowChart: Graph, value: any) => {
    getSelectedNodes(flowChart).forEach((node) => node.setAttrs({ body: { stroke: value } }));
  },
  disabled(flowChart: Graph) {
    return !hasNodeSelected(flowChart);
  },
};

const BorderColor: React.FC<IProps> = makeDropdownWidget(options);

export default BorderColor;
