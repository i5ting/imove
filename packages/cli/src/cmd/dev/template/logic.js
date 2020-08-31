import nodeFns from './nodeFns';
import Context from './context';
import EventEmitter from 'eventemitter3';

const SHAPES = {
  START: 'imove-start',
  BRANCH: 'imove-branch',
  BEHAVIOR: 'imove-behavior'
}

export default class Logic {

  constructor(opts = {}) {
    this.dsl = opts.dsl;
    this.ctx = new Context();
    this.events = new EventEmitter();
    this.ctx.emit = this.events.emit.bind(this.events);
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

  _getNextNode(curNode, lastRet) {
    for(const edge of this.edges) {
      let isMatched = edge.source.cell === curNode.id;
      // NOTE: if it is a imove-branch node, each port's condition should be tested whether it is matched
      if(curNode.shape === SHAPES.BRANCH) {
        let matchedPort = '';
        const {ports} = curNode.data;
        for(const key in ports) {
          const {condition} = ports[key];
          const ret = new Function('ctx', 'return ' + condition)(this.ctx);
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

  _resetCtx(data) {
    this.ctx._reset({payload: data});
  }

  _prepareCtx(node, lastRet) {
    this.ctx._transitTo(node, lastRet);
  }

  async invoke(trigger, data) {
    let curNode = this._getStartNode(trigger);
    if(!curNode) {
      return Promise.reject(`Invoke failed! No logic-start named ${trigger} found!`);
    }
    let lastRet;
    this._resetCtx(data);
    while(curNode) {
      this._prepareCtx(curNode, lastRet);
      const fn = nodeFns[curNode.id];
      lastRet = await fn(this.ctx);
      curNode = this._getNextNode(curNode, lastRet);
    }
  }

  on(...args) {
    this.events.on(...args);
  }
}
