import chalk from 'chalk';

import pkg from '../../package.json';

export const consoleMessagePrefix = `[${pkg.name}]`;
export const consoleViteMessagePrefix = '[vite]';

export const cannotFoundTSConfigMessage = (writePath: string): string =>
  chalk.yellow`Could not find a valid 'tsconfig.json'. A default one has been written in:\n` +
  writePath;

export const cannotFoundPackageJsonMessage =
  "Could not find a valid 'package.json'.";
export const startMessage = chalk.cyan(
  `${consoleMessagePrefix} Start compile main process...`
);
export const finishMessage = chalk.green(
  `${consoleMessagePrefix} Finished compiled. Rerun electron main process...`
);
export const finishBuildMessage = chalk.green(
  `${consoleMessagePrefix} Finish Build.`
);
export const warnPreloadMessage = `warn preload path.`;
