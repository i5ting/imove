const path = require('path');
const fs = require('fs-extra');
const simplifyDSL = require('./simplifyDSL');
const extractCodes = require('./extractCodes');
const {createServer} = require('../../utils/server');

const TPL_PATH = path.join(__dirname, './template');
const LOGIC_BASE_PATH = path.join(process.cwd(), './src/logic');

const setup = () => {
  const app = createServer();
  app.post('/api/save', async (req, res) => {
  
    // check dsl whether existed
    if (!req.body || !req.body.dsl) {
      res.status(500).json({isCompiled: false}).end();
      return;
    }
  
    // compile
    try {
      const {dsl} = req.body;
      await simplifyDSL(dsl, LOGIC_BASE_PATH);
      await extractCodes(dsl, LOGIC_BASE_PATH);
      await fs.copy(TPL_PATH, LOGIC_BASE_PATH);
      res.status(200).json({isCompiled: true}).end();
      console.log('compile successfully!');
    } catch(err) {
      res.status(500).json({isCompiled: false}).end();
      console.log('compile failed! the error is:', err.message);
    }
  });
}

module.exports = function() {
  fs.ensureDirSync(LOGIC_BASE_PATH);
  setup();
};
