import React, {
  useState,
  useEffect,
} from 'react';

import styles from './index.module.less';

import { Modal } from 'antd';
import { Cell, Graph } from '@antv/x6';
import JsonView from 'react-json-view';
import Json from '../../components/json';
import Code from '../../components/code';
import Input from '../../components/input';
import { safeParse } from '../../../../utils/index';
import analyzeDeps from '../../../../utils/analyzeDeps';

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
  const [data, setData] = useState<IBasicData>(selectedCell.getData());
  const { label, code, trigger, dependencies, configSchema } = data || {};

  // life
  useEffect(() => {
    setData(selectedCell.getData());
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
    selectedCell.trigger('change:configSchema', { configSchema: val });
  };
  const onChangeTrigger = (val: string): void => {
    commonChange('trigger', val);
  };
  const onChangeDependencies = (val: string): void => {
    commonChange('dependencies', val);
  };
  const onChangeCode = (val: string): void => {
    commonChange('code', val);
    // NOTE: if code changes, check whether new dependencies are added
    const excludeDeps = safeParse(data?.dependencies as string);
    analyzeDeps(val, Object.keys(excludeDeps)).then((deps) => {
      if (Object.keys(deps).length > 0) {
        Modal.info({
          title: '检测到您的代码有新依赖，已为您自动更新',
          content: (
            <div className={styles.depsInfoModalContent}>
              <JsonView
                src={deps}
                name={'dependencies'}
                collapsed={false}
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
              />
            </div>
          ),
          onOk() {
            batchUpdate({
              code: val,
              dependencies: JSON.stringify({ ...excludeDeps, ...deps }, null, 2)
            });
          },
        });
      }
    });
  };

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
      <Code
        name={'code'}
        title={'代码'}
        value={code}
        flowChart={flowChart}
        onValueChange={onChangeCode}
      />
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
        onlyInput={true}
        onValueChange={onChangeDependencies}
      />
    </div>
  );
};

export default Basic;
