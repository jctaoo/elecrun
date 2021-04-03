import { CompileError } from '../common';

export type MainCommand = (
  options: {
    isBuild: boolean;
    outDir: string;
    preloadScript?: string;
  },
  reportError: (...errs: CompileError[]) => void,
  buildStart: () => void,
  buildComplete: (dir: string, count: number) => void,
  notFoundTSConfig: () => void
) => Promise<void>;
