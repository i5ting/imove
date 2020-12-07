import React, { useEffect, useReducer } from 'react';

import 'antd/es/tooltip/style';
import styles from './index.module.less';

import { Graph } from '@antv/x6';
import widgets from './widgets';
import ModifyStatus from './widgets/modifyStatus';

interface IProps {
  flowChart: Graph;
}

const ToolBar: React.FC<IProps> = (props) => {
  const { flowChart } = props;
  const forceUpdate = useReducer((n) => n + 1, 0)[1];

  useEffect(() => {
    flowChart.on('toolBar:forceUpdate', forceUpdate);
    return () => {
      flowChart.off('toolBar:forceUpdate');
    };
  }, []);

  return (
    <div className={styles.container}>
      {widgets.map((group, index) => (
        <div key={index} className={styles.group}>
          {group.map((ToolItem, index) => {
            return <ToolItem key={index} flowChart={flowChart} />;
          })}
        </div>
      ))}
      <ModifyStatus flowChart={flowChart} />
    </div>
  );
};

export default ToolBar;
