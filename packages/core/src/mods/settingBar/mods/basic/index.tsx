import React, { useState, useEffect } from 'react';

import styles from './index.module.less';

import { Card } from 'antd';
import { Cell, Graph } from '@antv/x6';
import Json from '../../components/json';
import Input from '../../components/input';

interface IProps {
  selectedCell: Cell;
  flowChart: Graph;
}

interface IBasicData {
  label: string;
  trigger?: string;
  dependencies: string;
  configSchema: string;
}

const Basic: React.FC<IProps> = (props) => {
  const { selectedCell, flowChart } = props;
  const [data, setData] = useState<IBasicData>(selectedCell.getData());
  const { label, trigger, dependencies, configSchema } = data || {};

  // life
  useEffect(() => {
    setData(selectedCell.getData());
  }, [selectedCell]);
  useEffect(() => {
    const handler = () => setData(selectedCell.getData());
    flowChart.on('settingBar.basicPanel:forceUpdate', handler);
    return () => {
      flowChart.off('settingBar.basicPanel:forceUpdate', handler);
    };
  }, [selectedCell]);

  // events
  const batchUpdate = (newData: { [key: string]: any }): void => {
    selectedCell.setData(newData);
    setData(Object.assign({}, data, newData));
  };
  const commonChange = (key: string, val: string): void => {
    batchUpdate({ [key]: val });
  };
  const onChangeLabel = (val: string): void => {
    commonChange('label', val);
    selectedCell.setAttrs({ label: { text: val } });
  };
  const onChangeConfigSchema = (val: string): void => {
    commonChange('configSchema', val);
  };
  const onChangeTrigger = (val: string): void => {
    commonChange('trigger', val);
  };
  const onChangeDependencies = (val: string): void => {
    commonChange('dependencies', val);
  };

  return (
    <div className={styles.container}>
      <Card title="名称">
        <Input
          name={'label'}
          title={'节点显示名称'}
          value={label}
          onValueChange={onChangeLabel}
        />
        {selectedCell.shape === 'imove-start' && (
          <div className={styles.input}>
            <Input
              name={'trigger'}
              title={'逻辑触发名称'}
              value={trigger}
              onValueChange={onChangeTrigger}
            />
          </div>
        )}
      </Card>
      <Json
        name={'dependencies'}
        title={'依赖'}
        value={dependencies}
        isConfig={false}
        onValueChange={onChangeDependencies}
      />
      <Json
        name={'configSchema'}
        title={'投放配置'}
        selectedCell={selectedCell}
        value={configSchema}
        isConfig={true}
        onValueChange={onChangeConfigSchema}
      />
    </div>
  );
};

export default Basic;
