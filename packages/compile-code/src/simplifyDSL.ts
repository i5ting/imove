import { Cell } from '@antv/x6';

interface DSL {
  cells: Cell.Properties[];
}

const extractObj = (
  obj: Cell.Properties = {},
  keys: string[] = [],
): Cell.Properties => {
  const ret: Cell.Properties = {};
  keys.forEach((key) => {
    if (obj[key]) {
      ret[key] = obj[key];
    }
  });
  return ret;
};

const simplifyDSL = (dsl: DSL): Cell.Properties => {
  const { cells = [] } = dsl;
  return {
    cells: cells.map((cell) => {
      if (cell.shape === 'edge') {
        return extractObj(cell, ['id', 'shape', 'source', 'target']);
      } else {
        const newCell = extractObj(cell, ['id', 'shape', 'data']);
        newCell.data = extractObj(cell.data, [
          'trigger',
          'configData',
          'ports',
        ]);
        newCell.data.serviceId = cell.data.serviceId || '';
        newCell.data.funcName = cell.data.funcName || '';
        newCell.data.provider = cell.data.provider || '';
        newCell.data.providerType = cell.data.providerType || '';
        return newCell;
      }
    }),
  };
};

export default simplifyDSL;
