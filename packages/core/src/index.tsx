import React, { useState } from 'react';

import './global.index.less';
import '@antv/x6/dist/x6.css';

import { Graph } from '@antv/x6';
import Layout from './mods/layout';
import Header from './mods/header';
import SideBar from './mods/sideBar';
import ToolBar from './mods/toolBar';
import FlowChart from './mods/flowChart';
import SettingBar from './mods/settingBar';

interface IProps {
  onSave: (data: { nodes: any; edges: any }) => void;
}

const Core: React.FC<IProps> = (props) => {
  const { onSave } = props;
  const [flowChart, setFlowChart] = useState<Graph>();
  const onFlowChartReady = (flowChart: Graph): void => setFlowChart(flowChart);
  return (
    <Layout
      flowChart={flowChart}
      Header={Header}
      SideBar={SideBar}
      ToolBar={ToolBar}
      SettingBar={SettingBar}
    >
      <FlowChart onReady={onFlowChartReady} />
    </Layout>
  );
};

export default Core;
