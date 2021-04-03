import {
  DefaultPath,
  diagnose,
  finishBuildMessage,
  notFoundTSConfig,
  startMessage,
} from '../common';

import { runESBuildForMainProcess } from './esbuild';

export async function runBuild(options: { preloadScript?: string }) {
  const { preloadScript } = options;

  await runESBuildForMainProcess(
    {
      isBuild: true,
      outDir: DefaultPath.shard.outDir,
      preloadScript,
    },
    (...errors) => diagnose(...errors),
    () => console.log(startMessage),
    () => {},
    notFoundTSConfig
  );

  // TODO print some useful information when build finished.
  console.log(finishBuildMessage);
}
