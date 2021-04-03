/**
 * Run main process using ESBuild
 */

import fs from 'fs';
import path from 'path';

import * as esbuild from 'esbuild';

import { CompileError, DefaultPath } from '../common';
import { MainWatch } from '../types';
import { delay } from '../utils';

function transformErrors(error: esbuild.BuildFailure): CompileError[] {
  return error.errors.map(
    (e): CompileError => {
      return {
        location: e.location,
        message: e.text,
      };
    }
  );
}

export const esbuildWatchMainProcess: MainWatch = async (
  reportError,
  _buildStart,
  buildComplete,
  notFoundTSConfig
) => {
  const tsconfigPath = path.join(DefaultPath.shard.mainPath, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    notFoundTSConfig();
  }

  try {
    await esbuild.build({
      outdir: DefaultPath.shard.outDir,
      entryPoints: [DefaultPath.shard.entryPath],
      tsconfig: tsconfigPath,
      format: 'cjs',
      logLevel: 'silent',
      logLimit: 0,
      incremental: true,
      platform: 'node',
      sourcemap: true,
      watch: {
        onRebuild: async (error) => {
          await delay(2000);
          if (error) {
            reportError(...transformErrors(error));
          } else {
            buildComplete(DefaultPath.shard.outDir);
          }
        },
      },
    });
    buildComplete(DefaultPath.shard.outDir);
  } catch (e) {
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as esbuild.BuildFailure;
      reportError(...transformErrors(error));
    }
  }
};
