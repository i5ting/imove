import React, {useEffect, useReducer} from 'react';

import 'antd/es/tooltip/style';
import styles from './index.module.less';

import {Graph} from '@antv/x6';
import widgets from './widgets';

interface IProps {
  flowChart: Graph | undefined;
}

const ToolBar: React.FC<IProps> = props => {
  const {flowChart} = props;
  const [ignored, forceUpdate] = useReducer(n => n + 1, 0);
  useEffect(() => {
    flowChart && flowChart.on('toolBar:forceUpdate', forceUpdate);
    return () => {
      flowChart && flowChart.off('toolBar:forceUpdate');
    };
  }, [flowChart]);
  return (
    <div className={styles.container}>
      {flowChart && widgets.map((group, index) => (
        <div key={index} className={styles.group}>
          {group.map((ToolItem, index) => {
            return <ToolItem key={index} flowChart={flowChart}/>;
          })}
        </div>
      ))}
    </div>
  );
};

export default ToolBar;
