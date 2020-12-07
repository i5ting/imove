import React, { useState, useEffect } from 'react';

import styles from './index.module.less';

import { Graph } from '@antv/x6';
import shortcuts from '../../../common/shortcuts';
import makeBtnWidget from './common/makeBtnWidget';
import { ZoomOutOutlined, ZoomInOutlined } from '@ant-design/icons';

interface IProps {
  flowChart: Graph;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.5;

const ZoomOut: React.FC<IProps> = makeBtnWidget({
  tooltip: '缩小',
  handler: shortcuts.zoomOut.handler,
  getIcon() {
    return <ZoomOutOutlined />;
  },
  disabled(flowChart: Graph) {
    return flowChart.zoom() <= MIN_ZOOM;
  },
});

const ZoomIn: React.FC<IProps> = makeBtnWidget({
  tooltip: '放大',
  handler: shortcuts.zoomIn.handler,
  getIcon() {
    return <ZoomInOutlined />;
  },
  disabled(flowChart: Graph) {
    return flowChart.zoom() >= MAX_ZOOM;
  },
});

const Zoom: React.FC<IProps> = (props) => {
  const { flowChart } = props;
  const [scale, setScale] = useState<number>(flowChart.zoom());
  useEffect(() => {
    flowChart.on('scale', () => {
      setScale(flowChart.zoom());
    });
  }, [flowChart]);
  return (
    <div className={styles.zoomContainer}>
      <ZoomOut {...props} />
      <span className={styles.zoomText}>{Helper.scaleFormatter(scale)}</span>
      <ZoomIn {...props} />
    </div>
  );
};

const Helper = {
  scaleFormatter(scale: number): string {
    return (scale * 100).toFixed(0) + '%';
  },
};

export default Zoom;
