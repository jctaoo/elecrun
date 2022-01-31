import { cyan, green, red, yellow } from 'colorette';

import pkg from '../../package.json';

export const consoleMessagePrefix = `[${pkg.name}]`;
export const consoleViteMessagePrefix = '[vite]';

export const cannotFoundTSConfigMessage = (writePath: string): string =>
  yellow(
    `Could not find a valid 'tsconfig.json'. A default one has been written in:\n`
  ) + writePath;

export const cannotFoundViteConfigMessage = (writePath: string): string =>
  yellow(
    `Could not find a valid vite config. A default one has been written in:\n`
  ) + writePath;

export const cannotFoundESBuildConfigMessage: string =
  yellow(`Could not find the specified esbuild config.`);

export const cannotFoundEntryScriptOrViteRootPath = (cwd: string): string =>
  red(
    `Could not find the entry script path or vite root directory path for main process in ${cwd}. See the solutions below:`
  ) +
  cyan(`
  - 1. Add an argument that indicates the entry path for the main process and the option
       that indicates the root path for vite. Example:
          run \`elecrun dev ./index.js --vite ./index.html\`
  - 2. Elecrun will automatically find the entry path and vite root path by the following
       list while you didn't specify the entry path argument.
          Entry script for main process:
            - ./src/main/index.js
            - ./src/main/index.ts
            - ./src/index.js
            - ./src/index.ts
            - ./index.js
            - ./index.ts
          Vite root directory path:
            - ./src/renderer/
            - ./src/
            - ./
`);

export const cannotFoundPackageJsonMessage =
  "Could not find a valid 'package.json'.";
export const startMessage = cyan(
  `${consoleMessagePrefix} Start compile main process...`
);
export const finishMessage = green(
  `${consoleMessagePrefix} Finished compiled. Rerun electron main process...`
);
export const finishBuildMessage = green(
  `${consoleMessagePrefix} Finish Build.`
);
export const warnPreloadMessage = `warn preload path.`;
