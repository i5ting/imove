import {Graph} from '@antv/x6';
import {safeGet} from '../utils';

interface Shortcut {
  keys: string | string[];
  handler: (flowChart: Graph) => void;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.5;
const ZOOM_STEP = 0.1;

const shortcuts: {[key: string]: Shortcut} = {
  save: {
    keys: `meta + s`,
    handler(flowChart: Graph) {
      // TODO: save data
      console.log(JSON.stringify(flowChart.toJSON(), null, 2));
      fetch('http://localhost:3456/api/save', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({dsl: flowChart.toJSON()})
      });
      return false;
    }
  },
  undo: {
    keys: `meta + z`,
    handler(flowChart: Graph) {
      flowChart.undo();
      return false;
    }
  },
  redo: {
    keys: `meta + shift + z`,
    handler(flowChart: Graph) {
      flowChart.redo();
      return false;
    }
  },
  zoomIn: {
    keys: `meta + shift + \+`,
    handler(flowChart: Graph) {
      const nextZoom = (flowChart.zoom() + ZOOM_STEP).toPrecision(2);
      flowChart.zoomTo(Number(nextZoom), {maxScale: MAX_ZOOM});
      return false;
    }
  },
  zoomOut: {
    keys: `meta + shift + \-`,
    handler(flowChart: Graph) {
      const nextZoom = (flowChart.zoom() - ZOOM_STEP).toPrecision(2);
      flowChart.zoomTo(Number(nextZoom), {minScale: MIN_ZOOM});
      return false;
    }
  },
  copy: {
    keys: 'meta + c',
    handler(flowChart: Graph) {
      const cells = flowChart.getSelectedCells();
      if (cells.length > 0) {
        flowChart.copy(cells);
      }
      return false;
    }
  },
  paste: {
    keys: 'meta + v',
    handler(flowChart: Graph) {
      if (!flowChart.isClipboardEmpty()) {
        const cells = flowChart.paste({offset: 32});
        flowChart.cleanSelection();
        flowChart.select(cells);
      }
      return false;
    }
  },
  delete: {
    keys: ['backspace', 'del'],
    handler(flowChart: Graph) {
      flowChart.removeCells(flowChart.getSelectedCells());
      flowChart.trigger('toolBar:forceUpdate');
      return false;
    }
  },
  selectAll: {
    keys: 'meta + a',
    handler(flowChart: Graph) {
      flowChart.select(flowChart.getCells());
      return false;
    }
  },
  bold: {
    keys: 'meta + b',
    handler(flowChart: Graph) {
      const cells = flowChart.getSelectedCells();
      if (cells.length > 0) {
        const isAlreadyBold = safeGet(cells, '0.attrs.label.fontWeight', 'normal') === 'bold';
        cells.forEach((cell) => {
          cell.setAttrs({label: {fontWeight: isAlreadyBold ? 'normal' : 'bold'}});
        });
        flowChart.trigger('toolBar:forceUpdate');
      }
      return false;
    }
  },
  italic: {
    keys: 'meta + i',
    handler(flowChart: Graph) {
      const cells = flowChart.getSelectedCells();
      if(cells.length > 0) {
        const isAlreadyItalic = safeGet(cells, '0.attrs.label.fontStyle', 'normal') === 'italic';
        cells.forEach((cell) => {
          cell.setAttrs({label: {fontStyle: isAlreadyItalic ? 'normal' : 'italic'}});
        });
        flowChart.trigger('toolBar:forceUpdate');
      }
      return false;
    }
  },
  underline: {
    keys: 'meta + u',
    handler(flowChart: Graph) {
      const cells = flowChart.getSelectedCells();
      if(cells.length > 0) {
        const isAlreadyUnderline = safeGet(cells, '0.attrs.label.textDecoration', 'none') === 'underline';
        cells.forEach((cell) => {
          cell.setAttrs({label: {textDecoration: isAlreadyUnderline ? 'none' : 'underline'}});
        });
        flowChart.trigger('toolBar:forceUpdate');
      }
      return false;
    }
  }
};

export default shortcuts;
