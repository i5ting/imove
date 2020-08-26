import React from 'react';

import 'antd/es/menu/style';
import styles from './index.module.less';

import {Graph} from '@antv/x6';
import {safeGet} from '../../../utils';
import {HighlightOutlined} from '@ant-design/icons';
import makeDropdownWidget from './makeDropdownWidget';
import ColorPicker from '../../../components/colorPicker';

interface IProps {
  flowChart: Graph;
}

const LineColor: React.FC<IProps> = makeDropdownWidget({
  tooltip: '线条颜色',
  getIcon(flowChart: Graph) {
    let lineColor = '#DDD';
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      lineColor = safeGet(cells, '0.attrs.body.stroke', '#333');
    }
    return (
      <div className={styles.lineColorContainer}>
        <HighlightOutlined className={styles.lineIcon}/>
        <div className={styles.colorPreview} style={{backgroundColor: lineColor}}/>
      </div>
    );
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    let lineColor = '#DDD';
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      lineColor = safeGet(cells, '0.attrs.body.stroke', '#333');
    }
    const onChangeComplete = (color: string) => onChange(color);
    return (
      <ColorPicker color={lineColor} onChangeComplete={onChangeComplete}/>
    );
  },
  handler: (flowChart: Graph, value: any) => {
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      cells.forEach(cell => cell.setAttrs({body: {stroke: value}}));
      flowChart.trigger('toolBar:forceUpdate');
    }
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  },
});

export default LineColor;
