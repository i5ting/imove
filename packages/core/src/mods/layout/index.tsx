import React from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';

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
      <div className={styles.body}>
        <div className={styles.sideBar}>{sideBar}</div>
        <div className={styles.full}>
          <div className={styles.toolBar}>{toolBar}</div>
          {props.children}
        </div>
        <div className={styles.settingBar}>{settingBar}</div>
      </div>
    </div>
  );
};

export default Layout;
