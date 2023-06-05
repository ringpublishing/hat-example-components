import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
