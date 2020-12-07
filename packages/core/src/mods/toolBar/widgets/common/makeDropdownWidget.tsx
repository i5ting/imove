import React, { ReactElement } from 'react';

import 'antd/es/tooltip/style';
import 'antd/es/dropdown/style';
import styles from '../index.module.less';

import { Graph } from '@antv/x6';
import { Tooltip, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

interface IOptions {
  tooltip: string;
  getIcon: (flowChart: Graph) => ReactElement;
  getOverlay: (flowChart: Graph, onChange: (data: any) => void) => ReactElement;
  handler: (flowChart: Graph, data: any) => void;
  disabled?: (flowChart: Graph) => boolean;
}

interface IDropdownWidgetProps {
  flowChart: Graph;
}

const makeDropdownWidget = (options: IOptions) => {
  const Widget: React.FC<IDropdownWidgetProps> = (props) => {
    const { flowChart } = props;
    const { tooltip, getIcon, getOverlay, handler } = options;
    const iconWrapperCls = [styles.btnWidget];
    let { disabled = false } = options;
    if (typeof disabled === 'function') {
      disabled = disabled(flowChart);
      disabled && iconWrapperCls.push(styles.disabled);
    }
    const onChange = (data: any): void => {
      if (disabled) return;
      handler(flowChart, data);
      flowChart.trigger('toolBar:forceUpdate');
    };
    return (
      <Tooltip title={tooltip}>
        <Dropdown disabled={disabled} overlay={getOverlay(flowChart, onChange)} trigger={['click']}>
          <div className={iconWrapperCls.join(' ')}>
            {getIcon(flowChart)} <CaretDownOutlined className={styles.caret} />
          </div>
        </Dropdown>
      </Tooltip>
    );
  };
  return Widget;
};

export default makeDropdownWidget;
