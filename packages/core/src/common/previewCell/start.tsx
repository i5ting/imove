import React from 'react';

import styles from './index.module.less';

interface IProps extends React.HTMLProps<HTMLDivElement> {
  title?: string;
}

const Cell: React.FC<IProps> = (props) => {
  const { title = '开始', ...rest } = props;
  return (
    <div className={styles.circle} {...rest}>
      {title}
    </div>
  );
};

export default Cell;
