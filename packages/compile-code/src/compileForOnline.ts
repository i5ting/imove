import { Cell } from '@antv/x6';
import makeCode from './template/runOnline';
import simplifyDSL from './simplifyDSL';

interface DSL {
  cells: Cell.Properties[];
}

/**
 * Solution
 *
 * 1. find the source node form dsl, and if it is not imove-start,
 * then insert a vitural imove-start at first.
 *
 * 2. transform node funciton, follows should be noted:
 *    - import statement should be replaced with import('packge/from/network')
 *    - export statement should be replace with return function
 *    - each node function should be wrapped within a new function to avoid duplicate declaration global variable
 *
 * 3. assemble Logic, Context, simplyfied dsl and nodeFns map into one file
 *
 */

const INSERT_DSL_COMMENT = '// define dsl here';
const INSERT_NODE_FNS_COMMENT = '// define nodeFns here';
const importRegex =
  /import\s([\s\S]*?)\sfrom\s('|")((@\w[\w\.\-]+\/)?(\w[\w\.\-\/]+))\2/gm;
const virtualSourceNode = {
  id: 'virtual-imove-start',
  shape: 'imove-start',
  data: {
    trigger: 'virtual-imove-start',
    configData: {},
    code: 'export default async function(ctx) {\n  \n}',
  },
};

const findStartNode = (dsl: DSL): Cell.Properties => {
  const nodes = dsl.cells.filter((cell) => cell.shape !== 'edge');
  const edges = dsl.cells.filter((cell) => cell.shape === 'edge');

  if (nodes.length === 0) {
    throw new Error('Compile failed, no node is selected');
  }

  let foundEdge = null;
  let startNode = nodes[0];
  while (
    (foundEdge = edges.find((edge) => edge.target.cell === startNode.id))
  ) {
    const newSourceId = foundEdge.source.cell;
    startNode = nodes.find(
      (node) => node.id === newSourceId,
    ) as Cell.Properties;
  }

  if (startNode.shape !== 'imove-start') {
    dsl.cells.push(virtualSourceNode, {
      shape: 'edge',
      source: {
        cell: 'virtual-imove-start',
      },
      target: {
        cell: startNode.id,
      },
    });
    startNode = virtualSourceNode;
  }

  return startNode;
};

const getNextNode = (curNode: Cell.Properties, dsl: DSL) => {
  const nodes = dsl.cells.filter((cell) => cell.shape !== 'edge');
  const edges = dsl.cells.filter((cell) => cell.shape === 'edge');

  const foundEdge = edges.find((edge) => edge.source.cell === curNode.id);
  if (foundEdge) {
    return nodes.find((node) => node.id === foundEdge.target.cell);
  }
};

const compileSimplifiedDSL = (dsl: DSL): string => {
  const simplyfiedDSL = JSON.stringify(simplifyDSL(dsl), null, 2);
  return `const dsl = ${simplyfiedDSL};`;
};

const compileNodeFn = (node: Cell.Properties): string => {
  const {
    data: { label, code },
  } = node;
  const newCode = code
    .replace(
      importRegex,
      (match: string, p1: string, p2: string, p3: string) => {
        return `const ${p1} = (await import('https://jspm.dev/${p3}')).default;`;
      },
    )
    .replace(/export\s+default/, 'return');

  return `await (async function() {
    ${newCode}
  }())`;
};

const compileNodeFnsMap = (dsl: DSL): string => {
  const nodes = dsl.cells.filter((cell) => cell.shape !== 'edge');
  const kvs = nodes.map((node) => {
    const { id } = node;
    return `'${id}': ${compileNodeFn(node)}`;
  });

  return `const nodeFns = {\n  ${kvs.join(',\n  ')}\n}`;
};

const compile = (dsl: DSL, mockInput: any): string => {
  const startNode = findStartNode(dsl);
  const mockNode = getNextNode(startNode, dsl);
  return makeCode(mockNode, mockInput)
    .replace(INSERT_DSL_COMMENT, compileSimplifiedDSL(dsl))
    .replace(INSERT_NODE_FNS_COMMENT, compileNodeFnsMap(dsl))
    .replace('$TRIGGER$', startNode.data.trigger);
};

export default compile;
