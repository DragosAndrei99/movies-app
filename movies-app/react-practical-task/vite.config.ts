/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      provider: 'istanbul',
      exclude: ['.storybook/**/*', 'cypress/**/*', './src/stories/*/**', './src/components/*/**.cy.tsx']
    }
  },
})
