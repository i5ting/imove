export default `import nodeFns from './nodeFns';
import Context from './context';
import EventEmitter from 'eventemitter3';

const LIFECYCLE = new Set(['ctxCreated']);
const SHAPES = {
  START: 'imove-start',
  BRANCH: 'imove-branch',
  BEHAVIOR: 'imove-behavior',
};

export default class Logic extends EventEmitter {
  constructor(opts = {}) {
    super();
    this.dsl = opts.dsl;
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
    for (const edge of this.edges) {
      let isMatched = edge.source.cell === curNode.id;
      // NOTE: if it is a imove-branch node, each port's condition should be tested whether it is matched
      if (curNode.shape === SHAPES.BRANCH) {
        let matchedPort = '';
        const { ports } = curNode.data;
        for (const key in ports) {
          const { condition } = ports[key];
          const ret = new Function('ctx', 'return ' + condition)(ctx);
          if (ret === Boolean(curRet)) {
            matchedPort = key;
            break;
          }
        }
        isMatched = isMatched && edge.source.port === matchedPort;
      }
      if (isMatched) {
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

  async _execNode(ctx, curNode, lastRet) {
    ctx._transitTo(curNode, lastRet);
    const fn = nodeFns[curNode.id];
    const curRet = await fn(ctx);
    if (curNode.shape !== SHAPES.BRANCH) {
      lastRet = curRet;
    }
    const nextNodes = this._getNextNodes(ctx, curNode, curRet);
    if (nextNodes.length > 0) {
      nextNodes.forEach(async (node) => {
        await this._execNode(ctx, node, lastRet);
      });
    }
  }

  async invoke(trigger, data) {
    const curNode = this._getStartNode(trigger);
    if (!curNode) {
      return Promise.reject(new Error(\`Invoke failed! No logic-start named \${trigger} found!\`));
    }
    const ctx = this._createCtx({ payload: data });
    await this._execNode(ctx, curNode);
  }
}
`;
