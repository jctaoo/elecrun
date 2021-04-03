import {
  DefaultPath,
  diagnose,
  finishBuildMessage,
  notFoundTSConfig,
  startMessage,
} from '../common';

import { runESBuildForMainProcess } from './esbuild';

export async function runBuild() {
  await runESBuildForMainProcess(
    true,
    DefaultPath.shard.outDir,
    (...errors) => diagnose(...errors),
    () => console.log(startMessage),
    () => {},
    notFoundTSConfig
  );

  // TODO print some useful information when build finished.
  console.log(finishBuildMessage);
}
