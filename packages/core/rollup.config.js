import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import rollupBaseConfig from '../../rollup.config';

export default Object.assign(rollupBaseConfig, {
  plugins: [
    postcss(),
    typescript(),
    commonjs()
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: Object.keys(pkg.peerDependencies),
});
