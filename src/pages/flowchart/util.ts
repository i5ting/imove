import { Cell, Graph, Style } from "@antv/x6";
import { DataItem, isCircle, isGroup, mockGraphData } from "./data";

export function createGraph(container: HTMLDivElement) {
  return new Graph(container, {
    rotate: false,
    resize: true,
    folding: false,
    infinite: true, // 无限大画布
    // pageVisible: true,
    // pageBreak: {
    //   enabled: true,
    //   dsahed: true,
    //   stroke: '#c0c0c0',
    // },
    // pageFormat: {
    //   width: 800,
    //   height: 960,
    // },
    // mouseWheel: true,
    rubberband: true,
    allowLoops: true,
    backgroundColor: "#f8f9fa",
    grid: {
      type: "dot",
      color: "#bcbcbc"
    },
    guide: {
      enabled: true,
      dashed: true,
      stroke: "#ff5500"
    },
    connection: {
      enabled: true,
      hotspotable: false,
      livePreview: true,
      createEdge(options) {
        const style = options.style;
        fixEdgeStyle(style, style);
        return this.createEdge(options);
      }
    },
    connectionPreview: {
      stroke: "#1890ff"
    },
    connectionHighlight: {},
    allowDanglingEdges: false,
    keyboard: {
      enabled: true,
      global: false,
      escape: true
    },
    selectionPreview: {
      dashed: false,
      strokeWidth: 2
    },
    nodeStyle: {
      fill: "rgba(0, 0, 0, 0)",
      stroke: "none",
      label: false,
      editable: false
    },
    edgeStyle: {
      edge: "elbow",
      elbow: "vertical",
      labelBackgroundColor: "#f8f9fa",
      rounded: true,
      movable: false
    },
    dropEnabled: true,
    dropTargetHighlight: {
      stroke: "#87d068",
      opacity: 1
    },
    anchor: {
      inductiveSize: 24
    },
    // anchorTip: {
    //   enabled: true,
    //   opacity: 1,
    //   className: 'ping',
    // },
    anchorHighlight: {
      strokeWidth: 16
    },
    isValidDropTarget(target) {
      if (target && target.data) {
        return isGroup(target.data.type);
      }
    },
    isLabelMovable() {
      return false;
    },
    shouldRedrawOnDataChange() {
      return true;
    },
    getAnchors(cell) {
      if (cell != null && this.model.isNode(cell)) {
        const type = cell.data.type;
        if (type === "start") {
          return [[0.5, 1]];
        }

        if (isGroup(type)) {
          return [
            [0.25, 0],
            [0.5, 0],
            [0.75, 0],

            [0, 0.25],
            [0, 0.5],
            [0, 0.75],

            [1, 0.25],
            [1, 0.5],
            [1, 0.75],

            [0.25, 1],
            [0.5, 1],
            [0.75, 1]
          ];
        }

        return [[0.5, 0], [0, 0.5], [1, 0.5], [0.5, 1]];
      }
      return null;
    },
    getHtml(cell) {
      const data = cell.data;
      const group = isGroup(data.type);
      return `
          <div class="flowchart-node${group ? " is-gruop" : ""} ${data.type}">
            ${data.icon ? `<i class="icon">${data.icon}</i>` : ""}
            ${group ? "" : `<span class="text">${data.title}</span>`}
          </div>
        `;
    }
  });
}

export function addNode(
  graph: Graph,
  item: DataItem,
  x: number,
  y: number,
  width?: number | null,
  height?: number | null,
  title?: string | null,
  parent?: Cell
) {
  const data = { ...item.data };
  if (title) {
    data.title = title;
  }

  return graph.addNode({
    x,
    y,
    data,
    parent,
    width: width || item.width,
    height: height || item.height,
    shape: "html",
    resizable: !isCircle(item),
    perimeter: isCircle(item) ? "ellipse" : "rectangle"
  });
}

function fixEdgeStyle(raw: Style, result: Style) {
  if (raw.targetAnchorX === 1 || raw.targetAnchorX === 0) {
    result.elbow = "horizontal";
  }
}

export function addEdge(graph: Graph, options: any) {
  const style: Style = {};
  fixEdgeStyle(options, style);
  graph.addEdge({ ...options, style });
}

// export function graph2flow(graphJson: any) {
//   const { nodes, edges } = mockGraphData;

//   nodes.forEach()
// }
