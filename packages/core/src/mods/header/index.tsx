import React from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';
import Export from './export';
import ImportDSL from './importDSL';
import ConnectStatus from './connectStatus';

interface IProps {
  flowChart: Graph;
}

const Header: React.FC<IProps> = (props) => {
  const { flowChart } = props;
  return (
    <div className={styles.container}>
      <a href="https://github.com/imgcook/imove">
        <span className={styles.titleText}>iMove</span>
      </a>
      <div className={styles.widgets}>
        <Export flowChart={flowChart} />
        <ImportDSL flowChart={flowChart} />
        <ConnectStatus flowChart={flowChart} />
      </div>
    </div>
  );
};

export default Header;
