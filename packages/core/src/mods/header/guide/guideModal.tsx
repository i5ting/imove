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
      <h2>启动项目</h2>
      {renderCode(`$ git clone git@github.com:imgcook/imove.git\n
$ cd imove\n
$ npm install\n
$ npm run example`)}
      打开 <a href="http://localhost:8000/">http://localhost:8000/</a>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i2/O1CN01h8YOPl2AAhk6yQz6P_!!6000000008163-2-tps-3570-1986.png"
      />
      <h2>绘制流程图、编写代码</h2>
      <p>根据你的业务逻辑绘制流程图。双击各节点，完成每个节点的函数编写。</p>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i3/O1CN01HxT0mY1MMP4TlvwMp_!!6000000001420-2-tps-2250-598.png"
      />
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i3/O1CN01e2bC7824KsqtVLLJe_!!6000000007373-2-tps-3550-1750.png"
      />
      <h2>在项目中使用</h2>
      <p>这时有两种方式：</p>
      <ol>
        <li>在线打包出码</li>
        <li>本地启动开发模式</li>
      </ol>
      <h3>1. 在线打包出码</h3>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i4/O1CN01ysTe3s1UjJoSBs6PE_!!6000000002553-2-tps-3260-1800.png"
      />
      <p>
        点击页面右上方的导出按钮后，可以在弹窗内选择导出
        代码，此时流程图编译后的代码将以 zip
        包的形式下载到本地，你可以解压后再引入项目中使用。
      </p>
      <h3>2. 本地命令行出码</h3>
      <p>安装 CLI</p>
      <pre>$ npm install -g @imove/cli</pre>
      <p>进入项目根目录，imove 初始化</p>
      <pre>$ cd yourProject $ imove --init # 或 imove -i</pre>
      <p>本地启动开发模式</p>
      <pre>$ imove --dev # 或 imove -d</pre>
      <p>本地启动成功之后，可以看到原来的页面右上角会显示连接成功。</p>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i4/O1CN01lKVzHY1J7LCMgTrwC_!!6000000000981-2-tps-3148-1750.png"
      />
      <p>
        此时页面上触发 <b>保存快捷键 Ctrl + S</b> 时，可以看到当前项目的 src
        目录下会多出一个 <strong>logic</strong> 目录，这就是 imove
        编译生成的代码，此时你只要在你的组件中调用它即可。
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

const CreateNode: React.FC = () => {
  return (
    <div>
      <h2>创建节点</h2>
      <p>
        项目启动成功后，可以从左侧面板中依次拖动节点至中间的画布，从而完成流程图的绘制工作
      </p>
      <img
        width="100%"
        alt="创建节点"
        src="https://img.alicdn.com/imgextra/i2/O1CN01TMgmco1mbgIBQLLQy_!!6000000004973-2-tps-3268-1834.png"
      ></img>
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
      <b>（注：一条逻辑流程必须以 开始节点 为起始）</b>
      <p>
        根据上述的规范描述，我们可以绘制出各种各样的逻辑流程图，例如
        <b>获取个人数据</b>的逻辑流程图如下所示：
      </p>
      <img
        width="100%"
        alt="节点类型"
        src="https://img.alicdn.com/imgextra/i3/O1CN01hPtj531F1bmJDXpfy_!!6000000000427-2-tps-3266-1820.png"
      ></img>
    </div>
  );
};

