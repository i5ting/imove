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

const TextColor: React.FC<IProps> = makeDropdownWidget({
  tooltip: '文本颜色',
  getIcon(flowChart: Graph) {
    let textColor = '#DDD';
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      textColor = safeGet(cells, '0.attrs.label.fill', '#575757');
    }
    return (
      <div className={styles.textColorContainer}>
        <XIcon className={styles.textIcon} type={'icon-A'}/>
        <div className={styles.colorPreview} style={{backgroundColor: textColor}}/>
      </div>
    );
  },
  getOverlay(flowChart: Graph, onChange: (data: any) => void) {
    let textColor = '#DDD';
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      textColor = safeGet(cells, '0.attrs.label.fill', '#575757');
    }
    const onChangeComplete = (color: string) => onChange(color);
    return (
      <ColorPicker color={textColor} onChangeComplete={onChangeComplete}/>
    );
  },
  handler: (flowChart: Graph, value: any) => {
    const cells = flowChart.getSelectedCells();
    if(cells.length > 0) {
      cells.forEach(cell => cell.setAttrs({label: {fill: value}}));
      flowChart.trigger('toolBar:forceUpdate');
    }
  },
  disabled(flowChart: Graph) {
    return flowChart.getSelectedCellCount() === 0;
  },
});

export default TextColor;
