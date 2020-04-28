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
    label: 'Action',
    type: 'action',
    style: {
      width: 48,
      height: 30,
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
  {
    label: 'Decision',
    type: 'decision',
    style: {
      width: 48,
      height: 30,
      scale: 2,
    },
  },
];
