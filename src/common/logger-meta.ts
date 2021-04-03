import chalk from 'chalk';

export const consoleMessagePrefix = '[script]';
export const consoleViteMessagePrefix = '[vite]';

export const cannotFoundTSConfigMessage =
  "Could not find a valid 'tsconfig.json'.";
export const startMessage = chalk.cyan(
  `${consoleMessagePrefix} Start compile main process...`
);
export const finishMessage = chalk.green(
  `${consoleMessagePrefix} Finished compiled. Rerun electron main process...`
);
