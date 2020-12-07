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
  tooltip: '填充颜色',
  getCurBgColor(flowChart: Graph) {
    let bgColor = '#DDD';
    const nodes = getSelectedNodes(flowChart);
    if (!options.disabled(flowChart) && nodes.length > 0) {
      bgColor = safeGet(nodes, '0.attrs.body.fill', '#575757');
    }
    return bgColor;
  },
  getIcon(flowChart: Graph) {
    const bgColor = options.getCurBgColor(flowChart);
    return (
      <div className={styles.bgColorContainer}>
        <XIcon className={styles.fillIcon} type={'icon-tianchong'} />
        <div className={styles.colorPreview} style={{ backgroundColor: bgColor }} />
      </div>
    );
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    const bgColor = options.getCurBgColor(flowChart);
    const onChangeComplete = (color: string) => onChange(color);
    return <ColorPicker color={bgColor} onChangeComplete={onChangeComplete} />;
  },
  handler: (flowChart: Graph, value: any) => {
    getSelectedNodes(flowChart).forEach((node) => node.setAttrs({ body: { fill: value } }));
  },
  disabled(flowChart: Graph) {
    return !hasNodeSelected(flowChart);
  },
};

const BgColor: React.FC<IProps> = makeDropdownWidget(options);

export default BgColor;
