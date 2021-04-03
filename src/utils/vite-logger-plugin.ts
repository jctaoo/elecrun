import chalk from 'chalk';
import { Plugin } from 'vite';

import { consoleViteMessagePrefix, DefaultPath } from '../common';

// TODO 打印 vite 错误
export function LoggerPlugin(): Plugin {
  return {
    name: 'electron-scripts-logger',
    handleHotUpdate: (ctx) => {
      for (const file of ctx.modules) {
        if (!file.file) continue;
        const path = file.file.replace(DefaultPath.shard.srcPath, '');
        console.log(
          chalk.yellow(consoleViteMessagePrefix),
          chalk.yellow('hmr update'),
          chalk.grey(path)
        );
      }
      return ctx.modules;
    },
  };
}
