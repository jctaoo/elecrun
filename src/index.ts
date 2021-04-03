import commander from 'commander';

import pkg from '../package.json';

import { clean, run, runBuild } from './commands';

const program = new commander.Command(pkg.name).version(pkg.version);

program
  .command('dev', { isDefault: true })
  .option('--vite', 'The flag indicates whether to open the vite server.')
  .option('--preload <file>', "Electron preload file. Won't be bundled.")
  .action(async (options: { vite: boolean; preload: string }) => {
    await clean();
    await run({ withVite: options.vite, preloadScript: options.preload });
  });

program
  .command('build')
  .option('--preload <file>', "Electron preload file. Won't be bundled.")
  .action(async (options: { preload: string }) => {
    await clean();
    await runBuild({ preloadScript: options.preload });
  });

program.command('clean').action(clean);

program.parseAsync(process.argv).then();
