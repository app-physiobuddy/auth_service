  // jest.unit.config.js

  module.exports = {
    ...require('./jest.config'),
    rootDir: ".",
    testMatch: ['**/tests/unit/**/*.spec.js'],
    //testMatch: ['<rootDir>/tests/unit/**/*.spec.js'],
    displayName: 'unit-tests'
  };