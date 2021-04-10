import fs from 'fs';
import path from 'path';

import { PathManager } from './path-manager';

export const defaultViteConfig = (root: string): string => `
import { defineConfig } from "vite";

const rendererPath = "${root}";
const outDirRenderer = "./build";

export default defineConfig({
  base: "./",
  root: rendererPath,
  build: {
    outDir: outDirRenderer,
    emptyOutDir: true,
  },
});
`;

export const writeDefaultViteConfig = async (root: string): Promise<string> => {
  await fs.promises.mkdir(PathManager.shard.defaultViteConfigDir, {
    recursive: true,
  });
  const filePath = path.join(
    PathManager.shard.defaultViteConfigDir,
    'vite.config.ts'
  );
  await fs.promises.writeFile(filePath, defaultViteConfig(root));
  return filePath;
};
