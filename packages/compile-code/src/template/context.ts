export default `export default class Context {
  private curNode;
  private lastRet;
  private context;
  private payload;
  public emit;

  constructor(opts) {
    this._init(opts);
  }

  _init(opts = {}) {
    const { payload = {} } = opts as any;
    this.curNode = null;
    this.context = {};
    this.payload = Object.freeze({ ...payload });
  }

  _transitTo(node, lastRet) {
    this.curNode = node;
    this.lastRet = lastRet;
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
    Object.keys(data).forEach((key) => {
      this.context[key] = data[key];
    });
  }
}
`;
