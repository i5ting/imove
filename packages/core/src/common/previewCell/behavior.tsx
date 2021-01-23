import React from 'react';

import styles from './index.module.less';

interface IProps {
  title?: string;
}

const Cell: React.FC<IProps> = (props) => {
  const { title = '处理', ...rest } = props;
  return (
    <div className={styles.rect} {...rest}>
      {title}
    </div>
  );
};

export default Cell;
