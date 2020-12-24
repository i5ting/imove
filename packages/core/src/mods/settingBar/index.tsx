import React, { useEffect, useReducer } from 'react';

import 'antd/es/tabs/style';
import 'antd/es/empty/style';
import styles from './index.module.less';

import { Empty, Tabs } from 'antd';
import Basic from './mods/basic';
import Config from './mods/config';
import { Graph } from '@antv/x6';

const { TabPane } = Tabs;

interface IProps {
  flowChart: Graph;
}

const SettingBar: React.FC<IProps> = (props) => {
  const { flowChart } = props;
  const forceUpdate = useReducer((n) => n + 1, 0)[1];

  useEffect(() => {
    flowChart.on('settingBar:forceUpdate', forceUpdate);
    return () => {
      flowChart.off('settingBar:forceUpdate');
    };
  }, []);

  const nodes = flowChart.getSelectedCells().filter((v) => v.shape !== 'edge');
  if (nodes.length === 1) {
    return (
      <div className={styles.container}>
        <Tabs
          tabBarGutter={0}
          defaultActiveKey={'basic'}
          tabBarStyle={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TabPane tab={'基础信息'} key={'basic'}>
            <Basic selectedCell={nodes[0]} flowChart={flowChart}/>
          </TabPane>
          <TabPane tab={'投放配置'} key={'config'}>
            <Config selectedCell={nodes[0]} />
          </TabPane>
        </Tabs>
      </div>
    );
  } else {
    return (
      <div className={`${styles.container} ${styles.center}`}>
        <Empty description={'请选择一个节点'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }
};

export default SettingBar;
