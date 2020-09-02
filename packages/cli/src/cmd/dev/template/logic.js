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

  _getStartNode(trigger) {
    for(const cell of this.startNodes) {
      if(cell.data.trigger === trigger) {
        return cell;
      }
    }
  }

  _getNextNode(ctx, curNode, lastRet) {
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
        const nextNodeId = edge.target.cell;
        return this.nodes.find(item => item.id === nextNodeId);
      }
    }
  }

  _createCtx() {
    const ctx = new Context();
    ctx.emit = this.emit.bind(this);
    return ctx;
  }

  async invoke(trigger, data) {
    let curNode = this._getStartNode(trigger);
    if(!curNode) {
      return Promise.reject(`Invoke failed! No logic-start named ${trigger} found!`);
    }
    let lastRet;
    const ctx = this._createCtx();
    ctx._reset({payload: data});
    while(curNode) {
      ctx._transitTo(curNode, lastRet);
      const fn = nodeFns[curNode.id];
      lastRet = await fn(ctx);
      curNode = this._getNextNode(ctx, curNode, lastRet);
    }
  }
}
