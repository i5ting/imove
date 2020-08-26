import React, {useState} from 'react';

import '@antv/x6/dist/x6.css';
import styles from './index.module.less';

import {Graph} from '@antv/x6';
import Header from './mods/header';
import SideBar from './mods/sideBar';
import ToolBar from './mods/toolBar';
import FlowChart from './mods/flowChart';
import SettingBar from './mods/settingBar';

interface IProps {
  onSave: (data: {nodes: any; edges: any}) => void;
}

const Core: React.FC<IProps> = props => {

  const {onSave} = props;
  const [flowChart, setGraph] = useState<Graph>();

  const onFlowChartReady = (flowChart: Graph): void => {
    setGraph(flowChart);
    flowChart.on('node:added', (args) => {
      flowChart.cleanSelection();
      flowChart.select(args.cell);
    });
    flowChart.on('selection:changed', () => {
      flowChart.trigger('toolBar:forceUpdate');
      flowChart.trigger('settingBar:forceUpdate');
    });
  };

  return (
    <div className={styles.container}>
      <Header title={'iMove'}/>
      <div className={styles.body}>
        <SideBar flowChart={flowChart}/>
        <div className={styles.full}>
          <ToolBar flowChart={flowChart}/>
          <FlowChart onReady={onFlowChartReady}/>
        </div>
        <SettingBar flowChart={flowChart}/>
      </div>
    </div>
  );
};

export default Core;
