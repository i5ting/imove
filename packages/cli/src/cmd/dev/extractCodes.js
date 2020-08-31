const path = require('path');
const fs = require('fs-extra');

const writeEntryFile = async (basePath, fileIds) => {
  const imports = [];
  const funcMaps = [];
  fileIds.forEach((id, idx) => {
    const funcName = `fn_${idx}`;
    imports.push(`import ${funcName} from './${id}';`);
    funcMaps.push(`'${id}': ${funcName}`);
  });
  const fileContent = [
    imports.join('\n'),
    `const nodeFns = {\n  ${funcMaps.join(',\n  ')}\n};`,
    `export default nodeFns;`
  ].join('\n');
  const entryFilePath = path.join(basePath, 'index.js');
  await fs.outputFile(entryFilePath, fileContent, {encoding: 'utf8', flag:'w'});
};

const writeNodeCodes = async (basePath, dsl) => {
  const fileIds = [];
  const {cells = []} = dsl;
  const nodes = cells.filter(cell => cell.shape !== 'edge');
  for(const {id, data: {code}} of nodes) {
    fileIds.push(id);
    const filePath = path.join(basePath, id + '.js');
    await fs.outputFile(filePath, code, {encoding: 'utf8', flag:'w'});
  }
  return fileIds;
};

const setup = async (dsl, logicBasePath) => {
  const nodeCodesPath = path.join(logicBasePath, 'nodeFns');
  await fs.remove(nodeCodesPath);
  const fileIds = await writeNodeCodes(nodeCodesPath, dsl);
  await writeEntryFile(nodeCodesPath, fileIds);
};

module.exports = setup;
