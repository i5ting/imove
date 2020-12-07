const path = require('path');
const fs = require('fs-extra');

const extractObj = (obj = {}, keys = []) => {
  const ret = {};
  keys.forEach((key) => (ret[key] = obj[key]));
  return ret;
};

const simplify = (dsl) => {
  const { cells = [] } = dsl;
  return {
    cells: cells.map((cell) => {
      if (cell.shape === 'edge') {
        return extractObj(cell, ['id', 'shape', 'source', 'target']);
      } else {
        return extractObj(cell, ['id', 'shape', 'data']);
      }
    }),
  };
};

const setup = async (dsl, logicBasePath) => {
  const simpilifiedDSL = simplify(dsl);
  const dslFilePath = path.join(logicBasePath, 'dsl.json');
  await fs.writeFile(dslFilePath, JSON.stringify(simpilifiedDSL, null, 2));
};

module.exports = setup;
