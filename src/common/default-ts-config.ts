import * as fs from 'fs';
import path from 'path';

import { PathManager } from './path-manager';

export const defaultBaseTSConfig = {
  compilerOptions: {
    target: 'ES2018',
    noImplicitAny: true,
    removeComments: true,
    preserveConstEnums: true,
    allowJs: true,
    checkJs: true,
    strict: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictPropertyInitialization: true,
    strictBindCallApply: true,
    noImplicitThis: true,
    noImplicitReturns: true,
    experimentalDecorators: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    moduleResolution: 'node',
    importHelpers: true,
    sourceMap: true,
    baseUrl: './src',
  },
  exclude: ['node_modules', 'app', 'dist'],
};

export const defaultMainTSConfig = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    target: 'ES2018',
    module: 'CommonJS',
    outDir: '../../app',
  },
  include: ['../main/**/*', '../common/**/*'],
  exclude: ['../renderer/**/*'],
};

export const defaultRendererTSConfig = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    target: 'esnext',
    module: 'esnext',
    lib: ['DOM', 'DOM.Iterable', 'ESNext'],
    types: ['vite/client'],
  },
  include: ['../renderer/**/*', '../common/**/*'],
  exclude: ['../main/**/*'],
};

async function writeTSConfig<Config>(config: Config, dir: string): Promise<string> {
  await fs.promises.mkdir(dir, { recursive: true });
  const str = JSON.stringify(config);
  const filePath = path.join(dir, 'tsconfig.json');
  await fs.promises.writeFile(filePath, str);
  return filePath;
}

export const writeBaseTSConfig = () =>
  writeTSConfig(defaultBaseTSConfig, PathManager.shard.defaultBaseTSConfigDir);

export const writeMainTSConfig = () =>
  writeTSConfig(defaultMainTSConfig, PathManager.shard.defaultMainTSConfigDir);

export const writeRendererTSConfig = () =>
  writeTSConfig(
    defaultRendererTSConfig,
    PathManager.shard.defaultRendererTSConfigDir
  );
