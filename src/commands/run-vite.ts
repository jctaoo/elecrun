import fs from 'fs';

import chalk from 'chalk';
import { createServer, Plugin } from 'vite';

import {
  consoleViteMessagePrefix,
  notFoundViteConfig,
  PathManager,
  writeDefaultViteConfig,
} from '../common';
import { exists, LoggerPlugin } from '../utils';

// serve electron preload script sourcemap
const ElectronPreloadSourceMapPlugin = (): Plugin => {
  return {
    name: 'electron-preload-sourcemap',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (
          req.originalUrl &&
          req.originalUrl == PathManager.shard.preloadSourceMapPath
        ) {
          fs.createReadStream(PathManager.shard.preloadSourceMapPath).pipe(res);
          return;
        }
        next();
      });
    },
  };
};

async function tryViteConfig(basePath: string): Promise<string | undefined> {
  const tryExt = ['.js', '.ts'];
  for (const ext of tryExt) {
    const fullPath = basePath + ext;
    if (await exists(fullPath)) return fullPath;
  }
  return;
}

export async function startViteServer(options: {
  configPath: string;
  root: string;
}) {
  const { configPath, root } = options;

  let viteConfigPath = await tryViteConfig(configPath);
  if (!viteConfigPath) {
    // vite config not exits
    const writePath = await writeDefaultViteConfig(root);
    notFoundViteConfig(writePath);
    viteConfigPath = writePath;
  }

  const server = await createServer({
    configFile: viteConfigPath,
    logLevel: 'silent',
    plugins: [LoggerPlugin(), ElectronPreloadSourceMapPlugin()],
  });

  await server.listen();

  // TODO fix eslint
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const address = server.httpServer!.address();
  if (address && typeof address === 'object') {
    const port = address.port;
    console.log(
      chalk.green(consoleViteMessagePrefix),
      chalk.green(`Dev server running at: localhost:${port}`)
    );
  }
}
