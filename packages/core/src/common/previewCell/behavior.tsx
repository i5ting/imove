import React from 'react';

import styles from './index.module.less';

interface IProps {
  title?: string;
}

const Cell: React.FC<IProps> = (props) => {
  const { title = '处理', ...rest } = props;
  return (
    <div className={styles.box} {...rest} title={title}>
      <div className={styles.rect}>
        <span className={styles.service_text}>{title}</span>
      </div>
    </div>
  );
};

export default Cell;
