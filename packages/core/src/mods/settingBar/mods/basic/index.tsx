import React, { useState, useEffect } from 'react';

import styles from './index.module.less';

import { Cell, Graph } from '@antv/x6';
import Json from '../../components/json';
import Code from '../../components/code';
import Input from '../../components/input';

interface IProps {
  selectedCell: Cell;
  flowChart: Graph;
}

interface IBasicData {
  label: string;
  code: string;
  trigger?: string;
  dependencies: string;
  configSchema: string;
}

const Basic: React.FC<IProps> = (props) => {
  const { selectedCell, flowChart } = props;
  const [data, setData] = useState<IBasicData>();
  const { label, code, trigger, dependencies, configSchema } = data || {};

  // life
  useEffect(() => {
    setData(selectedCell.getData());
    
  }, [selectedCell]);

  // events
  const commonChange = (key: string, val: string): void => {
    selectedCell.setData({ [key]: val });
    setData(Object.assign({}, data, { [key]: val }));
  };
  const onChangeLabel = (val: string): void => {
    commonChange('label', val);
    selectedCell.setAttrs({ label: { text: val } });
  };
  const onChangeConfigSchema = (val: string): void => {
    commonChange('configSchema', val);
    selectedCell.trigger('change:configSchema', { configSchema: val });
  };
  const onChangeCode = (val: string): void => commonChange('code', val);
  const onChangeTrigger = (val: string): void => commonChange('trigger', val);
  const onChangeDependencies = (val: string): void => commonChange('dependencies', val);

  return (
    <div className={styles.container}>
      <Input name={'label'} title={'显示名称'} value={label} onValueChange={onChangeLabel} />
      {selectedCell.shape === 'imove-start' && (
        <Input
          name={'trigger'}
          title={'逻辑触发名称'}
          value={trigger}
          onValueChange={onChangeTrigger}
        />
      )}
      <Code name={'code'} title={'代码'} value={code} onValueChange={onChangeCode} flowChart={flowChart} />
      <Json
        name={'configSchema'}
        title={'投放配置schema'}
        value={configSchema}
        onValueChange={onChangeConfigSchema}
      />
      <Json
        name={'dependencies'}
        title={'依赖'}
        value={dependencies}
        onValueChange={onChangeDependencies}
      />
    </div>
  );
};

export default Basic;
