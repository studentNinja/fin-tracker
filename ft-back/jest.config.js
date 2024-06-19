module.exports = {
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
