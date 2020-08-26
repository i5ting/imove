import {Graph} from '@antv/x6';
import shortcuts from '../common/shortcuts';
import baseCellSchemaMap from '../common/baseCell';
import previewCellSchemaMap from '../common/previewCell';

// X6 register base/preview cell shape
[baseCellSchemaMap, previewCellSchemaMap]
  .forEach(schemas => Object.values(schemas).forEach(schema => {
    const {base, ...rest} = schema;
    base.define(rest);
  }));

const createGraph = (container: HTMLDivElement, miniMapContainer: HTMLDivElement): Graph => {

  // create graph instance
  const graph = new Graph({
    container,
    rotating: false,
    resizing: true,
    clipboard: true,
    // https://x6.antv.vision/zh/docs/tutorial/intermediate/connector
    connecting: {
      snap: true,
      dangling: true,
      highlight: true,
      router: {
        name: 'manhattan'
      },
      validateConnection({sourceView, targetView}) {
        return sourceView !== targetView;
      }
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/background
    background: {
      color: '#f8f9fa'
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/grid
    grid: {
      visible: true
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/selection
    selecting: {
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/snapline
    snapline: {
      enabled: true,
      clean: 100
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/keyboard
    keyboard: {
      enabled: true,
      global: false
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/history
    history: {
      enabled: true
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/minimap
    minimap: {
      enabled: true,
      padding: 0,
      width: 200,
      height: 160,
      minScale: 0.5,
      maxScale: 1.5,
      container: miniMapContainer,
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/scroller
    scroller: {
      enabled: true
    }
  });

  // register shortcuts
  Object.values(shortcuts).forEach(shortcut => {
    const {keys, handler} = shortcut;
    graph.bindKey(keys, () => handler(graph));
  });

  return graph;
}

export default createGraph;
