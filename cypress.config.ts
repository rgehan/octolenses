import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'r2fbf6',
  watchForFileChanges: false,
  env: {
    BASE_URL: 'http://localhost:1234',
  },
  fixturesFolder: false,
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
