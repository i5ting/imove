const path = require('path');
const fs = require('fs');

const CONFIG_FILE_NAME = 'imove.config.js';
const CONFIG_FILE_PATH = path.join(process.cwd(), CONFIG_FILE_NAME);
const DEFAULT_CONFIG = {
  outputPath: path.join(process.cwd(), './src/logic/'),
};
const mergeConfig = (config, DEFAULT_CONFIG) => {
  // TODO: merge config
  return config;
};

const getConfig = () => {
  const isConfigFileExisted = fs.existsSync(CONFIG_FILE_PATH);
  if (isConfigFileExisted) {
    return mergeConfig(require(CONFIG_FILE_PATH), DEFAULT_CONFIG);
  } else {
    return DEFAULT_CONFIG;
  }
};

module.exports = getConfig;
