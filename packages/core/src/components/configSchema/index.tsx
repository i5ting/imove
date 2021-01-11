import React, { useState } from 'react';
import Generator from 'fr-generator';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import CodeEditor from '../codeEditor';
import { defaultConfig, compData } from './json'
import styles from './index.module.less';
// import FormRender from 'form-render/lib/antd';
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
  const [jsonSchema, setJsonSchema] = useState(defaultConfig)

  return (
    <div className={styles.configInput}>
      <div className={styles.left}>
        <p>输入</p>
        <CodeEditor
          width={'100%'}
          language={'json'}
          value={jsonSchema}
          onChange={props.onChange}
        />
      </div>
      <div className={styles.right}>
        <p>表单可视化</p>
        {/* <FormRender
          schema={schema}
          onChange={onChange}
        /> */}
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
