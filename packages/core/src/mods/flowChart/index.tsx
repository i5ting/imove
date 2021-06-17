import React, { useRef, useState, useEffect } from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';
import { queryGraph } from '../../api';
import { parseQuery } from '../../utils';
import createFlowChart from './createFlowChart';
import CodeRunModal from './codeRunModal';
import CodeEditorModal from './codeEditorModal';
import FlowChartContextMenu from './contextMenu';

interface IProps {
  onReady: (graph: Graph) => void;
}

interface IMenuInfo {
  x: number;
  y: number;
  scene: string;
  visible: boolean;
}

const defaultMenuInfo = {
  x: 0,
  y: 0,
  scene: 'blank',
  visible: false,
};

const FlowChart: React.FC<IProps> = (props) => {
  const { onReady } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const miniMapRef = useRef<HTMLDivElement>(null);
  const [flowChart, setFlowChart] = useState<Graph>();
  const [contextMenuInfo, setContextMenuInfo] =
    useState<IMenuInfo>(defaultMenuInfo);

  useEffect(() => {
    if (graphRef.current && miniMapRef.current) {
      const flowChart = createFlowChart(graphRef.current, miniMapRef.current);
      onReady(flowChart);
      fetchData(flowChart);
      setFlowChart(flowChart);
    }
  }, []);

  // resize flowChart's size when window size changes
  useEffect(() => {
    const handler = () => {
      requestAnimationFrame(() => {
        if (flowChart && wrapperRef && wrapperRef.current) {
          const width = wrapperRef.current.clientWidth;
          const height = wrapperRef.current.clientHeight;
          flowChart.resize(width, height);
        }
      });
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [flowChart, wrapperRef]);

  // NOTE: listen toggling context menu event
  useEffect(() => {
    const showHandler = (info: IMenuInfo) => {
      flowChart?.lockScroller();
      setContextMenuInfo({ ...info, visible: true });
    };
    const hideHandler = () => {
      flowChart?.unlockScroller();
      setContextMenuInfo({ ...contextMenuInfo, visible: false });
    };
    if (flowChart) {
      flowChart.on('graph:showContextMenu', showHandler);
      flowChart.on('graph:hideContextMenu', hideHandler);
    }
    return () => {
      if (flowChart) {
        flowChart.off('graph:showContextMenu', showHandler);
        flowChart.off('graph:hideContextMenu', hideHandler);
      }
    };
  }, [flowChart]);

  const fetchData = (flowChart: Graph) => {
    const { projectId } = parseQuery();
    queryGraph(projectId as string)
      .then((res) => {
        const { data: dsl } = res;
        flowChart.fromJSON(dsl);
      })
      .catch((error) => {
        console.log('query graph data failed, the error is:', error);
      });
  };

  return (
    <div className={styles.container} ref={wrapperRef}>
      <div className={styles.flowChart} ref={graphRef} />
      <div className={styles.miniMap} ref={miniMapRef} />
      {flowChart && <CodeRunModal flowChart={flowChart} />}
      {flowChart && <CodeEditorModal flowChart={flowChart} />}
      {flowChart && (
        <FlowChartContextMenu {...contextMenuInfo} flowChart={flowChart} />
      )}
    </div>
  );
};

export default FlowChart;
