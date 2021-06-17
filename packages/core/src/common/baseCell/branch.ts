import { Shape } from '@antv/x6';

const schema = {
  base: Shape.Polygon,
  shape: 'imove-branch',
  width: 40,
  height: 30,
  attrs: {
    body: {
      strokeWidth: 2,
      stroke: '#FFB96B',
      fill: '#FFF6D1',
      refPoints: '0,10 10,0 20,10 10,20',
    },
    label: {
      refX: 0.5,
      refY: 1,
      text: '判断',
      fill: '#333',
      fontSize: 13,
      fontWeight: 500,
      textAnchor: 'middle',
      textVerticalAnchor: 'bottom',
      transform: 'matrix(1,0,0,1,0,-6)',
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
            stroke: '#DD7500',
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
            stroke: '#DD7500',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
        label: {
          position: 'right',
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 2.5,
            magnet: true,
            stroke: '#DD7500',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
        label: {
          position: 'bottom',
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 2.5,
            magnet: true,
            stroke: '#DD7500',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
    },
    items: [
      {
        id: 'right',
        group: 'right',
        attrs: {
          text: {
            text: '',
          },
        },
      },
      {
        id: 'bottom',
        group: 'bottom',
        attrs: {
          text: {
            text: '',
          },
        },
      },
      {
        id: 'left',
        group: 'left',
      },
    ],
  },
  data: {
    label: '判断',
    configSchema: '{\n  \n}',
    configData: {},
    dependencies: '{\n  \n}',
    ports: {
      right: {
        condition: 'true',
      },
      bottom: {
        condition: 'false',
      },
    },
    code: 'export default async function(ctx) {\n  return true;\n}',
  },
};

export default schema;
