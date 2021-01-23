import React from 'react';

import styles from './index.module.less';

interface IProps {
  title?: string;
}

const Cell: React.FC<IProps> = (props) => {
  const { title = '判断', ...rest } = props;
  return (
    <div className={styles.diamond} {...rest}>
      <svg
        width={'100%'}
        height={'100%'}
        xmlns={'http://www.w3.org/1999/xlink'}
      >
        <polygon
          points={'2,15 28,2 58,15 30,28'}
          style={{
            fill: '#FFFC7C',
            stroke: '#333',
            strokeWidth: 2,
          }}
        />
      </svg>
      <span className={styles.text}>{title}</span>
    </div>
  );
};

export default Cell;
