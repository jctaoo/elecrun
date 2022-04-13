import { CompileError } from '../common';

export type MainCommand = (
  options: {
    isBuild: boolean;
    outDir: string;
    preloadScript?: string;
    entryPath: string;
    esbuildConfigFile?: string /** Config js file to use with esbuild */;
  },
  reportError: (...errs: CompileError[]) => void,
  buildStart: () => void,
  buildComplete: (dir: string, count: number) => void,
  notFoundTSConfig: () => Promise<string>
) => Promise<void>;
