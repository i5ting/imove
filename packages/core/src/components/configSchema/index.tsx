import React, { useState, useRef } from 'react';
import Generator from 'fr-generator';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import CodeEditor from '../codeEditor';
import { compData } from './json'
import styles from './index.module.less';
interface IProps {
  onChange: (value: object) => void
}

const ConfigSchema: React.FC<IProps> = (props) => {
  const [code, setCode] = useState('')
  const [schema, setSchema] = useState({})
  const formRef = useRef<HTMLDivElement>()

  // 同步代码
  const tabChange = () => {
    // 可视化同步到编辑器
    // @ts-ignore
    const formSchema = formRef.current && formRef.current.getValue()
    setSchema(formSchema)
    setCode(JSON.stringify(formSchema, null, 2))

    // 编辑器同步到可视化
    try {
      const codeObj = JSON.parse(code)
      setSchema(codeObj)
      // @ts-ignore
      formRef.current.setValue(codeObj)
    } catch (error) {
      console.log('can\'t parse code string to form schema, the error is:', error.message);
    }
  }

  const codeChange = (ev: any, newCode: any) => {
    setCode(newCode)
  }

  return (
    <Tabs
      type="card"
      tabBarGutter={0}
      defaultActiveKey={'basic'}
      onChange={tabChange}
      tabBarStyle={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <TabPane className={styles.tabPane} tab={'可视化'} key={'VisualTab'}>
        <div className={styles.form}>
          <Generator
            ref={formRef}
            settings={[{
              title: '表单组件库',
              widgets: compData,
            }]}
          />
        </div>
      </TabPane>
      <TabPane className={styles.tabPane} tab={'JSON'} key={'JsonTab'}>
        <div className={styles.configInput}>
          <CodeEditor
            width={'100%'}
            language={'json'}
            value={code}
            onChange={codeChange}
          />
        </div>
      </TabPane>
    </Tabs>
  )
}

export default ConfigSchema;
