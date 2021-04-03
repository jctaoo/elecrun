import chalk from 'chalk';

import { cannotFoundTSConfigMessage } from './logger-meta';

export function notFoundTSConfig() {
  console.error(chalk.red(cannotFoundTSConfigMessage));
  process.exit();
}
