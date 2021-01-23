import React from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';

// @ts-ignore
import SplitPane from 'react-split-pane/lib/SplitPane';
// @ts-ignore
import Pane from 'react-split-pane/lib/Pane';

interface ISubComponentProps {
  flowChart: Graph;
}

interface IProps {
  flowChart: Graph | undefined;
  Header: React.FC<ISubComponentProps>;
  SideBar: React.FC<ISubComponentProps>;
  ToolBar: React.FC<ISubComponentProps>;
  SettingBar: React.FC<ISubComponentProps>;
}

const Layout: React.FC<IProps> = (props) => {
  const { flowChart, Header, SideBar, ToolBar, SettingBar } = props;

  let header, sideBar, toolBar, settingBar;
  if (flowChart) {
    header = <Header flowChart={flowChart} />;
    sideBar = <SideBar flowChart={flowChart} />;
    toolBar = <ToolBar flowChart={flowChart} />;
    settingBar = <SettingBar flowChart={flowChart} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>{header}</div>
      <div className={styles.toolBar}>{toolBar}</div>
      <SplitPane split={'vertical'}>
        <Pane
          className={styles.sideBar}
          minSize={'145px'}
          maxSize={'443px'}
          initialSize={'267px'}
        >
          {sideBar}
        </Pane>
        <SplitPane split={'vertical'}>
          {props.children}
          <Pane
            className={styles.settingBar}
            minSize={'350px'}
            maxSize={'500px'}
            initialSize={'350px'}
          >
            {settingBar}
          </Pane>
        </SplitPane>
      </SplitPane>
    </div>
  );
};

export default Layout;
