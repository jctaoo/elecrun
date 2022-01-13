/**
 * Run main process using ESBuild
 */

import fs from 'fs';
import path from 'path';

import * as esbuild from 'esbuild';

import {
  CompileError,
  notFoundESBuildConfig,
  notFoundPackageJson,
  PathManager,
  warnPreloadMessage,
} from '../common';
import { MainCommand } from '../types';
import { exists } from '../utils';

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

async function findExternal(): Promise<string[]> {
  // find package.json
  if (!(await exists(PathManager.shard.packageJsonPath))) {
    notFoundPackageJson();
  }

  const externals: Set<string> = new Set();
  const keys = ['dependencies', 'devDependencies', 'peerDependencies'];
  const pkg = await import(PathManager.shard.packageJsonPath);

  for (const key of keys) {
    const obj = pkg[key] ?? {};
    for (const name of Object.keys(obj)) {
      externals.add(name);
    }
  }

  // find node_modules
  if (await exists(PathManager.shard.nodeModulesPath)) {
    const children = await fs.promises.readdir(
      PathManager.shard.nodeModulesPath
    );
    for (const child of children) {
      externals.add(child);
    }
  }

  return Array.from(externals);
}

/** When provided with a filename, loads the esbuild js config from the file as a default export */
export const loadESBuildConfigFromFile = (
  file?: string
): Partial<esbuild.BuildOptions> => {
  // No file provided
  if (!file) return {};

  const esbuildConfigPath = path.join(PathManager.shard.cwd, file);

  // File provided but does not exist.
  if (!fs.existsSync(esbuildConfigPath)) {
    notFoundESBuildConfig();
    return {};
  }

  try {
    return require(esbuildConfigPath);
  } catch (e) {
    // File exists but could not be loaded
    console.error('Could not load provided esbuild config file, ignoring');
    console.error(e);
  }
  return {};
};

export const runESBuildForMainProcess: MainCommand = async (
  { isBuild, outDir, preloadScript, entryPath, esbuildConfigFile },
  reportError,
  _buildStart,
  buildComplete,
  notFoundTSConfig
) => {
  // Load esbuild config file supplied by user
  const esbuildConfigExtra = loadESBuildConfigFromFile(esbuildConfigFile);

  let tsconfigPath = path.join(PathManager.shard.mainPath, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    tsconfigPath = await notFoundTSConfig();
  }

  let count = 0;
  const externals = await findExternal();

  const entryPoints = [entryPath];
  if (preloadScript) {
    if (!/^.*\.(js|ts|jsx|tsx)$/.test(preloadScript)) {
      console.log(warnPreloadMessage);
    }
    const preloadScriptPath = path.join(
      PathManager.shard.mainPath,
      preloadScript
    );
    if (await exists(preloadScriptPath)) {
      entryPoints.push(preloadScriptPath);
      // Only valid during the development phase
      if (!isBuild) {
        PathManager.shard.setPreloadScriptPath(preloadScriptPath);
      }
    }
  }

  try {
    await esbuild.build({
      outdir: outDir,
      entryPoints: entryPoints,
      tsconfig: tsconfigPath,
      format: 'cjs',
      logLevel: 'silent',
      logLimit: 0,
      incremental: !isBuild,
      platform: 'node',
      sourcemap: true,
      bundle: true,
      external: externals,
      watch: !isBuild
        ? {
            onRebuild: async (error) => {
              if (error) {
                reportError(...transformErrors(error));
              } else {
                count++;
                buildComplete(outDir, count);
              }
            },
          }
        : false,
      ...esbuildConfigExtra,
    });
    count++;
    buildComplete(outDir, count);
  } catch (e) {
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as esbuild.BuildFailure;
      reportError(...transformErrors(error));
    }
  }
};
