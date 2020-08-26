import React from 'react';

import {Graph} from '@antv/x6';
import makeBtnWidget from './makeBtnWidget';
import {SaveOutlined} from '@ant-design/icons';
import shortcuts from '../../../common/shortcuts';

interface IProps {
  flowChart: Graph
}

const Save: React.FC<IProps> = makeBtnWidget({
  tooltip: '保存',
  handler: shortcuts['save'].handler,
  getIcon() {
    return <SaveOutlined/>;
  }
});

export default Save;
