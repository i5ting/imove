import { Shape } from '@antv/x6';

const createNode = (
  id: string,
  name: string,
  domain: string,
  funcName: string,
  provider: string,
  providerType: string,
) => {
  const schema = {
    base: Shape.Rect,
    shape: `imove-behavior-${id}`,
    width: 60,
    height: 30,
    label: name,
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
      serviceId: id,
      label: name,
      domain,
      funcName,
      provider,
      providerType,
      configSchema: '{\n  \n}',
      configData: {},
      dependencies: '{\n  \n}',
      code: 'export default async function(ctx) {\n const { serviceId: id, funcName, provider, providerType } = ctx.curNode.data;\n const providerClass = await ctx.payload.ctx.requestContext.getAsync(provider); \n const params = ctx.payload.body[id] || []; \n const rst = await providerClass[funcName](...params); \n ctx.setContext({[id]: rst}); \n return rst; \n}',
    },
  };
  return schema;
};

export default createNode;
