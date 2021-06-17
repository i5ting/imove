import React from 'react';
import 'antd/es/modal/style';
import styles from './index.module.less';
import { Modal, Tabs } from 'antd';
const { TabPane } = Tabs;
interface IExportModalProps {
  visible: boolean;
  onClose: () => void;
}

const renderCode = (code: any) => {
  return <pre>{code}</pre>;
};

const QuickStart: React.FC = () => {
  return (
    <div>
      <h2>第一步：启动项目</h2>
      {renderCode(`$ git clone git@github.com:ykfe/imove.git\n
$ cd imove\n
$ npm install\n
$ npm run example`)}
      打开 <a href="http://localhost:8000/">http://localhost:8000/</a>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i1/O1CN01ZbXvzj1L0acWkakIY_!!6000000001237-2-tps-3570-2004.png"
      />
      <h2>第二步：绘制流程图、编写代码</h2>
      <p>根据你的业务逻辑绘制流程图。双击各节点，完成每个节点的函数编写。</p>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i3/O1CN01HxT0mY1MMP4TlvwMp_!!6000000001420-2-tps-2250-598.png"
      />
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i1/O1CN01OTlOHH26ehF6ke7nO_!!6000000007687-2-tps-3540-1978.png"
      />
      <h2>第三步：在项目中使用编排结果</h2>
      <p>这时有两种方式：</p>
      <ol>
        <li>直接导出压缩包，解压引入项目</li>
        <li>实时同步编排结果到本地项目</li>
      </ol>
      <h3>方法1. 直接导出压缩包，解压引入项目</h3>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i2/O1CN018aCSNB26WuVoXXaBQ_!!6000000007670-2-tps-3546-1996.png"
      />
      <p>
        点击页面右上方的导出按钮后，可以在弹窗内选择导出
        代码，此时流程图编译后的代码将以 zip
        包的形式下载到本地，你可以解压后再引入项目中使用。
      </p>
      <p>如引入的文件夹解压为以下格式：</p>
      {renderCode(`└── logic\n
\t├── context.js\n
\t├── dsl.json\n
\t├── index.js\n
\t├── logic.js\n
\t└── nodeFns\n
\t\t├── 02698b0f-3a1e-4dc0-ae67-83c9db1138ce.js\n
\t\t├── 3174c241-ef8d-4059-96a0-62332a625851.js\n
\t\t├── 53b1ee17-f180-41d7-a6cf-fca44d7228b5.js\n
\t\t└── index.js\n
`)}
      <p>这时，我们可以在自己的项目中使用了：</p>
      {renderCode(`import React, {useEffect} from 'react';\n
import logic from './logic';\n
const App = () => {\n
  useEffect(() => {\n
    logic.on('a', (data) => {}); // 事件监听——在节点代码中，通过ctx.emit('a')执行a事件\n
    logic.invoke('b'); // 执行一条流程——触发执行“开始节点”逻辑触发名称为b的那条流程\n
    return <div>xxx</div>\n
  };\n
export default App;
`)}
      <h3>方法2. 实时同步编排结果到本地项目</h3>
      <p>安装 CLI</p>
      <pre>$ npm install -g @imove/cli</pre>
      <p>进入项目根目录，imove 初始化</p>
      <pre>$ cd yourProject $ imove --init # 或 imove -i</pre>
      <p>本地启动开发模式</p>
      <pre>$ imove --dev # 或 imove -d</pre>
      <p>本地启动成功之后，可以看到原来的页面右上角会显示连接成功。</p>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i3/O1CN01mZpmD626XpIunS7G6_!!6000000007672-2-tps-3548-1974.png"
      />
      <p>
        此时页面上触发 <b>保存快捷键 Ctrl + S</b> 时，可以看到当前项目的 src
        目录下会多出一个 <strong>logic</strong> 目录，这就是 imove
        编译生成的代码，此时你只要在你的组件中调用它即可。调用方法与上述”直接导出压缩包引入项目“一致，这个方法的好处是能实时同步编排结果。
      </p>
      <b>如上代码所示，需要注意两点：</b>
      <ol>
        <li>
          通过 logic.on 方法监听事件，事件名和参数与流程图中节点代码的 ctx.emit
          相对应
        </li>
        <li>
          通过 logic.invoke 方法调用逻辑，事件名与流程图中的开始节点的
          逻辑触发名称 相对应，不然会调用失败
        </li>
      </ol>
    </div>
  );
};

