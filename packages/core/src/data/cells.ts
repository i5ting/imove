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

const items: any = [];

new Array(localStorage.length).fill(1).forEach((val, index) => {
  const item = localStorage.key(index);
  if (item && item?.startsWith('cell')) {
    let data: any = localStorage.getItem(item);
    if (data) {
      data = JSON.parse(data);
      (data as any).type = data.type.toLowerCase();
      items.push(data);
    }
  }
});

export const gists: DataItem[] = items.map((item: any) => {
  return {
    label: item.label,
    type: item.type,
    style: {
      width: 48,
      height: 30,
      scale: 2,
    },
    data: {
      code: item.code,
      dependencies: [{ '@ali/rax-base': '^2.1.9' }],
    },
    schema: item.schema,
  };
});
