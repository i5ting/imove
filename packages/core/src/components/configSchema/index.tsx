import React from 'react';
import Generator from 'fr-generator';
import JsonView from 'react-json-view';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import CodeEditor from '../codeEditor';
import { defaultConfig, formatConfig, compData } from './json'
import styles from './index.module.less';

interface IProps {
  onChange: (value: object) => void
}

interface FormValue {
  children: object[],
  parent: string,
  schema: object
}

const VisualTab: React.FC<IProps> = (props) => {
  const onChange = (value: FormValue) => {
    props.onChange(value.schema)
  }

  return (
    <div className={styles.form}>
      <Generator
        settings={[{
          title: '表单组件库',
          widgets: compData,
        }]}
        onChange={onChange}
      />
    </div>
  )
}

const ConfigTab: React.FC<IProps> = (props) => {
  return (
    <div className={styles.configInput}>
      <div className={styles.left}>
        <p>输入：</p>
        <CodeEditor
          width={'100%'}
          value={defaultConfig}
          onChange={props.onChange}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.rightTop}>
          <p>输入格式化：</p>
          <JsonView
            name={null}
            collapsed={false}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            src={formatConfig}
          />
        </div>
      </div>
    </div>
  );
}

interface ICodeRunProps {
  onChange: (value: object) => void
}

const ConfigSchema: React.FC<ICodeRunProps> = (props) => {
  return (
    <Tabs
      type="card"
      tabBarGutter={0}
      defaultActiveKey={'basic'}
      tabBarStyle={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <TabPane className={styles.tabPane} tab={'可视化'} key={'VisualTab'}>
        <VisualTab onChange={props.onChange} />
      </TabPane>
      <TabPane className={styles.tabPane} tab={'JSON'} key={'JsonTab'}>
        <ConfigTab onChange={props.onChange} />
      </TabPane>
    </Tabs>
  )
}

export default ConfigSchema;
