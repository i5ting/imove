import { Shape } from '@antv/x6';

const schema = {
  base: Shape.Rect,
  shape: 'imove-behavior-preview',
  top: 20,
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
};

export default schema;
