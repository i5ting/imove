import { safeGet } from '../utils';
import { localSave } from '../api';
import { Cell, Edge, Graph, Node } from '@antv/x6';
import { MIN_ZOOM, MAX_ZOOM, ZOOM_STEP } from './const';

interface Shortcut {
  keys: string | string[];
  handler: (flowChart: Graph) => void;
}

const shortcuts: { [key: string]: Shortcut } = {
  save: {
    keys: 'meta + s',
    handler(flowChart: Graph) {
      localSave({ dsl: flowChart.toJSON() });
      return false;
    },
  },
  undo: {
    keys: 'meta + z',
    handler(flowChart: Graph) {
      flowChart.undo();
      return false;
    },
  },
  redo: {
    keys: 'meta + shift + z',
    handler(flowChart: Graph) {
      flowChart.redo();
      return false;
    },
  },
  zoomIn: {
    keys: 'meta + shift + +',
    handler(flowChart: Graph) {
      const nextZoom = (flowChart.zoom() + ZOOM_STEP).toPrecision(2);
      flowChart.zoomTo(Number(nextZoom), { maxScale: MAX_ZOOM });
      return false;
    },
  },
  zoomOut: {
    keys: 'meta + shift + -',
    handler(flowChart: Graph) {
      const nextZoom = (flowChart.zoom() - ZOOM_STEP).toPrecision(2);
      flowChart.zoomTo(Number(nextZoom), { minScale: MIN_ZOOM });
      return false;
    },
  },
  copy: {
    keys: 'meta + c',
    handler(flowChart: Graph) {
      const cells = flowChart.getSelectedCells();
      if (cells.length > 0) {
        flowChart.copy(cells);
      }
      return false;
    },
  },
  paste: {
    keys: 'meta + v',
    handler(flowChart: Graph) {
      if (!flowChart.isClipboardEmpty()) {
        const cells = flowChart.paste({ offset: 32 });
        flowChart.cleanSelection();
        flowChart.select(cells);
      }
      return false;
    },
  },
  delete: {
    keys: ['backspace', 'del'],
    handler(flowChart: Graph) {
      const toDelCells = flowChart.getSelectedCells();
      const onEdgeDel = (edge: Edge) => {
        const srcNode = edge.getSourceNode() as Node;
        const isSrcNodeInDelCells = !!toDelCells.find((c) => c === srcNode);
        if (srcNode && srcNode.shape === 'imove-branch' && !isSrcNodeInDelCells) {
          const portId = edge.getSourcePortId();
          if (portId === 'right' || portId === 'bottom') {
            const edgeLabel = safeGet(edge.getLabelAt(0), 'attrs.label.text', '');
            srcNode.setPortProp(portId, 'attrs/text/text', edgeLabel);
          }
        }
      };
      toDelCells.forEach((cell: Cell) => {
        if (cell.isEdge()) {
          onEdgeDel(cell);
        } else {
          flowChart.getConnectedEdges(cell).forEach(onEdgeDel);
        }
      });
      flowChart.removeCells(flowChart.getSelectedCells());
      flowChart.trigger('toolBar:forceUpdate');
      return false;
    },
  },
  selectAll: {
    keys: 'meta + a',
    handler(flowChart: Graph) {
      flowChart.select(flowChart.getCells());
      return false;
    },
  },
  bold: {
    keys: 'meta + b',
    handler(flowChart: Graph) {
      const cells = flowChart.getSelectedCells();
      if (cells.length > 0) {
        const isAlreadyBold = safeGet(cells, '0.attrs.label.fontWeight', 'normal') === 'bold';
        cells.forEach((cell) => {
          cell.setAttrs({ label: { fontWeight: isAlreadyBold ? 'normal' : 'bold' } });
        });
        flowChart.trigger('toolBar:forceUpdate');
      }
      return false;
    },
  },
  italic: {
    keys: 'meta + i',
    handler(flowChart: Graph) {
      const cells = flowChart.getSelectedCells();
      if (cells.length > 0) {
        const isAlreadyItalic = safeGet(cells, '0.attrs.label.fontStyle', 'normal') === 'italic';
        cells.forEach((cell) => {
          cell.setAttrs({ label: { fontStyle: isAlreadyItalic ? 'normal' : 'italic' } });
        });
        flowChart.trigger('toolBar:forceUpdate');
      }
      return false;
    },
  },
  underline: {
    keys: 'meta + u',
    handler(flowChart: Graph) {
      const cells = flowChart.getSelectedCells();
      if (cells.length > 0) {
        const isAlreadyUnderline =
          safeGet(cells, '0.attrs.label.textDecoration', 'none') === 'underline';
        cells.forEach((cell) => {
          cell.setAttrs({ label: { textDecoration: isAlreadyUnderline ? 'none' : 'underline' } });
        });
        flowChart.trigger('toolBar:forceUpdate');
      }
      return false;
    },
  },
};

export default shortcuts;
