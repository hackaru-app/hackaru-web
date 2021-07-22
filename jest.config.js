module.exports = {
  setupFiles: [
    'jest-canvas-mock',
    'jest-localstorage-mock',
    './__tests__/__setups__/config.js',
  ],
  moduleFileExtensions: ['js', 'json', 'vue'],
  testPathIgnorePatterns: [
    '__tests__/__setups__/',
    '__tests__/__helpers__/',
    'node_modules/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!nuxt.config.js',
    '!static/sw.js',
    '!coverage/**',
    '!.nuxt/**',
    '!node_modules/**',
    '!__tests__/__setups__/**',
    '!__tests__/__helpers__/**',
  ],
  snapshotSerializers: ['jest-serializer-vue'],
  clearMocks: true,
  testEnvironment: 'jsdom',
};
