import { Graph } from '@antv/x6';

export function createGraph(container: HTMLDivElement): Graph {
  return new Graph(container, {
    rotate: false,
    resize: true,
    grid: {
      type: 'dot',
      color: '#bcbcbc',
    },
  });
}

export function A(): void {
  // code
}
