module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    delighted: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'prettier',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
  },
};
