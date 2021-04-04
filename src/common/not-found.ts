import chalk from 'chalk';

import {
  cannotFoundPackageJsonMessage,
  cannotFoundTSConfigMessage,
  cannotFoundViteConfigMessage,
} from './logger-meta';

export function notFoundTSConfig(writePath: string) {
  console.warn(cannotFoundTSConfigMessage(writePath));
}

export function notFoundViteConfig(writePath: string) {
  console.warn(cannotFoundViteConfigMessage(writePath));
}

export function notFoundPackageJson() {
  console.error(chalk.red(cannotFoundPackageJsonMessage));
  process.exit();
}
