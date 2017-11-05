module.exports = {
  extends: [
    'anvilabs',
    'anvilabs-react/native',
    'anvilabs/flowtype',
  ],
  rules: {
    'no-use-before-define': 'off',
    // https://github.com/benmosher/eslint-plugin-import
    'import/no-internal-modules': 'off',
    // https://github.com/yannickcr/eslint-plugin-react
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': 'off',
    // https://github.com/Intellicode/eslint-plugin-react-native
    'react-native/no-color-literals': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
