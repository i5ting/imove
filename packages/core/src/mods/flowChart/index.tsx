import React, {useRef, useEffect} from 'react';

import styles from './index.module.less';

import {Graph} from '@antv/x6';
import createFlowChart from './createFlowChart';

interface IProps {
  onReady: (graph: Graph) => void;
}

const FlowChart: React.FC<IProps> = props => {
  const {onReady} = props;
  const graphRef = useRef<HTMLDivElement>(null);
  const miniMapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(graphRef.current && miniMapRef.current) {
      const graph = createFlowChart(graphRef.current, miniMapRef.current);
      onReady(graph);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.flowChart} ref={graphRef}/>
      <div className={styles.miniMap} ref={miniMapRef}/>
    </div>
  );
};

export default FlowChart;
