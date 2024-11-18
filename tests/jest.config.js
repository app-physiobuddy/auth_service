// jest.config.js
module.exports = {
    // Base config that others will extend
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.js'],
    coveragePathIgnorePatterns: [
      'node_modules',
      'tests',
      'jestGlobalMocks.js',
      '.module.ts',
      '.mock.js',
    ],
    verbose: true
  };
  

  
  // jest.integration.config.js
  module.exports = {
    ...require('./jest.config'),
    testMatch: ['<rootDir>/tests/integration/**/*.spec.js'],
    displayName: 'integration-tests'
  };
  
  // jest.e2e.config.js
  module.exports = {
    ...require('./jest.config'),
    testMatch: ['<rootDir>/tests/e2e/**/*.spec.js'],
    displayName: 'e2e-tests'
  };