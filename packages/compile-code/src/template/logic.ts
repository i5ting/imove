export default `import nodeFns from './nodeFns';
import Context from './context';
const EventEmitter = require('events');

const LIFECYCLE = new Set(['ctxCreated', 'enterNode', 'leaveNode']);
const SHAPES = {
  START: 'imove-start',
  BRANCH: 'imove-branch',
  BEHAVIOR: 'imove-behavior',
};

export default class Logic extends EventEmitter {
  private dsl;
  private lifeCycleEvents;
  private _unsafeCtx;

  constructor(opts = {}) {
    super();
    this.dsl = (opts as any).dsl;
    this.lifeCycleEvents = {};
  }

  get cells() {
    return this.dsl.cells;
  }

  get nodes() {
    return this.cells.filter((cell) => cell.shape !== 'edge');
  }

  get startNodes() {
    return this.cells.filter((cell) => cell.shape === SHAPES.START);
  }

  get edges() {
    return this.cells.filter((cell) => cell.shape === 'edge');
  }

  _getUnsafeCtx() {
    // NOTE: don't use in prod
    return this._unsafeCtx;
  }

  _runLifecycleEvent(eventName, ctx) {
    if (!LIFECYCLE.has(eventName)) {
      return console.warn(\`Lifecycle \${eventName} is not supported!\`);
    }
    if (this.lifeCycleEvents[eventName]) {
      this.lifeCycleEvents[eventName].forEach((fn) => fn(ctx));
    }
  }

  _createCtx(opts) {
    const ctx = new Context(opts);
    ctx.emit = this.emit.bind(this);
    this._runLifecycleEvent('ctxCreated', ctx);
    return ctx;
  }

  _getStartNode(trigger) {
    for (const cell of this.startNodes) {
      if (cell.data.trigger === trigger) {
        return cell;
      }
    }
  }

  _getNextNodes(ctx, curNode, curRet) {
    const nodes = [];

    // NOTE: if it is a imove-branch node, find out which port match the curRet condition
    const isCurNodeShapeBranch = curNode.shape === SHAPES.BRANCH;
    let curNodeMatchedPort = '';
    if (isCurNodeShapeBranch) {
      const { ports } = curNode.data;
      for (const key in ports) {
        const { condition } = ports[key];
        // eslint-disable-next-line no-new-func
        const ret = new Function('ctx', 'return ' + condition)(ctx);
        if (ret === Boolean(curRet)) {
          curNodeMatchedPort = key;
          break; // for (const key in ports)
        }
      }
    }

    // NOTE: find out next node via edges which source is curNode
    for (const edge of this.edges) {
      // edge's source is curNode
      const isMatchedSource = edge.source.cell === curNode.id;
      // if it is a imove-branch node, edge.source.port match curRet condition
      const isMatchedPort = !isCurNodeShapeBranch || edge.source.port === curNodeMatchedPort;
      if (isMatchedSource && isMatchedPort) {
        // NOTE: not each edge both has source and target
        const nextNode = this.nodes.find((item) => item.id === edge.target.cell);
        nextNode && nodes.push(nextNode);
      }
    }
    return nodes;
  }

  use(pluginCreator) {
    if (typeof pluginCreator !== 'function') {
      console.error('imove plugin must be a function.');
      return;
    }
    const plugin = pluginCreator(this);
    if (typeof plugin !== 'object' || plugin === null) {
      console.error('imove plugin must return an object.');
      return;
    }
    for (const eventName in plugin) {
      if (!Object.prototype.hasOwnProperty.call(plugin, eventName)) {
        continue;
      }
      if (!LIFECYCLE.has(eventName)) {
        console.warn(\`Lifecycle \${eventName} is not supported in imove.\`);
        continue;
      }
      if (!this.lifeCycleEvents[eventName]) {
        this.lifeCycleEvents[eventName] = [];
      }
      this.lifeCycleEvents[eventName].push(plugin[eventName]);
    }
  }

  async _execNode(ctx, curNode, lastRet, callback) {
    ctx._transitTo(curNode, lastRet);
    const fn = nodeFns[curNode.id];
    this._runLifecycleEvent('enterNode', ctx);
    const curRet = await fn(ctx);
    this._runLifecycleEvent('leaveNode', ctx);
    if (curNode.shape !== SHAPES.BRANCH) {
      lastRet = curRet;
    }
    const nextNodes = this._getNextNodes(ctx, curNode, curRet);
    if (nextNodes.length > 0) {
      nextNodes.forEach(async (node) => {
        await this._execNode(ctx, node, lastRet, callback);
      });
    } else {
      callback && callback(lastRet);
    }
  }

  async invoke(trigger, data, callback) {
    const curNode = this._getStartNode(trigger);
    if (!curNode) {
      return Promise.reject(new Error(\`Invoke failed! No logic-start named \${trigger} found!\`));
    }
    this._unsafeCtx = this._createCtx({
      payload: data,
      serviceId: curNode.data.serviceId || '',
      funcName: curNode.data.funcName || '',
      provider: curNode.data.provider || '',
      providerType: curNode.data.providerType || '',
    });
    await this._execNode(this._unsafeCtx, curNode, undefined, callback);
  }
}
`;
