import { Shape } from '@antv/x6';

const schema = {
  base: Shape.Rect,
  shape: 'imove-behavior',
  width: 60,
  height: 30,
  label: '处理',
  attrs: {
    body: {
      fill: '#BCD0FF',
      stroke: '#6B8CD7',
      rx: 4,
      ry: 4,
    },
    label: {
      fill: '#333',
      fontSize: 13,
      fontWeight: 500,
      textWrap: { width: '100%' },
    },
  },
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 2.5,
            magnet: true,
            stroke: '#4E68A3',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 2.5,
            magnet: true,
            stroke: '#4E68A3',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 2.5,
            magnet: true,
            stroke: '#4E68A3',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 2.5,
            magnet: true,
            stroke: '#4E68A3',
            strokeWidth: 2,
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
