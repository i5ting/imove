import nodeFns from './nodeFns';
import Context from './context';
import EventEmitter from 'eventemitter3';

const SHAPES = {
  START: 'imove-start',
  BRANCH: 'imove-branch',
  BEHAVIOR: 'imove-behavior'
}

export default class Logic extends EventEmitter{

  constructor(opts = {}) {
    super();
    this.dsl = opts.dsl;
  }

  get cells() {
    return this.dsl.cells;
  }

  get nodes() {
    return this.cells.filter(cell => cell.shape !== 'edge');
  }

  get startNodes() {
    return this.cells.filter(cell => cell.shape === SHAPES.START);
  }

  get edges() {
    return this.cells.filter(cell => cell.shape === 'edge');
  }

  _createCtx() {
    const ctx = new Context();
    ctx.emit = this.emit.bind(this);
    return ctx;
  }

  _getStartNode(trigger) {
    for(const cell of this.startNodes) {
      if(cell.data.trigger === trigger) {
        return cell;
      }
    }
  }

  _getNextNodes(ctx, curNode, lastRet) {
    const nodes = [];
    for(const edge of this.edges) {
      let isMatched = edge.source.cell === curNode.id;
      // NOTE: if it is a imove-branch node, each port's condition should be tested whether it is matched
      if(curNode.shape === SHAPES.BRANCH) {
        let matchedPort = '';
        const {ports} = curNode.data;
        for(const key in ports) {
          const {condition} = ports[key];
          const ret = new Function('ctx', 'return ' + condition)(ctx);
          if(ret === lastRet) {
            matchedPort = key;
            break;
          }
        }
        isMatched = isMatched && edge.source.port === matchedPort;
      }
      if(isMatched) {
        // NOTE: not each edge both has source and target
        const nextNode = this.nodes.find(item => item.id === edge.target.cell);
        nextNode && nodes.push(nextNode);
      }
    }
    return nodes;
  }

  async _execNode(ctx, curNode, lastRet) {
    ctx._transitTo(curNode, lastRet);
    const fn = nodeFns[curNode.id];
    lastRet = await fn(ctx);
    const nextNodes = this._getNextNodes(ctx, curNode, lastRet);
    if(nextNodes.length > 0) {
      nextNodes.forEach(async node => {
        await this._execNode(ctx, node, lastRet);
      });
    }
  }

  async invoke(trigger, data) {
    let curNode = this._getStartNode(trigger);
    if(!curNode) {
      return Promise.reject(`Invoke failed! No logic-start named ${trigger} found!`);
    }
    const ctx = this._createCtx();
    ctx._reset({payload: data});
    await this._execNode(ctx, curNode);
  }
}
