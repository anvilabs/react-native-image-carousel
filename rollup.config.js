/* @flow */

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import flow from 'rollup-plugin-flow';
import resolve from 'rollup-plugin-node-resolve';

const config = {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'es',
  external: ['react', 'react-native'],
  plugins: [
    flow(),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    commonjs(),
    babel({exclude: 'node_modules/**'}),
  ],
};

export default config;
