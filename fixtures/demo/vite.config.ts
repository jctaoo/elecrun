import { defineConfig } from "vite";

const rendererPath = "./src/renderer"
const outDirRenderer = "./build"

export default defineConfig({
  base: "./",
  root: rendererPath,
  build: {
    outDir: outDirRenderer,
    emptyOutDir: true,
  },
});
