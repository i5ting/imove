import React from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';
import ConnectStatus from './connectStatus';

interface IProps {
  flowChart: Graph;
}

const Header: React.FC<IProps> = (props) => {
  const { flowChart } = props;
  return (
    <div className={styles.container}>
      <span className={styles.titleText}>iMove</span>
      <ConnectStatus flowChart={flowChart} />
    </div>
  );
};

export default Header;
