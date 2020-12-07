import React, { useRef, useEffect } from 'react';

import styles from './index.module.less';

import { message } from 'antd';
import { Graph } from '@antv/x6';
import { queryGraph } from '../../api';
import { parseQuery } from '../../utils';
import createFlowChart from './createFlowChart';

interface IProps {
  onReady: (graph: Graph) => void;
}

const FlowChart: React.FC<IProps> = (props) => {
  const { onReady } = props;
  const graphRef = useRef<HTMLDivElement>(null);
  const miniMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (graphRef.current && miniMapRef.current) {
      const graph = createFlowChart(graphRef.current, miniMapRef.current);
      onReady(graph);
      fetchData(graph);
    }
  }, []);

  const fetchData = (graph: Graph) => {
    const { projectId } = parseQuery();
    queryGraph(projectId as string)
      .then((res) => {
        const { data: dsl } = res;
        graph.fromJSON(dsl);
      })
      .catch((error) => {
        console.log('query graph data failed, the error is:', error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.flowChart} ref={graphRef} />
      <div className={styles.miniMap} ref={miniMapRef} />
    </div>
  );
};

export default FlowChart;
