module.exports = {
  extends: [
    'anvilabs',
    'anvilabs/flowtype',
    'anvilabs/react-native',
  ],
  rules: {
    'no-use-before-define': 0,
    // https://github.com/benmosher/eslint-plugin-import
    'import/no-internal-modules': 0,
    // https://github.com/yannickcr/eslint-plugin-react
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    // https://github.com/Intellicode/eslint-plugin-react-native
    'react-native/no-color-literals': 0,
  },
};
