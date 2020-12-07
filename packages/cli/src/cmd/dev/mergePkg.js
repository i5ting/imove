const path = require('path');
const fs = require('fs-extra');

const builtinDependencies = {
  eventemitter3: '^4.0.7',
};

const extractDep = (dsl) => {
  const mergedDependencies = {};
  const { cells = [] } = dsl;
  cells
    .filter((cell) => cell.shape !== 'edge')
    .forEach((cell) => {
      const { dependencies } = cell.data || {};
      try {
        const json = JSON.parse(dependencies);
        Object.keys(json).forEach((key) => (mergedDependencies[key] = json[key]));
      } catch (error) {
        console.log('extract dependencies failed, the error is:', error.message);
      }
    });
  return mergedDependencies;
};

const setup = async (dsl, projectRootPath) => {
  const pkgPath = path.join(projectRootPath, './package.json');
  const pkgFile = await fs.readFile(pkgPath);
  const pkgJson = JSON.parse(pkgFile);
  const dslDependencies = extractDep(dsl);
  if (!pkgJson.dependencies) {
    pkgJson.dependencies = dslDependencies;
  } else {
    Object.keys(dslDependencies).forEach((key) => {
      pkgJson.dependencies[key] = dslDependencies[key];
    });
    Object.keys(builtinDependencies).forEach((key) => {
      pkgJson.dependencies[key] = builtinDependencies[key];
    });
  }
  await fs.writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));
};

module.exports = setup;
