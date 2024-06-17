module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/jest.setup.js'],
    testMatch: ['**/tests/**/*.test.js'], // Change to .ts if you're using TypeScript for tests
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  };
  