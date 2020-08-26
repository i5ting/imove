import React from 'react';

import {Graph} from '@antv/x6';
import makeBtnWidget from './makeBtnWidget';
import {RedoOutlined} from '@ant-design/icons';
import shortcuts from '../../../common/shortcuts';

interface IProps {
  flowChart: Graph
}

const Save: React.FC<IProps> = makeBtnWidget({
  tooltip: '重做',
  handler: shortcuts['redo'].handler,
  getIcon() {
    return <RedoOutlined/>;
  },
  disabled(flowChart: Graph) {
    return !flowChart.canRedo();
  }
});

export default Save;
