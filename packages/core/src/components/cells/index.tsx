import Start from './start';
import Decision from './decision';
import End from './end';

const CellMap = {
  start: Start,
  decision: Decision,
  end: End,
};

export default CellMap;

export type CellTypes = keyof typeof CellMap;
