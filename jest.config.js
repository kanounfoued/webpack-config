module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'], // looks for your test
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', '@testing-library/react/cleanup-after-each'], // sets ut test files
  setupFilesAfterEnv: ['./src/setupTests'],
};
