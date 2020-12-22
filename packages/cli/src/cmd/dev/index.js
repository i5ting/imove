const path = require('path');
const fs = require('fs-extra');
const Base = require('../base');
const mergePkg = require('./mergePkg');
const compileCode = require('@imove/compile-code');
const { createServer } = require('../../utils/server');

const noop = () => {};
const CACHE_PATH = path.join(process.cwd(), './.cache');
const CACHE_DSL_FILE = path.join(CACHE_PATH, 'imove.dsl.json');

class Dev extends Base {

  async writeOutputIntoFiles(curPath, output) {
    for(let key in output) {
      const newPath = path.join(curPath, key);
      if(path.extname(newPath)) {
        await fs.writeFile(newPath, output[key]);
      } else {
        await fs.ensureDir(newPath);
        await this.writeOutputIntoFiles(newPath, output[key]);
      }
    }
  }

  async save(req, res) {
    const { outputPath, plugins = [] } = this.config;

    // check outputPath whether exsited
    await fs.ensureDir(outputPath);

    // check dsl whether existed
    if (!req.body || !req.body.dsl) {
      res.status(500).json({ isCompiled: false }).end();
      return;
    }

    // compile
    try {
      const { dsl } = req.body;
      const output = compileCode(dsl, plugins);
      await this.writeOutputIntoFiles(outputPath, output);
      await mergePkg(dsl, this.projectPath);
      await fs.outputFile(CACHE_DSL_FILE, JSON.stringify(dsl, null, 2));
      res.status(200).json({ isCompiled: true }).end();
      console.log('compile successfully!');
    } catch (err) {
      res.status(500).json({ isCompiled: false }).end();
      console.log('compile failed! the error is:', err);
    }
  }

  async connect(req, res) {
    const { projectName } = this.config;
    const dsl = await fs.readJson(CACHE_DSL_FILE).catch(noop);
    res.status(200).json({ projectName, dsl }).end();
  }

  run() {
    const app = createServer();
    app.post('/api/save', this.save.bind(this));
    app.get('/api/connect', this.connect.bind(this));
  }
}

module.exports = Dev;
