module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testEnvironment: 'jsdom',
  setupFiles: ['./src/setupTests.ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
