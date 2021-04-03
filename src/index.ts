import commander from 'commander';

import pkg from '../package.json';

import { run } from './commands';

const program = new commander.Command(pkg.name);

program
  .version(pkg.version)
  .command('dev', { isDefault: true })
  .option('--vite', 'The flag indicates whether to open the vite server.')
  .action(async (options: { vite: boolean }) => {
    console.log('running from:', process.cwd(), options);
    await run({ withVite: options.vite });
  });

program.parseAsync(process.argv).then();
