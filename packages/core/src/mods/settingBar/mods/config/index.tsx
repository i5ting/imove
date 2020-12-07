import React, { useState, useEffect } from 'react';

import styles from './index.module.less';

import { Cell } from '@antv/x6';
import { Button, Empty } from 'antd';
import Input from '../../components/input';
import Checkbox from '../../components/checkbox';
import { safeParse } from '../../../../utils';

// FIXME
// save original config in tempConfig when change to edit mode
// and recover original config when click cancel button
let tempConfig: any = null;

enum Mode {
  edit = 'edit',
  readOnly = 'readOnly',
}

interface IConfig {
  [key: string]: any;
}

interface IProps {
  selectedCell: Cell;
}

const Config: React.FC<IProps> = (props) => {
  const { selectedCell } = props;
  const [mode, setMode] = useState<Mode>(Mode.readOnly);
  const [configData, setConfigData] = useState<IConfig>({});
  const [configSchema, setConfigSchema] = useState<IConfig>({});

  // life
  useEffect(() => {
    const { configSchema, configData = {} } = selectedCell.getData() || {};
    setConfigData(configData);
    setConfigSchema(safeParse(configSchema));
    selectedCell.on('change:configSchema', (data: { configSchema: string }) => {
      setConfigSchema(safeParse(data.configSchema));
    });
    return () => {
      selectedCell.off('change:configSchema');
    };
  }, [selectedCell]);

  // events
  const onFieldValueChange = (key: string, value: any) => {
    setConfigData(Object.assign({}, configData, { [key]: value }));
  };
  const onClickEdit = (): void => {
    setMode(Mode.edit);
    tempConfig = configData;
  };
  const onClickCancel = (): void => {
    setMode(Mode.readOnly);
    setConfigData(tempConfig);
  };
  const onClickSave = (): void => {
    setMode(Mode.readOnly);
    selectedCell.setData({ configData });
  };

  // no config schema
  if (!configSchema || Object.keys(configSchema).length === 0) {
    return (
      <div className={styles.container}>
        <Empty
          className={styles.empty}
          description={'请编辑投放配置schema'}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        {Object.keys(configSchema).map((key, idx) => {
          const { title, description, type } = configSchema[key];
          const FieldComponent = Helper.getFieldComponent(type);
          return (
            <FieldComponent
              key={idx}
              name={key}
              title={title}
              value={configData[key]}
              description={description}
              disabled={mode === Mode.readOnly}
              onValueChange={(value: any) => onFieldValueChange(key, value)}
            />
          );
        })}
        {mode === Mode.readOnly ? (
          <div className={styles.footContainer}>
            <Button block onClick={onClickEdit}>
              编辑
            </Button>
          </div>
        ) : (
          <div className={styles.footContainer}>
            <Button onClick={onClickCancel}>取消</Button>
            <Button className={styles.saveBtn} type={'primary'} onClick={onClickSave}>
              保存
            </Button>
          </div>
        )}
      </div>
    );
  }
};

const Helper = {
  getFieldComponent(type: string) {
    if (type === 'boolean') {
      return Checkbox;
    } else {
      return Input;
    }
  },
};

export default Config;
