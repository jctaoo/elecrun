import commander from 'commander';

import pkg from '../package.json';

import { run, runBuild } from './commands';

const program = new commander.Command(pkg.name).version(pkg.version);

program
  .command('dev', { isDefault: true })
  .option('--vite', 'The flag indicates whether to open the vite server.')
  .action(async (options: { vite: boolean }) => {
    console.log('running from:', process.cwd(), options);
    await run({ withVite: options.vite });
  });

program.command('build').action(async () => {
  await runBuild();
});

program.parseAsync(process.argv).then();
