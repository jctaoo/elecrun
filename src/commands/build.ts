import {
  cannotFoundEntryScriptOrViteRootPath,
  diagnose,
  finishBuildMessage,
  notFoundTSConfig,
  PathManager,
  startMessage,
  writeMainTSConfig,
} from '../common';
import { findPathOrExit } from '../utils/findPathsOrExit';

import { runESBuildForMainProcess } from './esbuild';

interface RunBuildOptions {
  entry?: string /** Entry Point */;
  preloadScript?: string /** Filename of the preload script */;
  esbuildConfigFile?: string /** Filename of the esbuild config to use */;
  mainProcessEsm?: boolean /** Use ESM for the main process */;
}

export async function runBuild({
  entry,
  preloadScript,
  esbuildConfigFile,
  mainProcessEsm,
}: RunBuildOptions) {
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
    cannotFoundEntryScriptOrViteRootPath(process.cwd()),
  );

  await runESBuildForMainProcess(
    {
      isBuild: true,
      outDir: PathManager.shard.outDir,
      preloadScript,
      entryPath: entryScriptPath,
      esbuildConfigFile,
      format: mainProcessEsm ? 'esm' : 'cjs',
    },
    (...errors) => diagnose(...errors),
    () => console.log(startMessage),
    () => {},
    async () => {
      const tsconfigPath = await writeMainTSConfig();
      notFoundTSConfig(tsconfigPath);
      return tsconfigPath;
    },
  );

  // TODO print some useful information when build finished.
  console.log(finishBuildMessage);
}
