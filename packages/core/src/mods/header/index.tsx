import React from 'react';

import styles from './index.module.less';

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = props => {
  const {title = 'iMove'} = props;
  return (
    <div className={styles.container}>
      <span className={styles.titleText}>{title}</span>
    </div>
  );
}

export default Header;
