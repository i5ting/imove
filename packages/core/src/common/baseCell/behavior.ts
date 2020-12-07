import { Shape } from '@antv/x6';

const schema = {
  base: Shape.Rect,
  shape: 'imove-behavior',
  width: 80,
  height: 40,
  label: '处理',
  attrs: {
    body: {
      fill: '#AACCF7',
      stroke: '#5E9CEE',
    },
    label: {
      fill: '#333',
    },
  },
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#666',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#666',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#666',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#666',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
    items: [
      {
        id: 'top',
        group: 'top',
      },
      {
        id: 'right',
        group: 'right',
      },
      {
        id: 'bottom',
        group: 'bottom',
      },
      {
        id: 'left',
        group: 'left',
      },
    ],
  },
  data: {
    label: '处理',
    configSchema: '{\n  \n}',
    configData: {},
    dependencies: '{\n  \n}',
    code: 'export default async function(ctx) {\n  \n}',
  },
};

export default schema;
