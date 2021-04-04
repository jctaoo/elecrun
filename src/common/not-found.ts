import chalk from 'chalk';

import {
  cannotFoundPackageJsonMessage,
  cannotFoundTSConfigMessage,
} from './logger-meta';

export function notFoundTSConfig(writePath: string) {
  console.warn((cannotFoundTSConfigMessage(writePath)));
}

export function notFoundPackageJson() {
  console.error(chalk.red(cannotFoundPackageJsonMessage));
  process.exit();
}
