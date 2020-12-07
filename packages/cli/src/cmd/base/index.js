class Base {
  constructor({ config }) {
    this._config = config;
    return this;
  }

  get config() {
    return this._config;
  }

  get projectPath() {
    return process.cwd();
  }
}

module.exports = Base;
