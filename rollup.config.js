import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import strip from '@rollup/plugin-strip';
import json from '@rollup/plugin-json';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = './src/index.tsx';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input,
  plugins: [
    resolve({ extensions, preferBuiltins: true }),
    commonjs(),
    json(),
    strip({ debugger: true }),
    sizeSnapshot({ printInfo: false }),
  ],
};
