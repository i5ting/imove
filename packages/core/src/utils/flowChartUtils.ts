import { Cell, Graph } from '@antv/x6';

export const hasCellSelected = (flowChart: Graph): boolean => {
  return flowChart.getSelectedCellCount() > 0;
};

export const hasNodeSelected = (flowChart: Graph): boolean => {
  return flowChart.getSelectedCells().filter((cell: Cell) => cell.isNode()).length > 0;
};

export const hasEdgeSelected = (flowChart: Graph): boolean => {
  return flowChart.getSelectedCells().filter((cell: Cell) => cell.isEdge()).length > 0;
};

export const getSelectedNodes = (flowChart: Graph): Cell[] => {
  return flowChart.getSelectedCells().filter((cell: Cell) => cell.isNode());
};

export const getSelectedEdges = (flowChart: Graph): Cell[] => {
  return flowChart.getSelectedCells().filter((cell: Cell) => cell.isEdge());
};
