module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  setupFiles: ['./src/setupTests.ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
