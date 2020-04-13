export interface DataItem {
  width: number;
  height: number;
  data: {
    type: string;
    title: string;
    icon?: string;
  };
}

const items: DataItem[] = [
  {
    width: 56,
    height: 56,
    data: {
      type: "start",
      title: "开始"
    }
  },
  {
    width: 56,
    height: 56,
    data: {
      type: "end",
      title: "结束"
    }
  },
  {
    width: 72,
    height: 72,
    data: {
      type: "status",
      title: "状态节点"
    }
  },
  {
    width: 128,
    height: 48,
    data: {
      type: "execute",
      title: "执行节点",
      icon:
        '<svg viewBox="0 0 1024 1024" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M825.8 498L538.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L825.8 526c8.3-7.2 8.3-20.8 0-28zm-320 0L218.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L505.8 526c4.1-3.6 6.2-8.8 6.2-14 0-5.2-2.1-10.4-6.2-14z"></path></svg>'
    }
  },
  {
    width: 148,
    height: 48,
    data: {
      type: "cond",
      title: "条件节点",
      icon:
        '<svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M752 100c-61.8 0-112 50.2-112 112 0 47.7 29.9 88.5 72 104.6v27.6L512 601.4 312 344.2v-27.6c42.1-16.1 72-56.9 72-104.6 0-61.8-50.2-112-112-112s-112 50.2-112 112c0 50.6 33.8 93.5 80 107.3v34.4c0 9.7 3.3 19.3 9.3 27L476 672.3v33.6c-44.2 15-76 56.9-76 106.1 0 61.8 50.2 112 112 112s112-50.2 112-112c0-49.2-31.8-91-76-106.1v-33.6l226.7-291.6c6-7.7 9.3-17.3 9.3-27v-34.4c46.2-13.8 80-56.7 80-107.3 0-61.8-50.2-112-112-112zM224 212a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0zm336 600a48.01 48.01 0 0 1-96 0 48.01 48.01 0 0 1 96 0zm192-552a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg>'
    }
  }
];

const map: { [key: string]: DataItem } = {};

items.forEach(item => {
  map[item.data.type] = item;
});

export const data = { items, map };

export function isCircle(item: DataItem) {
  return item.data.type === "start" || item.data.type === "end";
}

export function isGroup(type: string) {
  return type === "combine" || type === "group";
}

export function isFunc(type: string) {
  return type === "approvement" || type === "execute";
}

