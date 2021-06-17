import { Shape } from '@antv/x6';

const createNode = (
  id: string,
  name: string,
  domain: string,
  funcName: string,
  provider: string,
) => {
  const schema = {
    base: Shape.Rect,
    shape: `imove-behavior-${id}`,
    width: 80,
    height: 40,
    label: name,
    attrs: {
      body: {
        fill: '#AACCF7',
        stroke: '#5E9CEE',
      },
      label: {
        fill: '#333',
        textWrap: { width: '100%' },
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
      id,
      label: name,
      domain,
      funcName,
      provider,
      configSchema: '{\n  \n}',
      configData: {},
      dependencies: '{\n  \n}',
      code: 'export default async function(ctx) {\n const {funcName, provider, id} = ctx; \n const providerClass = await ctx.payload.ctx.requestContext.getAsync(provider); \n const params = ctx.payload.body[id]; \n const rst = await providerClass[funcName](...params); \n ctx.setContext({[id]: rst}); \n return rst; \n}',
    },
  };
  return schema;
};

export default createNode;
