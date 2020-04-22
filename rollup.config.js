import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import strip from '@rollup/plugin-strip';
import url from '@rollup/plugin-url';
import babel from 'rollup-plugin-babel';
import svgr from '@svgr/rollup';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = './src/index.tsx';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input,
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    url({
      limit: 10 * 1024,
    }),
    svgr(),
    strip({ debugger: true }),
    sizeSnapshot(),
  ],
};
