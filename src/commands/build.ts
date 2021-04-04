import {
  diagnose,
  finishBuildMessage,
  notFoundTSConfig,
  PathManager,
  startMessage,
  writeMainTSConfig,
} from '../common';

import { runESBuildForMainProcess } from './esbuild';

export async function runBuild(options: { preloadScript?: string }) {
  const { preloadScript } = options;

  await runESBuildForMainProcess(
    {
      isBuild: true,
      outDir: PathManager.shard.outDir,
      preloadScript,
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
