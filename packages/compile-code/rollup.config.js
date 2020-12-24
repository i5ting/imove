import path from 'path';
import rollupBaseConfig from '../../rollup.config';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default Object.assign(rollupBaseConfig, {
  input: path.join(__dirname, './src/index.ts'),
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
  plugins: [
    typescript(),
  ]
});
