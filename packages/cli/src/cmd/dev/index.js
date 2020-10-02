const path = require('path');
const fs = require('fs-extra');
const Base = require('../base');
const mergePkg = require('./mergePkg');
const addPlugins = require('./addPlugins');
const simplifyDSL = require('./simplifyDSL');
const extractCodes = require('./extractCodes');
const {createServer} = require('../../utils/server');

const noop = () => {};
const TPL_PATH = path.join(__dirname, './template');
const CACHE_PATH = path.join(process.cwd(), './.cache');
const CACHE_DSL_FILE = path.join(CACHE_PATH, 'imove.dsl.json');

class Dev extends Base {

  save = async (req, res) => {

    const {outputPath, plugins = []} = this.config;

    // check outputPath whether exsited
    await fs.ensureDir(outputPath);

    // check dsl whether existed
    if (!req.body || !req.body.dsl) {
      res.status(500).json({isCompiled: false}).end();
      return;
    }

    // compile
    try {
      const {dsl} = req.body;
      await simplifyDSL(dsl, outputPath);
      await extractCodes(dsl, outputPath);
      await fs.copy(TPL_PATH, outputPath);
      await addPlugins(plugins, outputPath);
      await mergePkg(dsl, this.projectPath);
      await fs.outputFile(CACHE_DSL_FILE, JSON.stringify(dsl, null, 2));
      res.status(200).json({isCompiled: true}).end();
      console.log('compile successfully!');
    } catch(err) {
      res.status(500).json({isCompiled: false}).end();
      console.log('compile failed! the error is:', err);
    }
  }

  connect = async (req, res) => {
    const {projectName} = this.config;
    const dsl = await fs.readJson(CACHE_DSL_FILE).catch(noop);
    res.status(200).json({projectName, dsl}).end();
  }

  run() {
    const app = createServer();
    app.post('/api/save', this.save);
    app.get('/api/connect', this.connect);
  }
}

module.exports = Dev;
