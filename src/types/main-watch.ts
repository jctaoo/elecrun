import { CompileError } from '../common';

export type MainWatch = (
  reportError: (...errs: CompileError[]) => void,
  buildStart: () => void,
  buildComplete: (dir: string) => void,
  notFoundTSConfig: () => void
) => void;
