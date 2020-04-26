import { Graph } from '@antv/x6';
// import Start from '../components/cells/start';

export default function createGraph(container: HTMLDivElement): Graph {
  return new Graph(container, {
    rotate: false,
    resize: false,
    infinite: true,
    backgroundColor: '#f8f9fa',
    grid: {
      type: 'dot',
      color: '#bcbcbc',
    },
    guide: {
      enabled: true,
      dashed: true,
      stroke: '#ff5500',
    },
    keyboard: {
      enabled: true,
      global: false,
      escape: true,
    },
    selectionPreview: {
      dashed: false,
      strokeWidth: 2,
    },
    nodeStyle: {
      fill: 'rgba(0, 0, 0, 0)',
      stroke: 'none',
      label: false,
      editable: false,
    },
    edgeStyle: {
      edge: 'elbow',
      elbow: 'vertical',
      labelBackgroundColor: '#f8f9fa',
      rounded: true,
      movable: false,
    },
    connection: {
      enabled: true,
      hotspotable: false,
      livePreview: true,
    },
    connectionPreview: {
      stroke: '#1890ff',
    },
    anchor: {
      inductiveSize: 10,
    },
    anchorHighlight: {
      strokeWidth: 16,
    },
    shouldRedrawOnDataChange(): boolean {
      return true;
    },
    getAnchors(cell): [number, number][] {
      if (cell.data.style.type === 'start') {
        return [[0.5, 1]];
      }

      if (cell.data.style.type === 'end') {
        return [[0.5, 0]];
      }

      return [
        [0.5, 0],
        [0, 0.5],

        [1, 0.5],
        [0.5, 1],
      ];
    },
  });
}
