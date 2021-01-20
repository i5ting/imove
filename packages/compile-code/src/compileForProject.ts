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
  'context.js': string;
  'dsl.json': string;
  'index.js': string;
  'logic.js': string;
}

const compile = (dsl: DSL, plugins = []): IOutput => {
  const output: IOutput = {
    nodeFns: extractNodeFns(dsl),
    'context.js': contextTpl,
    'dsl.json': JSON.stringify(simplifyDSL(dsl), null, 2),
    'index.js': addPlugins(indexTpl, plugins),
    'logic.js': logicTpl,
  };
  return output;
};

export default compile;
