import commander from 'commander';

import pkg from '../package.json';

import { clean, run, runBuild } from './commands';

const program = new commander.Command(pkg.name).version(pkg.version);

program
  .command('dev [file entry]', { isDefault: true })
  .description('⚡️Start to dev your electron app.')
  .option(
    '--vite [root dir]',
    'The flag indicates whether to open the vite server.'
  )
  .option(
    '--preload <file>',
    "Electron preload filer relative to the main src. Won't be bundled."
  )
  .action(
    async (
      entryFile: string | undefined,
      options: { vite: string | boolean; preload: string }
    ) => {
      const withVite = !!options.vite;
      let viteRootPath: string | undefined;

      if (typeof options.vite === 'string') {
        viteRootPath = options.vite;
      }

      await clean();
      await run({
        entry: entryFile,
        withVite,
        preloadScript: options.preload,
        viteRoot: viteRootPath,
      });
    }
  );

program
  .command('build [file entry]')
  .description('Build your Electron main process code in main src.')
  .option(
    '--preload <file>',
    "Electron preload script path relative to the main src. Won't be bundled."
  )
  .action(
    async (entryFile: string | undefined, options: { preload: string }) => {
      await clean();
      await runBuild({ preloadScript: options.preload, entry: entryFile });
    }
  );

program.command('clean').action(clean);

program.addHelpText('beforeAll', `Repository: ${pkg.repository}\n`);

program.parseAsync(process.argv).then();
