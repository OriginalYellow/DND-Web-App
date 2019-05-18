// eslint-disable-next-line no-unused-vars
module.exports = wallaby => ({
  files: [
    'models/**/*.js',
    { pattern: 'models/**/*unit.test.js', ignore: true },
    'util/**/*.js',
  ],
  tests: [
    'models/**/*unit.test.js',
  ],
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
});
