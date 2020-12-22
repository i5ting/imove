import {Cell} from '@antv/x6';

interface DSL {
  cells: Cell.Properties[];
}

interface INodesFns {
  [fileName: string]: string;
}

const genEntryFile = (nodeIds: string[]): string => {
  const imports: string[] = [];
  const funcMaps: string[] = [];
  nodeIds.forEach((id, idx) => {
    const funcName = `fn_${idx}`;
    imports.push(`import ${funcName} from './${id}';`);
    funcMaps.push(`'${id}': ${funcName}`);
  });
  const fileContent: string = [
    imports.join('\n'),
    `const nodeFns = {\n  ${funcMaps.join(',\n  ')}\n};`,
    'export default nodeFns;',
  ].join('\n');
  return fileContent;
};

const genNodeFns = (dsl: DSL): INodesFns => {
  const nodeFns: INodesFns = {};
  const { cells = [] } = dsl;
  const nodes = cells.filter((cell) => cell.shape !== 'edge');
  for (const {
    id,
    shape,
    data: { label, code },
  } of nodes) {
    const fileName: string = id + '.js';
    const descData: string = `// ${shape}: ${label}\n`;
    const saveData: string = `${descData}\n${code}`;
    nodeFns[fileName] = saveData;
  }
  return nodeFns;
};

const extract = (dsl: DSL): INodesFns => {
  const nodeFns = genNodeFns(dsl);
  const nodeIds = Object.keys(nodeFns).map(fileName => fileName.slice(0, -3));
  const entryFileContent = genEntryFile(nodeIds);
  nodeFns['index.js'] = entryFileContent;
  return nodeFns;
};

export default extract;
