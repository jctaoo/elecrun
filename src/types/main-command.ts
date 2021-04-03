import { CompileError } from '../common';

export type MainCommand = (
  isBuild: boolean,
  outDir: string,
  reportError: (...errs: CompileError[]) => void,
  buildStart: () => void,
  buildComplete: (dir: string) => void,
  notFoundTSConfig: () => void
) => Promise<void>;
