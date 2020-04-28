import * as React from 'react';
import {
  UndoOutlined,
  RedoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  RetweetOutlined,
  FullscreenOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Graph, UndoManager, Platform } from '@antv/x6';
import * as Tool from '../utils/tool';
import { Commands } from '../model';

export default function getCommands(graph: Graph, undoManager: UndoManager): Commands {
  const ctrlKey = Platform.IS_MAC ? 'Cmd' : 'Ctrl';
  return [
    [
      {
        name: 'undo',
        icon: <UndoOutlined />,
        tooltip: '撤销',
        shortcut: `${ctrlKey} + Z`,
        handler: (): void => undoManager.undo(),
      },
      {
        name: 'redo',
        icon: <RedoOutlined />,
        tooltip: '重做',
        shortcut: `${ctrlKey} + Shift + Z`,
        handler: (): void => undoManager.redo(),
      },
    ],
    [
      {
        name: 'zoomIn',
        icon: <ZoomInOutlined />,
        tooltip: '放大',
        handler: Tool.zoomIn(graph),
      },
      {
        name: 'zoomOut',
        icon: <ZoomOutOutlined />,
        tooltip: '缩小',
        handler: Tool.zoomOut(graph),
      },
    ],
    [
      {
        name: 'resetView',
        icon: <RetweetOutlined />,
        tooltip: '重置视口',
        handler: (): void => {
          graph.zoomTo(1);
          graph.center();
        },
      },
      {
        name: 'fitWindow',
        icon: <FullscreenOutlined />,
        tooltip: '适应窗口',
        handler: (): void => {
          graph.fit(8);
        },
      },
    ],
    [
      {
        name: 'delete',
        icon: <DeleteOutlined />,
        tooltip: '删除',
        shortcut: 'Delete',
        handler: (): void => graph.deleteCells(),
      },
    ],
    [
      {
        name: 'save',
        icon: <SaveOutlined />,
        tooltip: '保存',
        shortcut: `${ctrlKey} + S`,
        handler: (): void => {
          const graphData = graph.toJSON();
          console.log(JSON.stringify(graphData));
        },
      },
    ],
  ];
}
