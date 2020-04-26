import { Graph } from '@antv/x6';
import { Commands } from '../model';

export function zoomIn(graph: Graph) {
  return (): void => {
    let { scale } = graph.view;
    if (scale >= 8) {
      scale += 8;
    } else if (scale >= 4) {
      scale += 4;
    } else if (scale >= 2) {
      scale += 1;
    } else if (scale >= 1.5) {
      scale += 0.5;
    } else if (scale >= 1) {
      scale += 0.25;
    } else if (scale >= 0.7) {
      scale += 0.15;
    } else if (scale >= 0.4) {
      scale += 0.1;
    } else if (scale >= 0.15) {
      scale += 0.05;
    } else if (scale >= 0.01) {
      scale += 0.01;
    }
    graph.zoomTo(scale);
  };
}

export function zoomOut(graph: Graph) {
  return (): void => {
    let { scale } = graph.view;
    if (scale <= 0.15) {
      scale -= 0.01;
    } else if (scale <= 0.4) {
      scale -= 0.05;
    } else if (scale <= 0.7) {
      scale -= 0.1;
    } else if (scale <= 1) {
      scale -= 0.15;
    } else if (scale <= 1.5) {
      scale -= 0.25;
    } else if (scale <= 2) {
      scale -= 0.5;
    } else if (scale <= 4) {
      scale -= 1;
    } else if (scale <= 8) {
      scale -= 4;
    } else if (scale <= 16) {
      scale -= 8;
    }
    graph.zoomTo(scale);
  };
}

export function bindKey(commands: Commands, graph: Graph): void {
  commands.forEach((items) =>
    items.forEach((item) => {
      if (item.shortcut) {
        if (item.shortcut === 'Delete') {
          graph.bindKey(['del', 'backspace'], item.handler);
        } else {
          graph.bindKey(item.shortcut, item.handler);
        }
      }
    })
  );
}