export const mockGraphData = {
  nodes: [
    {
      id: "cell-2",
      data: {
        type: "start",
        title: "开始"
      },
      shape: "html",
      resizable: false,
      perimeter: "ellipse",
      visible: true,
      x: -200,
      y: -292,
      width: 56,
      height: 56,
      relative: false,
      translateControlPoints: true
    },
    {
      id: "cell-3",
      data: {
        type: "status",
        title: "idle",
        serviceType: "none"
      },
      shape: "html",
      resizable: true,
      perimeter: "rectangle",
      visible: true,
      x: -208,
      y: -200,
      width: 72,
      height: 72,
      relative: false,
      translateControlPoints: true
    },
    {
      id: "cell-4",
      data: {
        type: "status",
        title: "loading",
        serviceType: "invoke",
        api: "douban.api"
      },
      shape: "html",
      resizable: true,
      perimeter: "rectangle",
      visible: true,
      x: -208,
      y: -70,
      width: 72,
      height: 72,
      relative: false,
      translateControlPoints: true
    },
    {
      id: "cell-5",
      data: {
        type: "execute",
        title: "reject",
        icon:
          '<svg viewBox="0 0 1024 1024" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M825.8 498L538.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L825.8 526c8.3-7.2 8.3-20.8 0-28zm-320 0L218.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L505.8 526c4.1-3.6 6.2-8.8 6.2-14 0-5.2-2.1-10.4-6.2-14z"></path></svg>'
      },
      shape: "html",
      resizable: true,
      perimeter: "rectangle",
      visible: true,
      x: -370,
      y: 60,
      width: 128,
      height: 48,
      relative: false,
      translateControlPoints: true
    },
    {
      id: "cell-6",
      data: {
        type: "execute",
        title: "resolve",
        icon:
          '<svg viewBox="0 0 1024 1024" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M825.8 498L538.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L825.8 526c8.3-7.2 8.3-20.8 0-28zm-320 0L218.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L505.8 526c4.1-3.6 6.2-8.8 6.2-14 0-5.2-2.1-10.4-6.2-14z"></path></svg>',
        action: "empty",
        contextKey: "file",
        contextValue: "result.a"
      },
      shape: "html",
      resizable: true,
      perimeter: "rectangle",
      visible: true,
      x: -100,
      y: 60,
      width: 128,
      height: 48,
      relative: false,
      translateControlPoints: true
    },
    {
      id: "cell-7",
      data: {
        type: "status",
        title: "fail"
      },
      shape: "html",
      resizable: true,
      perimeter: "rectangle",
      visible: true,
      x: -342,
      y: 190,
      width: 72,
      height: 72,
      relative: false,
      translateControlPoints: true
    },
    {
      id: "cell-9",
      data: {
        type: "status",
        title: "success"
      },
      shape: "html",
      resizable: true,
      perimeter: "rectangle",
      visible: true,
      x: -72,
      y: 190,
      width: 72,
      height: 72,
      relative: false,
      translateControlPoints: true
    }
  ],
  edges: [
    {
      id: "cell-10",
      data: null,
      align: "center",
      verticalAlign: "middle",
      fontColor: "rgba(0, 0, 0, 1)",
      shape: "connector",
      endArrow: "classic",
      stroke: "#888",
      edge: "elbow",
      elbow: "vertical",
      labelBackgroundColor: "#f8f9fa",
      rounded: true,
      movable: false,
      sourceAnchorX: "0.5",
      sourceAnchorY: "1",
      targetAnchorX: "0.5",
      targetAnchorY: "0",
      sourceAnchorDx: "0",
      targetAnchorDx: "0",
      targetAnchorDy: "0",
      visible: true,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      relative: true,
      translateControlPoints: true,
      source: "cell-2",
      target: "cell-3"
    },
    {
      id: "cell-11",
      data: null,
      align: "center",
      verticalAlign: "middle",
      fontColor: "rgba(0, 0, 0, 1)",
      shape: "connector",
      endArrow: "classic",
      stroke: "#888",
      edge: "elbow",
      elbow: "vertical",
      labelBackgroundColor: "#f8f9fa",
      rounded: true,
      movable: false,
      sourceAnchorX: "0.5",
      sourceAnchorY: "1",
      targetAnchorX: "0.5",
      targetAnchorY: "0",
      sourceAnchorDx: "0",
      targetAnchorDx: "0",
      targetAnchorDy: "0",
      visible: true,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      relative: true,
      translateControlPoints: true,
      source: "cell-3",
      target: "cell-4"
    },
    {
      id: "cell-12",
      data: null,
      align: "center",
      verticalAlign: "middle",
      fontColor: "rgba(0, 0, 0, 1)",
      shape: "connector",
      endArrow: "classic",
      stroke: "#888",
      edge: "elbow",
      elbow: "vertical",
      labelBackgroundColor: "#f8f9fa",
      rounded: true,
      movable: false,
      sourceAnchorX: "0.5",
      sourceAnchorY: "1",
      targetAnchorX: "0.5",
      targetAnchorY: "0",
      sourceAnchorDx: "0",
      targetAnchorDx: "0",
      targetAnchorDy: "0",
      visible: true,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      relative: true,
      translateControlPoints: true,
      source: "cell-4",
      target: "cell-5"
    },
    {
      id: "cell-13",
      data: null,
      align: "center",
      verticalAlign: "middle",
      fontColor: "rgba(0, 0, 0, 1)",
      shape: "connector",
      endArrow: "classic",
      stroke: "#888",
      edge: "elbow",
      elbow: "vertical",
      labelBackgroundColor: "#f8f9fa",
      rounded: true,
      movable: false,
      sourceAnchorX: "0.5",
      sourceAnchorY: "1",
      targetAnchorX: "0.5",
      targetAnchorY: "0",
      sourceAnchorDx: "0",
      targetAnchorDx: "0",
      targetAnchorDy: "0",
      visible: true,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      relative: true,
      translateControlPoints: true,
      source: "cell-4",
      target: "cell-6"
    },
    {
      id: "cell-14",
      data: null,
      align: "center",
      verticalAlign: "middle",
      fontColor: "rgba(0, 0, 0, 1)",
      shape: "connector",
      endArrow: "classic",
      stroke: "#888",
      edge: "elbow",
      elbow: "vertical",
      labelBackgroundColor: "#f8f9fa",
      rounded: true,
      movable: false,
      sourceAnchorX: "0.5",
      sourceAnchorY: "1",
      targetAnchorX: "0.5",
      targetAnchorY: "0",
      sourceAnchorDx: "0",
      targetAnchorDx: "0",
      targetAnchorDy: "0",
      visible: true,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      relative: true,
      translateControlPoints: true,
      source: "cell-5",
      target: "cell-7"
    },
    {
      id: "cell-15",
      data: null,
      align: "center",
      verticalAlign: "middle",
      fontColor: "rgba(0, 0, 0, 1)",
      shape: "connector",
      endArrow: "classic",
      stroke: "#888",
      edge: "elbow",
      elbow: "vertical",
      labelBackgroundColor: "#f8f9fa",
      rounded: true,
      movable: false,
      sourceAnchorX: "0.5",
      sourceAnchorY: "1",
      targetAnchorX: "0.5",
      targetAnchorY: "0",
      sourceAnchorDx: "0",
      targetAnchorDx: "0",
      targetAnchorDy: "0",
      visible: true,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      relative: true,
      translateControlPoints: true,
      source: "cell-6",
      target: "cell-9"
    }
  ]
};
