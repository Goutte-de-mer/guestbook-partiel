module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  forceExit: true,
  collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js',
    'middlewares/**/*.js',
    '!**/node_modules/**'
  ]
};

