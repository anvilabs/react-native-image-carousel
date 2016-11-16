module.exports = {
  extends: [
    'anvilabs',
    'anvilabs/react-native',
    'anvilabs/lodash',
  ],
  plugins: [
    'graphql',
  ],
  globals: {
    fetch: false,
  },
  rules: {
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,

    'react/sort-comp': 0,
    'react/jsx-indent': 0,
  },
};
