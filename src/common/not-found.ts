import chalk from 'chalk';

import {
  cannotFoundPackageJsonMessage,
  cannotFoundTSConfigMessage,
} from './logger-meta';

export function notFoundTSConfig() {
  console.error(chalk.red(cannotFoundTSConfigMessage));
  process.exit();
}

export function notFoundPackageJson() {
  console.error(chalk.red(cannotFoundPackageJsonMessage));
  process.exit();
}
