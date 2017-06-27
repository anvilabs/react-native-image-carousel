/* @flow */

import babel from 'rollup-plugin-babel';
import flow from 'rollup-plugin-flow';

const config = {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'cjs',
  external: ['react', 'react-native', 'react-swipeable-views-native'],
  plugins: [
    flow(),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        [
          'es2015',
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        'babel-plugin-transform-react-jsx',
        'babel-plugin-transform-class-properties',
        [
          'transform-object-rest-spread',
          {
            useBuiltIns: true,
          },
        ],
      ],
      exclude: 'node_modules/**',
    }),
  ],
};

export default config;