const NodeType: React.FC = () => {
  return (
    <div>
      <h2>节点类型</h2>
      <p>在 iMove 中，我们将流程图的节点一共分为以下 3 种类型：</p>
      <ol>
        <li>
          开始节点：逻辑起始，是所有流程的开始，可以是一次生命周期初始化/一次点击
        </li>
        <li>行为节点：逻辑执行，可以是一次网络请求/一次改变状态/发送埋点等</li>
        <li>分支节点：逻辑路由，根据不同的逻辑执行结果跳转到不同的节点</li>
      </ol>
      <b>（注：一条逻辑流程必须以“开始节点”为起始）</b>
      <p>
        根据上述的规范描述，我们可以绘制出各种各样的逻辑流程图，例如
        “获取个人数据”的逻辑流程图如下所示：
      </p>
      <img
        width="100%"
        alt="节点类型"
        src="https://img.alicdn.com/imgextra/i4/O1CN01xTktqe20VBK1DEZdf_!!6000000006854-2-tps-3558-1868.png"
      ></img>
    </div>
  );
};

const ConfigNode: React.FC = () => {
  return (
    <div>
      <h2>节点信息配置</h2>
      <p>依次选中图中的节点，完成右边面板中的基础配置信息填写</p>
      <img
        width="100%"
        alt="配置节点"
        src="https://img.alicdn.com/imgextra/i2/O1CN013EeAH126IFq2nblPl_!!6000000007638-2-tps-3548-1980.png"
      ></img>
      <p>通常来说，基础信息配置使用频率最高的有：</p>
      <ul>
        <li>显示名称：更改节点名称</li>
        <li>代码：编辑节点代码</li>
        <li>
          逻辑触发名称：开始节点类型专属配置，项目代码使用时根据这个值触发逻辑调用
        </li>
      </ul>
    </div>
  );
};

const CodeStyle: React.FC = () => {
  return (
    <div>
      <h2>节点代码规范</h2>
      <p>双击节点，可打开代码编辑器</p>
      <img
        width="100%"
        alt="节点代码规范"
        src="https://img.alicdn.com/imgextra/i1/O1CN01OTlOHH26ehF6ke7nO_!!6000000007687-2-tps-3540-1978.png"
      ></img>
      <p>
        每个节点的代码等价于一个 js
        文件，因此你不用担心全局变量的命名污染问题，甚至可以 import 现有的 npm
        包，但最后必须 export 出一个函数。需要注意的是，由于 iMove
        天生支持节点代码的异步调用，因此 export 出的函数默认是一个 promise。
      </p>
      <p>
        就拿 <b>是否登录</b> 这个分支节点为例，我们来看下节点代码该如何编写：
      </p>
      <img
        width="100%"
        alt="是否登录节点"
        src="https://img.alicdn.com/imgextra/i1/O1CN01C3MeuT1PJbWfB6v5S_!!6000000001820-2-tps-3552-1976.png"
      ></img>
      <p>
        【注】由于该节点是<b>分支节点</b>，因此其 boolean
        返回值决定了整个流程的走向
      </p>
    </div>
  );
};

