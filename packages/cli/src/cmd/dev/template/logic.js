import nodeFns from './nodeFns';

class Context {

  constructor(opts) {
    this.curNode = null;
  }

  transitionToNode(node) {
    this.curNode = node;
  }

  getConfig() {

  }

}

const SHAPES = {
  START: 'imove-start',
  BRANCH: 'imove-branch',
  BEHAVIOR: 'imove-behavior'
}

class Logic {

  constructor(opts = {}) {
    this.ctx = null;
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

  _initCtx(data) {

  }

  _prepareCtx() {

  }

  async invoke(trigger, data) {
    let curNode = this._getStartNode(trigger);
    if(!curNode) {
      return Promise.reject(`Invoke failed, because no logic-start named ${trigger} found!`);
    }
    this._initCtx(data);
    while(curNode) {
      this._prepareCtx();
      const fn = nodeFns[curNode.id];
      const ret = await fn(this.ctx);
      curNode = this._getNextNode(curNode, ret);
    }
  }
}

module.exports = Logic;