const ConfigNode: React.FC = () => {
  return (
    <div>
      <h2>配置节点</h2>
      <p>依次选中图中的节点，完成右边面板中的基础配置信息填写</p>
      <img
        width="100%"
        alt="配置节点"
        src="https://img.alicdn.com/imgextra/i2/O1CN01SQPxKi29ufsfQCtmY_!!6000000008128-2-tps-3266-1832.png"
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
      <p>点击编辑按钮，可打开代码编辑器</p>
      <img
        width="100%"
        alt="节点代码规范"
        src="https://img.alicdn.com/imgextra/i4/O1CN01tJ0gmo1oxKF3eOLkH_!!6000000005291-2-tps-3268-1826.png"
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
      {renderCode(`export default async function() {\n
    return fetch('/api/isLogin')\n
    .then(res => res.json())\n
    .then(res => {\n
      const {success, data: {isLogin} = {}} = res\n
      return success && isLogin\n
    }).catch(err => {\n
      console.log('fetch /api/isLogin failed, the err is:', err)\n
      return false\n
    })\n
}\n
`)}
      <p>
        注：由于该节点是<b>分支节点</b>，因此其 boolean
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

const HowToUse: React.FC = () => {
  return (
    <div>
      <h2>如何在项目中使用</h2>
      <p>这时有两种方式：</p>
      <ol>
        <li>在线打包出码</li>
        <li>本地启动开发模式</li>
      </ol>

      <h3>1. 在线打包出码</h3>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i3/O1CN01r14VoI1eH3X0RiR2M_!!6000000003845-2-tps-3260-1800.png"
      />
      <p>
        点击页面右上方的导出按钮后，可以在弹窗内选择导出
        代码，此时流程图编译后的代码将以 zip
        包的形式下载到本地，你可以解压后再引入项目中使用。
      </p>

      <h3>2. 本地命令行出码</h3>
      <p>安装 CLI</p>
      <pre>$ npm install -g @imove/cli</pre>
      <p>进入项目根目录，imove 初始化</p>
      <pre>$ cd yourProject $ imove --init # 或 imove -i</pre>
      <p>本地启动开发模式</p>
      <pre>$ imove --dev # 或 imove -d</pre>

      <p>本地启动成功之后，可以看到原来的页面右上角会显示连接成功。</p>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i4/O1CN01NVwf2k248W9lahjm3_!!6000000007346-2-tps-3148-1750.png"
      />

      <p>
        此时页面上触发 <b>保存快捷键 Ctrl + S</b> 时，可以看到当前项目的 src
        目录下会多出一个 <strong>logic</strong> 目录，这就是 imove
        编译生成的代码，此时你只要在你的组件中调用它即可。
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

const Document: React.FC = () => {
  return (
    <div>
      <h2>文档汇总</h2>
      <div>
        <a target="blank" href="https://www.yuque.com/imove/docs">
          详细使用文档
        </a>
      </div>
      <div>
        <a
          target="blank"
          href="https://github.com/imgcook/imove/blob/master/README.md"
        >
          github README.md
        </a>
      </div>
      <div>
        <a
          target="blank"
          href="https://www.yuque.com/imove/blog/bee1ki"
        >
          2021年前端趋势预测
        </a>
      </div>
      <div>
        <a
          target="blank"
          href="https://www.yuque.com/imove/blog/tcdrps"
        >
          F2C能否让前端像运营配置一样开发？
        </a>
      </div>
      <div>
        <a
          target="blank"
          href="https://www.yuque.com/imove/blog/qxq2mw"
        >
          登上 Github 趋势榜，iMove 原理技术大揭秘!
        </a>
      </div>
      <div>
        <a
          target="blank"
          href="https://www.yuque.com/imove/blog/ettxi8"
        >
          iMove 基于 X6 + form-render 背后的思考
        </a>
      </div>
      <div>
        <a
          target="blank"
          href="https://www.yuque.com/imove/blog/vgp6bb"
        >
          所见即所得! iMove 在线执行代码探索
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
          <TabPane className={styles.tabPane} tab="简单上手" key="1">
            <QuickStart />
          </TabPane>
          <TabPane className={styles.tabPane} tab="创建节点" key="2">
            <CreateNode />
          </TabPane>
          <TabPane className={styles.tabPane} tab="节点类型" key="3">
            <NodeType />
          </TabPane>
          <TabPane className={styles.tabPane} tab="配置节点" key="4">
            <ConfigNode />
          </TabPane>
          <TabPane className={styles.tabPane} tab="节点代码规范" key="5">
            <CodeStyle />
          </TabPane>
          <TabPane className={styles.tabPane} tab="节点间数据通信" key="6">
            <NodeConnect />
          </TabPane>
          <TabPane className={styles.tabPane} tab="如何在项目中使用" key="7">
            <HowToUse />
          </TabPane>
          <TabPane className={styles.tabPane} tab="文档汇总" key="8">
            <Document />
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default GuideModal;
