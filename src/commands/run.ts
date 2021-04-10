import {
  cannotFoundEntryScriptOrViteRootPath,
  CompileError,
  diagnose,
  notFoundTSConfig,
  PathManager,
  writeMainTSConfig,
} from '../common';
import { finishMessage, startMessage } from '../common';
import { prompt } from '../common/prompt';
import { findPathOrExit } from '../utils/find-paths-or-exit';

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

export async function run(options: {
  withVite: boolean;
  preloadScript?: string;
  entry?: string;
  viteRoot?: string;
}) {
  const { withVite, preloadScript, entry, viteRoot } = options;

  // Start vite server
  if (withVite) {
    // find root first
    // TODO move to PathManager.ts
    const defaultRootList = ['./src/renderer/', './src/', './'];
    const viteRootPath = await findPathOrExit(
      viteRoot,
      defaultRootList,
      cannotFoundEntryScriptOrViteRootPath(process.cwd())
    );

    await startViteServer({
      configPath: PathManager.shard.viteConfigPath,
      root: viteRootPath,
    });
  }

  // Start dev for main process

  // find entry first
  // TODO move to PathManager.ts
  const defaultEntryList = [
    './src/main/index.js',
    './src/main/index.ts',
    './src/index.js',
    './src/index.ts',
    './index.js',
    './index.ts',
  ];
  const entryScriptPath = await findPathOrExit(
    entry,
    defaultEntryList,
    cannotFoundEntryScriptOrViteRootPath(process.cwd())
  );

  await runESBuildForMainProcess(
    {
      isBuild: false,
      outDir: PathManager.shard.devOutPath,
      preloadScript,
      entryPath: entryScriptPath,
    },
    reportError,
    buildStart,
    buildComplete,
    async () => {
      const tsconfigPath = await writeMainTSConfig();
      notFoundTSConfig(tsconfigPath);
      return tsconfigPath;
    }
  );
}
