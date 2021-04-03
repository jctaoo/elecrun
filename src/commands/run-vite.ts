import chalk from 'chalk';
import { createServer } from 'vite';

import { consoleViteMessagePrefix } from '../common';
import { LoggerPlugin } from '../utils';

export async function startViteServer(configPath: string) {
  // TODO check configPath not exits
  const server = await createServer({
    configFile: `${configPath}.ts`,
    logLevel: 'silent',
    plugins: [LoggerPlugin()],
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
