import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  bundle: true,
  outDir: "build",
  splitting: false,
  sourcemap: true,
  format: "cjs",
  clean: true,
})