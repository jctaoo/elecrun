import inquirer from 'inquirer';
import { fetchAsyncQuestionPropertyQuestionProperty } from 'inquirer/lib/utils/utils';

import {
  CompileError,
  DefaultPath,
  diagnose,
  notFoundTSConfig,
} from '../common';
import { finishMessage, startMessage } from '../common';
import { prompt } from '../common/prompt';

import { runESBuildForMainProcess } from './esbuild';
import { startElectron } from './run-electron';
import { startViteServer } from './run-vite';

function reportError(...errors: CompileError[]) {
  diagnose(...errors);
}

function buildStart() {
  console.log(startMessage);
}

// =============== run electron start ===============

let stopElectron: () => void = () => {};
let stopPromptToRunElectron: () => void = () => {};

async function runElectron(dir: string) {
  stopElectron();
  [, stopElectron] = await startElectron({ path: dir });
}

async function buildComplete(dir: string, count: number) {
  stopPromptToRunElectron();
  console.log(finishMessage);

  if (count > 1) {
    const [readAnswer, stop] = prompt('Need rerun Electron?');
    stopPromptToRunElectron = stop;

    if (await readAnswer()) {
      await runElectron(dir);
    }
  } else {
    await runElectron(dir);
  }
}

// =============== run electron end ===============

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
