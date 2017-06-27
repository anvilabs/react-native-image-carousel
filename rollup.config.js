/* @flow */

import babel from 'rollup-plugin-babel';
import flow from 'rollup-plugin-flow';

const config = {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'cjs',
  external: ['react', 'react-native', 'react-swipeable-views-native'],
  plugins: [flow(), babel({exclude: 'node_modules/**'})],
};

export default config;
