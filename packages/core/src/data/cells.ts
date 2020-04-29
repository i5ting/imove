import { CellTypes } from '../components/cells';

interface Style {
  width: number;
  height: number;
  scale: number;
}

export interface DataItem {
  label: string;
  type: CellTypes;
  style: Style;
  data?: any;
  isEdge?: boolean;
  schema?: any;
}

export const generals: DataItem[] = [
  {
    label: 'Start Event',
    type: 'start',
    style: {
      width: 20,
      height: 20,
      scale: 2,
    },
  },
  {
    label: 'End Event',
    type: 'end',
    style: {
      width: 20,
      height: 20,
      scale: 2,
    },
  },
];

export const gists: DataItem[] = [
  {
    label: '查询库存',
    type: 'action',
    style: {
      width: 48,
      height: 30,
      scale: 2,
    },
    data: {
      code: '',
      dependencies: [],
    },
    schema: {
      type: 'object',
      properties: {
        activity: {
          type: 'string',
          title: 'activity',
        },
        initAmount: {
          type: 'string',
          title: 'initAmount',
        },
      },
      required: ['initAmount', 'activity'],
      title: '参数',
    },
  },
  {
    label: '判断是否登录',
    type: 'decision',
    style: {
      width: 48,
      height: 30,
      scale: 2,
    },
    data: {
      code: '',
      dependencies: [],
    },
  },
];
