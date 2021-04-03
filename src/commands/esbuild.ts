/**
 * Run main process using ESBuild
 */

import fs from 'fs';
import path from 'path';

import * as esbuild from 'esbuild';

import { CompileError, DefaultPath } from '../common';
import { MainCommand } from '../types';

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

export const runESBuildForMainProcess: MainCommand = async (
  isBuild,
  outDir,
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
      outdir: outDir,
      entryPoints: [DefaultPath.shard.entryPath],
      tsconfig: tsconfigPath,
      format: 'cjs',
      logLevel: 'silent',
      logLimit: 0,
      incremental: !isBuild,
      platform: 'node',
      sourcemap: true,
      watch: !isBuild ? {
        onRebuild: async (error) => {
          if (error) {
            reportError(...transformErrors(error));
          } else {
            buildComplete(outDir);
          }
        },
      } : false,
    });
    buildComplete(outDir);
  } catch (e) {
    console.log(e)
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as esbuild.BuildFailure;
      reportError(...transformErrors(error));
    }
  }
};
