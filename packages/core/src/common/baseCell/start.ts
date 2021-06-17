import { Shape } from '@antv/x6';

const schema = {
  base: Shape.Circle,
  shape: 'imove-start',
  width: 60,
  height: 60,
  label: '开始',
  attrs: {
    body: {
      fill: '#6B8CD7',
      strokeWidth: 2,
      stroke: '#4E68A3',
    },
    label: {
      fill: '#FFF',
      fontSize: 13,
      fontWeight: 500,
      textWrap: { width: '100%' },
    },
  },
  ports: {
    groups: {
      top: {
        position: 'top',
        zIndex: 10,
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
        zIndex: 10,
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
        zIndex: 10,
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
        zIndex: 10,
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
    label: '开始',
    configSchema: '{\n  \n}',
    configData: {},
    trigger: 'start',
    dependencies: '{\n  \n}',
    code: 'export default async function(ctx) {\n  \n}',
  },
};

export default schema;
