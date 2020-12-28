import shortcuts from '../../common/shortcuts';
import { Cell, Edge, Graph, Node } from '@antv/x6';
import { MIN_ZOOM, MAX_ZOOM } from '../../common/const';
import baseCellSchemaMap from '../../common/baseCell';
import previewCellSchemaMap from '../../common/previewCell';
import { getSelectedEdges } from '../../utils/flowChartUtils';
import { registerServerStorage } from './registerServerStorage';
import MiniMapSimpleNode from '../../components/miniMapSimpleNode';

// X6 register base/preview cell shape
[baseCellSchemaMap, previewCellSchemaMap].forEach((schemas) =>
  Object.values(schemas).forEach((schema) => {
    const { base, ...rest } = schema;
    base.define(rest);
  })
);

const registerEvents = (flowChart: Graph): void => {
  flowChart.on('node:added', (args) => {
    flowChart.cleanSelection();
    flowChart.select(args.cell);
  });
  flowChart.on('selection:changed', () => {
    flowChart.trigger('toolBar:forceUpdate');
    flowChart.trigger('settingBar:forceUpdate');
  });
  flowChart.on('edge:connected', (args) => {
    const edge = args.edge as Edge;
    const sourceNode = edge.getSourceNode() as Node;
    if (sourceNode && sourceNode.shape === 'imove-branch') {
      const portId = edge.getSourcePortId();
      if (portId === 'right' || portId === 'bottom') {
        edge.setLabelAt(0, sourceNode.getPortProp(portId, 'attrs/text/text'));
        sourceNode.setPortProp(portId, 'attrs/text/text', '');
      }
    }
  });
  flowChart.on('edge:selected', (args) => {
    args.edge.attr('line/stroke', '#feb663');
    args.edge.attr('line/strokeWidth', '3px');
  });
  flowChart.on('edge:unselected', (args) => {
    args.edge.attr('line/stroke', '#333');
    args.edge.attr('line/strokeWidth', '2px');
  });
  flowChart.on('edge:mouseover', (args) => {
    args.edge.attr('line/stroke', '#feb663');
    args.edge.attr('line/strokeWidth', '3px');
  });
  flowChart.on('edge:mouseleave', (args) => {
    const { edge } = args;
    const selectedEdges = getSelectedEdges(flowChart);
    if (selectedEdges[0] !== edge) {
      args.edge.attr('line/stroke', '#333');
      args.edge.attr('line/strokeWidth', '2px');
    }
  });
};

const registerShortcuts = (flowChart: Graph): void => {
  Object.values(shortcuts).forEach((shortcut) => {
    const { keys, handler } = shortcut;
    flowChart.bindKey(keys, () => handler(flowChart));
  });
};

const createFlowChart = (container: HTMLDivElement, miniMapContainer: HTMLDivElement): Graph => {
  const flowChart = new Graph({
    container,
    rotating: false,
    resizing: true,
    // https://x6.antv.vision/zh/docs/tutorial/basic/clipboard
    clipboard: {
      enabled: true,
      useLocalStorage: true,
    },
    // https://x6.antv.vision/zh/docs/tutorial/intermediate/connector
    connecting: {
      snap: true,
      dangling: true,
      highlight: true,
      anchor: 'center',
      connectionPoint: 'anchor',
      router: {
        name: 'manhattan',
      },
      validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
        if (!sourceMagnet) {
          return false;
        } else if (!targetMagnet) {
          return false;
        } else {
          return sourceView !== targetView;
        }
      },
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/background
    background: {
      color: '#f8f9fa',
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/grid
    grid: {
      visible: true,
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
      clean: 100,
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/keyboard
    keyboard: {
      enabled: true,
      global: false,
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/history
    history: {
      enabled: true,
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/minimap
    minimap: {
      width: (150 * container.offsetWidth) / container.offsetHeight,
      height: 150,
      minScale: MIN_ZOOM,
      maxScale: MAX_ZOOM,
      enabled: true,
      scalable: false,
      container: miniMapContainer,
      graphOptions: {
        async: true,
        getCellView(cell: Cell) {
          if (cell.isNode()) {
            return MiniMapSimpleNode;
          }
        },
        createCellView(cell: Cell) {
          if (cell.isEdge()) {
            return null;
          }
        },
      },
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/scroller
    scroller: {
      enabled: true,
    },
    mousewheel: {
      enabled: true,
      minScale: MIN_ZOOM,
      maxScale: MAX_ZOOM,
      modifiers: ['ctrl', 'meta'],
    },
  });
  registerEvents(flowChart);
  registerShortcuts(flowChart);
  registerServerStorage(flowChart);
  return flowChart;
};

export default createFlowChart;