const NodeConnect: React.FC = () => {
  return (
    <div>
      <h2>节点间数据通信</h2>
      <p>
        在 iMove
        中，数据是以流（pipe）的形式从前往后进行流动的，也就是说前一个节点的返回值会是下一个节点的输入。不过也有一个例外，由于
        <b>分支节点</b>的返回值会是 boolean
        类型，因此它的下游节点拿到的输入必将是一个 boolean
        类型值，从而造成数据流的中断。为此，我们进行了一定的改造，分支节点的作用只负责数据流的转发，就像一个开关一样，只决定数据流的走向，但不改变流向下游的数据流值。
      </p>
      <p>
        因此，前文例子中的<b>请求profile接口</b>和<b>返回数据</b>
        两个节点会成为数据流的上下游关系。我们再来看下他们之间是如何进行数据通信的：
      </p>
      {renderCode(`// 节点: 请求profile接口\n
export default async function() {\n
  return fetch('/api/profile')\n
    .then(res => res.json())\n
    .then(res => {\n
      const {success, data} = res\n
      return {success, data}\n
    }).catch(err => {\n
      console.log('fetch /api/isLogin failed, the err is:', err)\n
      return {success: false}\n
    })\n
}\n
`)}
      {renderCode(`// 节点: 接口成功\n
export default async function(ctx) {\n
  // 获取上游数据\n
  const pipe = ctx.getPipe() || {}\n
  return pipe.success\n
}\n
`)}
      {renderCode(`// 节点: 返回数据\n
const doSomething = (data) => {\n
  // TODO: 数据加工处理\n
  return data\n
}\n
export default async function(ctx) {\n
  // 这里获取到的上游数据，不是"接口成功"这个分支节点的返回值，而是"请求profile接口"这个节点的返回值\n
  const pipe = ctx.getPipe() || {}\n
  ctx.emit('updateUI', {profileData: doSomething(pipe.data)})\n
}\n
`)}
      如上代码所述，每个下游节点可以调用 <b>ctx.getPipe</b>{' '}
      方法获取上游节点返回的数据流。另外，需要注意的是 <b>返回数据</b>{' '}
      节点的最后一行代码 <b>ctx.emit('eventName', data)</b>{' '}
      需要和你项目中的代码配合使用。
    </div>
  );
};

const Document: React.FC = () => {
  return (
    <div>
      <h2>参考文档</h2>
      <div>
        <a target="blank" href="https://www.yuque.com/imove/blog/quozn2">
          iMove 该如何使用？带你入门
        </a>
      </div>
      <div>
        <a target="blank" href="https://www.yuque.com/imove/blog/qxq2mw">
          登上 Github 趋势榜，iMove 原理技术大揭秘!
        </a>
      </div>
      <div>
        <a target="blank" href="https://www.yuque.com/imove/blog/ettxi8">
          iMove 基于 X6 + form-render 背后的思考
        </a>
      </div>
      <div>
        <a target="blank" href="https://www.yuque.com/imove/blog/vgp6bb">
          所见即所得! iMove 在线执行代码探索
        </a>
      </div>
      <div>
        <a target="blank" href="https://www.yuque.com/imove/blog/bee1ki">
          2021年前端趋势预测
        </a>
      </div>
      <div>
        <a target="blank" href="https://www.yuque.com/imove/blog/tcdrps">
          F2C能否让前端像运营配置一样开发？
        </a>
      </div>
      <div>
        <a target="blank" href="https://www.yuque.com/imove/blog/hl22uc">
          开源项目应该怎么做?
        </a>
      </div>
    </div>
  );
};

const GuideModal: React.FC<IExportModalProps> = (props) => {
  const { visible, onClose } = props;

  return (
    <Modal
      width={1000}
      visible={visible}
      footer={null}
      title={'帮助文档'}
      onOk={onClose}
      onCancel={onClose}
    >
      <div className={styles.guideContainer}>
        <Tabs tabPosition="left">
          <TabPane className={styles.tabPane} tab="快速开始" key="1">
            <QuickStart />
          </TabPane>
          <TabPane className={styles.tabPane} tab="节点类型" key="2">
            <NodeType />
          </TabPane>
          <TabPane className={styles.tabPane} tab="节点信息配置" key="3">
            <ConfigNode />
          </TabPane>
          <TabPane className={styles.tabPane} tab="节点代码规范" key="4">
            <CodeStyle />
          </TabPane>
          <TabPane className={styles.tabPane} tab="节点间数据通信" key="5">
            <NodeConnect />
          </TabPane>
          <TabPane className={styles.tabPane} tab="参考文档" key="6">
            <Document />
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default GuideModal;
