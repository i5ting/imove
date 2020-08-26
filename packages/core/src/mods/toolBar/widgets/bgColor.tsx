import React from 'react';

import 'antd/es/menu/style';
import styles from './index.module.less';

import {Graph} from '@antv/x6';
import {safeGet} from '../../../utils';
import XIcon from '../../../components/xIcon';
import makeDropdownWidget from './makeDropdownWidget';
import ColorPicker from '../../../components/colorPicker';

interface IProps {
  flowChart: Graph;
}

const BgColor: React.FC<IProps> = makeDropdownWidget({
  tooltip: '填充颜色',
  getIcon(flowChart: Graph) {
    let bgColor = '#DDD';
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      bgColor = safeGet(cells, '0.attrs.body.fill', '#575757');
    }
    return (
      <div className={styles.bgColorContainer}>
        <XIcon className={styles.fillIcon} type={'icon-tianchong'}/>
        <div className={styles.colorPreview} style={{backgroundColor: bgColor}}/>
      </div>
    );
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    let bgColor = '#DDD';
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      bgColor = safeGet(cells, '0.attrs.body.fill', '#575757');
    }
    const onChangeComplete = (color: string) => onChange(color);
    return (
      <ColorPicker color={bgColor} onChangeComplete={onChangeComplete}/>
    );
  },
  handler: (flowChart: Graph, value: any) => {
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      cells.forEach(cell => cell.setAttrs({body: {fill: value}}));
      flowChart.trigger('toolBar:forceUpdate');
    }
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  },
});

export default BgColor;
