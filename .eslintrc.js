module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true
  },
  globals: {
    delighted: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'vue',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier/babel',
    'prettier/standard',
    'prettier/vue'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-unused-vars': [
      'error', {
        args: 'all',
        argsIgnorePattern: '^_'
      }
    ],
    camelcase: [
      'error', {
        properties: 'never'
      }
    ]
  }
}
