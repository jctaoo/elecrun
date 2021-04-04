import fs from 'fs';
import path from 'path';

import { PathManager } from './path-manager';

export const defaultViteConfig = `
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
`;

export const writeDefaultViteConfig = async (): Promise<string> => {
  await fs.promises.mkdir(PathManager.shard.defaultViteConfigDir, {
    recursive: true,
  });
  const filePath = path.join(
    PathManager.shard.defaultViteConfigDir,
    'vite.config.ts'
  );
  await fs.promises.writeFile(filePath, defaultViteConfig);
  return filePath;
};
