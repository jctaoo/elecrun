/**
 * Run main process using ESBuild
 */

import fs from 'fs';
import path from 'path';

import { BuildFailure, BuildOptions } from 'esbuild';

import {
  CompileError,
  notFoundESBuildConfig,
  notFoundPackageJson,
  PathManager,
  warnPreloadMessage,
} from '../common';
import { MainCommand } from '../types';
import { exists } from '../utils';
import { yellow } from 'colorette';

function transformErrors(error: BuildFailure): CompileError[] {
  return error.errors.map((e): CompileError => {
    return {
      location: e.location,
      message: e.text,
    };
  });
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
): Partial<BuildOptions> => {
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

/** Attempt to return esbuild from the project, if it exists */
const findESBuildForProject = () => {
  const esBuildPath = path.join(PathManager.shard.nodeModulesPath, 'esbuild');
  if (fs.existsSync(esBuildPath)) {
    console.log('Using esbuild from ', esBuildPath);
    return require(esBuildPath);
  } else {
    return require('esbuild');
  }
};

const writeOutDirPackageJson = async (esm: boolean) => {
  const packageJsonPath = PathManager.shard.devOutDirPackageJson;
  const packageJson = {
    type: esm ? 'module' : 'commonjs',
  };
  await fs.promises.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );
};

export const runESBuildForMainProcess: MainCommand = async (
  { isBuild, outDir, preloadScript, entryPath, esbuildConfigFile, format },
  reportError,
  _buildStart,
  buildComplete,
  notFoundTSConfig
) => {
  const esbuild = findESBuildForProject();

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
      console.log(yellow(`${warnPreloadMessage} ${preloadScript}`));
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
      format: format,
      logLevel: 'silent',
      logLimit: 0,
      incremental: !isBuild,
      platform: 'node',
      sourcemap: true,
      bundle: true,
      external: externals,
      watch: !isBuild
        ? {
            onRebuild: async (error: BuildFailure) => {
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
    await writeOutDirPackageJson(format === 'esm');
  } catch (e) {
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as BuildFailure;
      reportError(...transformErrors(error));
    }
  }
};
