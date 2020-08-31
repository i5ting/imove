export default class Context {

  constructor() {
    this.curNode = null;
  }

  _reset(opts = {}) {
    const {payload = {}} = opts;
    this.context = Object.create(null);
    this.payload = Object.freeze({...payload});
  }

  _transitTo(node, lastRet) {
    this.curNode = node;
    this.lastRet = lastRet;
  }

  prepare(opts = {}) {
    this.payload = opts.payload;
    this.context = {};
  }

  getConfig() {
    return this.curNode.data.configData;
  }

  getPayload() {
    return this.payload;
  }

  getPipe() {
    return this.lastRet;
  }

  getContext() {
    return this.context;
  }

  setContext(data = {}) {
    Object.keys(data).forEach(key => {
      this.context[key] = data[key];
    });
  }
}
