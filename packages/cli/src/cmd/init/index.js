const path = require('path');
const fs = require('fs-extra');
const Base = require('../base');

const CONFIG_TPL_PATH = path.join(__dirname, './template/imove.config.js.tpl');
const OUTPUT_FILE_PATH = path.join(process.cwd(), 'imove.config.js');

class Init extends Base {
  getProjectName() {
    const pkgPath = path.join(this.projectPath, 'package.json');
    const pkgJson = fs.readJSONSync(pkgPath);
    return pkgJson.name;
  }

  getOutputContent() {
    const tplContent = fs.readFileSync(CONFIG_TPL_PATH, 'utf-8');
    return tplContent.replace('{projectName}', `'${this.getProjectName()}'`);
  }

  run() {
    fs.outputFileSync(OUTPUT_FILE_PATH, this.getOutputContent());
    console.log(`Create ${OUTPUT_FILE_PATH} at successfully!`);
  }
}

module.exports = Init;
