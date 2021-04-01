import React from 'react';

import styles from './index.module.less';

interface IProps extends React.HTMLProps<HTMLDivElement> {
  title?: string;
}

const Cell: React.FC<IProps> = (props) => {
  const { title = '开始', ...rest } = props;
  return (
    <div className={styles.box} {...rest}>
      <div className={styles.circle}>
        <span className={styles.text}>{title}</span>
      </div>
    </div>
  );
};

export default Cell;
