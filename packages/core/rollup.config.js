import rollupBaseConfig from '../../rollup.config';
import pkg from './package.json';

export default Object.assign(rollupBaseConfig, {
  external: Object.keys(pkg.peerDependencies),
});
