import React from 'react';

import styles from './index.module.less';

interface IProps {
  title?: string;
}

const Cell: React.FC<IProps> = (props) => {
  const { title = '判断', ...rest } = props;
  const z = (n: any) => n * 1.2;
  return (
    <div className={styles.box} {...rest}>
      <svg width={z(40)} height={z(30)} xmlns={'http://www.w3.org/1999/xlink'}>
        <polygon
          points={`0,${z(15)} ${z(20)},0 ${z(40)},${z(15)} ${z(20)},${z(30)}`}
          style={{
            fill: '#FFF6D1',
            stroke: '#FFB96B',
            strokeWidth: 2,
          }}
        />
      </svg>
      <span className={styles.text}>{title}</span>
    </div>
  );
};

export default Cell;
