const path = require('path');
const fs = require('fs-extra');
const Base = require('../base');
const mergePkg = require('./mergePkg');
const simplifyDSL = require('./simplifyDSL');
const extractCodes = require('./extractCodes');
const {createServer} = require('../../utils/server');

const TPL_PATH = path.join(__dirname, './template');

class Dev extends Base {

  save = async (req, res) => {

    const {outputPath} = this.config;

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
      await mergePkg(dsl, this.projectPath);
      res.status(200).json({isCompiled: true}).end();
      console.log('compile successfully!');
    } catch(err) {
      res.status(500).json({isCompiled: false}).end();
      console.log('compile failed! the error is:', err.message);
    }
  }

  run() {
    const app = createServer();
    app.post('/api/save', this.save);
  }
}

module.exports = Dev;
