import { Cell } from '@antv/x6';
import addPlugins from './addPlugins';
import simplifyDSL from './simplifyDSL';
import extractNodeFns from './extractNodeFns';
import logicTpl from './template/logic';
import indexTpl from './template/index';
import contextTpl from './template/context';

interface DSL {
  cells: Cell.Properties[];
}

interface IOutput {
  nodeFns: {
    [fileName: string]: string;
  };
  'context.ts': string;
  'dsl.json': string;
  'index.ts': string;
  'logic.ts': string;
}

const compile = (dsl: DSL, plugins = []): IOutput => {
  const output: IOutput = {
    nodeFns: extractNodeFns(dsl),
    'context.ts': contextTpl,
    'dsl.json': JSON.stringify(simplifyDSL(dsl), null, 2),
    'index.ts': addPlugins(indexTpl, plugins),
    'logic.ts': logicTpl,
  };
  return output;
};

export default compile;
