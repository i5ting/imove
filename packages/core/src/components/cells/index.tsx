import Start from './start';
import Action from './action';
import Decision from './decision';
import End from './end';

const CellMap = {
  start: Start,
  action: Action,
  decision: Decision,
  end: End,
};

export default CellMap;

export type CellTypes = keyof typeof CellMap;
