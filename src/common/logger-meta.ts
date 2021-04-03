import chalk from 'chalk';

import pkg from '../../package.json';

export const consoleMessagePrefix = `[${pkg.name}]`;
export const consoleViteMessagePrefix = '[vite]';

export const cannotFoundTSConfigMessage =
  "Could not find a valid 'tsconfig.json'.";
export const startMessage = chalk.cyan(
  `${consoleMessagePrefix} Start compile main process...`
);
export const finishMessage = chalk.green(
  `${consoleMessagePrefix} Finished compiled. Rerun electron main process...`
);
export const finishBuildMessage = chalk.green(
  `${consoleMessagePrefix} Finish Build.`
);
