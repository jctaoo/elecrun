import chalk from 'chalk';

import { CompileError, DefaultPath, diagnose } from '../common';
import {
  cannotFoundTSConfigMessage,
  finishMessage,
  startMessage,
} from '../common';

import { esbuildWatchMainProcess } from './esbuild-dev';
import { startElectron } from './run-electron';
import { startViteServer } from './run-vite';

function reportError(...errors: CompileError[]) {
  diagnose(...errors);
}

function buildStart() {
  console.log(startMessage);
}

let stopElectron: () => void = async () => {
  console.log('default stop');
};
async function buildComplete(dir: string) {
  console.log(finishMessage);
  stopElectron();
  [, stopElectron] = await startElectron({ path: dir });
}

function notFoundTSConfig() {
  console.error(chalk.red(cannotFoundTSConfigMessage));
  process.exit();
}

export async function run({ withVite = false }: { withVite: boolean }) {
  // Start vite server
  if (withVite) {
    await startViteServer(DefaultPath.shard.viteConfigPath);
  }
  // Start dev for main process
  esbuildWatchMainProcess(
    reportError,
    buildStart,
    buildComplete,
    notFoundTSConfig
  );
}
