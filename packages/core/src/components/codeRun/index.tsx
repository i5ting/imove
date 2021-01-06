import React from 'react';
import Generator from 'fr-generator';
import styles from './index.module.less';
import JsonView from 'react-json-view';
import CodeEditor from '../codeEditor';
import COMP_JSON from './comp'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

// mock
const defaultInputData = `const inputData = {
  // 上游数据
  pipe: {
    success: false,
    message: '未登录'
  },
  // 公用数据
  context: {
    data: {
      isLogin: false
    }
  },
  // 传入载荷
  payload: {

  },
  // 节点配置项
  config: {

  }
}`;

const mockRunResult = {
  pipe: {
    success: false,
    message: '未登录'
  },
  context: {
    data: {
      isLogin: false
    }
  }
}

const VisualTab: React.FC = (props) => {
  return (
    <div style={{ height: 680 }}>
      <Generator
        settings={[
          {
            title: '表单组件库',
            widgets: COMP_JSON,
          },
        ]}
      />
    </div>
  )
}

const JsonTab: React.FC = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.half}>
        <p>输入：</p>
        <CodeEditor
          width={'100%'}
          height={'650px'}
          value={defaultInputData}
        />
      </div>
      <div className={styles.half}>
        <p>输入格式化：</p>
        <JsonView
          name={null}
          collapsed={false}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          src={mockRunResult}
        />
      </div>
      <div className={styles.half}>
        <p>结果输出：</p>
        <JsonView
          name={null}
          collapsed={false}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          src={mockRunResult}
        />
      </div>
    </div>
  );
}
const CodeRun: React.FC = (props) => {
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
        <JsonTab />
      </TabPane>
    </Tabs>
  )
}

export default CodeRun;
