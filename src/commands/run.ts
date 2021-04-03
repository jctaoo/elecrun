import {
  CompileError,
  DefaultPath,
  diagnose,
  notFoundTSConfig,
} from '../common';
import { finishMessage, startMessage } from '../common';

import { runESBuildForMainProcess } from './esbuild';
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

export async function run({ withVite = false }: { withVite: boolean }) {
  // Start vite server
  if (withVite) {
    await startViteServer(DefaultPath.shard.viteConfigPath);
  }
  // Start dev for main process
  await runESBuildForMainProcess(
    false,
    DefaultPath.shard.devOutPath,
    reportError,
    buildStart,
    buildComplete,
    notFoundTSConfig
  );
}
