import { Style, Point } from '@antv/x6';
import { CellTypes } from '../components/cells';

interface CellStyle extends Style {
  type: CellTypes;
}

export interface DataItem {
  label?: string;
  title: string;
  data?: any;
  width: number;
  height: number;
  scale: number;
  style: CellStyle;
  isEdge?: boolean;
  points?: Point[];
}

export const generals: DataItem[] = [
  {
    title: 'Start Event',
    width: 20,
    height: 20,
    scale: 2,
    style: {
      type: 'start',
    },
  },
  {
    title: 'Decision',
    width: 48,
    height: 30,
    scale: 2,
    style: {
      type: 'decision',
    },
  },
  {
    title: 'End Event',
    width: 20,
    height: 20,
    scale: 2,
    style: {
      type: 'end',
    },
  },
];
