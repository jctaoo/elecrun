import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    pool: "vmForks",
    coverage: {
      enabled: true,
      provider: "v8",
    }
  },
})