import React, { useEffect } from 'react';
import Generator from 'fr-generator';
import JsonView from 'react-json-view';
import { Terminal } from 'xterm';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import CodeEditor from '../codeEditor';
import { defaultJson, formatJson, defaultConfig, formatConfig, compData } from './json'
import styles from './index.module.less';

const VisualTab: React.FC = () => {
  return (
    <div>
      <Generator
        settings={[
          {
            title: '表单组件库',
            widgets: compData,
          },
        ]}
      />
    </div>
  )
}

const JsonTab: React.FC = () => {
  useEffect(() => {
    let term = new Terminal();
    term.open(document.getElementById('terminal'));
    term.write('I\'m \x1B[1;3;31mterminal\x1B[0m $ ')
  }, [])

  return (
    <div className={styles.jsonInput}>
      <div className={styles.left}>
        <p>输入：</p>
        <CodeEditor
          width={'100%'}
          value={defaultJson}
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
            src={formatJson}
          />
        </div>
        <div className={styles.rightBottom}>
          <div id="terminal"></div>
        </div>
      </div>
    </div>
  );
}

interface IConfigProps {
  onChange?: (ev: any, newJson: string | undefined) => void
}

const ConfigTab: React.FC<IConfigProps> = (props) => {
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
  isConfig?: boolean,
  onChange?: (ev: any, newJson: string | undefined) => void
}

const CodeRun: React.FC<ICodeRunProps> = (props) => {
  return (
    <Tabs
      type="card"
      tabBarGutter={0}
      defaultActiveKey={'basic'}
      tabBarStyle={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <TabPane className={styles.tabPane} tab={'可视化'} key={'VisualTab'}>
        <VisualTab />
      </TabPane>
      <TabPane className={styles.tabPane} tab={'JSON'} key={'JsonTab'}>
        {props.isConfig ? <ConfigTab onChange={props.onChange} /> : <JsonTab />}
      </TabPane>
    </Tabs>
  )
}

export default CodeRun;
