import {
  cannotFoundEntryScriptOrViteRootPath,
  diagnose,
  finishBuildMessage,
  notFoundTSConfig,
  PathManager,
  startMessage,
  writeMainTSConfig,
} from '../common';
import { findPathOrExit } from '../utils/find-paths-or-exit';

import { runESBuildForMainProcess } from './esbuild';

export async function runBuild(options: {
  entry?: string;
  preloadScript?: string;
}) {
  const { entry, preloadScript } = options;

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
      isBuild: true,
      outDir: PathManager.shard.outDir,
      preloadScript,
      entryPath: entryScriptPath,
    },
    (...errors) => diagnose(...errors),
    () => console.log(startMessage),
    () => {},
    async () => {
      const tsconfigPath = await writeMainTSConfig();
      notFoundTSConfig(tsconfigPath);
      return tsconfigPath;
    }
  );

  // TODO print some useful information when build finished.
  console.log(finishBuildMessage);
}
