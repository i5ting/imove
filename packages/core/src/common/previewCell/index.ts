import start from './start';
import branch from './branch';
import behavior from './behavior';

const cellSchemaMap: { [key: string]: any } = {
  'imove-start-preview': start,
  'imove-branch-preview': branch,
  'imove-behavior-preview': behavior,
};

export default cellSchemaMap;
