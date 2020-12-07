const path = require('path');
const fs = require('fs-extra');

const INSERT_IMPORT_PLUGINS_COMMENT = '// import plugins here';
const INSERT_USE_PLUGINS_COMMENT = '// use plugins here';

const setup = async (plugins = [], logicBasePath) => {
  const entryFilePath = path.join(logicBasePath, 'index.js');
  const codes = await fs.readFile(entryFilePath, 'utf8');
  const modifiedContent = codes
    .replace(new RegExp(INSERT_IMPORT_PLUGINS_COMMENT), () => {
      return plugins.map((plugin, index) => `import plugin${index} from '${plugin}';`).join('\n');
    })
    .replace(new RegExp(INSERT_USE_PLUGINS_COMMENT), () => {
      return plugins.map((_, index) => `logic.use(plugin${index});`).join('\n');
    });
  await fs.outputFile(entryFilePath, modifiedContent);
};

module.exports = setup;
