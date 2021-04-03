import fs from 'fs';

import chalk from 'chalk';
import { createServer, Plugin } from 'vite';

import { consoleViteMessagePrefix, PathManager } from '../common';
import { LoggerPlugin } from '../utils';

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

export async function startViteServer(configPath: string) {
  // TODO check configPath not exits
  const server = await createServer({
    configFile: `${configPath}.ts`,
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
