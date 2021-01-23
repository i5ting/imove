import start from './start';
import branch from './branch';
import behavior from './behavior';

const cellMap: { [key: string]: any } = {
  'imove-start': start,
  'imove-branch': branch,
  'imove-behavior': behavior,
};

export default cellMap;
