import { Shape } from '@antv/x6';

const schema = {
  base: Shape.Polygon,
  shape: 'imove-branch',
  width: 80,
  height: 40,
  attrs: {
    body: {
      strokeWidth: 2,
      stroke: '#333',
      fill: '#FFFC7C',
      refPoints: '0,10 10,0 20,10 10,20',
    },
    label: {
      refX: 0.5,
      refY: 0.5,
      text: '判断',
      fill: '#333',
      fontSize: 14,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
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
        zIndex: 999999999,
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
        label: {
          position: 'right',
        },
      },
      bottom: {
        zIndex: 999999999,
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
        label: {
          position: 'bottom',
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
        attrs: {
          text: {
            text: '是',
          },
        },
      },
      {
        id: 'bottom',
        group: 'bottom',
        attrs: {
          text: {
            text: '否',
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
