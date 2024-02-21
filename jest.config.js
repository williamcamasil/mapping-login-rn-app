const jestConfig = require('mapping-tools-rn/lib/jest/jest.config');

module.exports = {
  ...jestConfig,
  collectCoverageFrom: [
    ...jestConfig.collectCoverageFrom,
    'src/api/**/*.ts?(x)',
    'src/screens/**/*.ts?(x)',
  ],
};
