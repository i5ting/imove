import { Shape } from '@antv/x6';

const schema = {
  base: Shape.Polygon,
  shape: 'imove-branch-preview',
  top: 20,
  width: 80,
  height: 40,
  label: '分支',
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
};

export default schema;
