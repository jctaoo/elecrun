import { gray, yellow } from 'colorette';
import type { Plugin } from 'vite';

import { consoleViteMessagePrefix, PathManager } from '../common';

// TODO 打印 vite 错误
export function LoggerPlugin(): Plugin {
  return {
    name: 'electron-scripts-logger',
    handleHotUpdate: (ctx) => {
      for (const file of ctx.modules) {
        if (!file.file) continue;
        const path = file.file.replace(PathManager.shard.srcPath, '');
        console.log(
          yellow(consoleViteMessagePrefix),
          yellow('hmr update'),
          gray(path),
        );
      }
      return ctx.modules;
    },
  };
}
