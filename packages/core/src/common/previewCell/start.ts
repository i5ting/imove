import { Shape } from '@antv/x6';

const schema = {
  base: Shape.Circle,
  shape: 'imove-start-preview',
  top: 0,
  width: 80,
  height: 80,
  label: '开始',
  attrs: {
    body: {
      strokeWidth: 0,
      stroke: '#333',
      fill: '#333',
    },
    label: {
      fill: '#FFF',
    },
  },
};

export default schema;
