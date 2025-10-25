import { defineConfig } from 'vitest/config';

// Force CI mode to make Vitest non-interactive even when TTY is present
process.env.CI = process.env.CI || '1';

export default defineConfig({
  test: {
    // Run tests in run mode (not watch mode)
    watch: false,
    // Explicitly disable any UI/interactive mode
    ui: false,
    // Use node environment for server-side tests
    environment: 'node',
    // Non-interactive concise reporter
    reporters: ['dot'],
    // CI mode - non-interactive
    ci: true,
    // Exclude material directory and node_modules from tests
    exclude: ['**/material/**', '**/node_modules/**'],
    // Coverage configuration
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'scripts/',
        'src/cli/',
        'src/semantic/', // Exclude semantic modules from coverage for now
      ],
    },
    // Timeouts
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
