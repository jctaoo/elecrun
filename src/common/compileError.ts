import os from 'os';

import { cyan, gray, red, yellow } from 'colorette';

import { repeatString } from '../utils';

export interface CompileError {
  location:
    | {
        column: number;
        file: string;
        length: number;
        line: number;
        lineText: string;
      }
    | undefined
    | null;
  message: string;
}

export function formatCompileError(error: CompileError): string {
  if (!error.location) return error.message;

  const pathMessage =
    cyan(error.location.file) +
    ':' +
    yellow(error.location.line) +
    ':' +
    yellow(error.location.column);
  const categoryMessage = red('error:');

  const code =
    gray(error.location.line) +
    ' ' +
    error.location.lineText +
    os.EOL +
    repeatString(
      ' ',
      error.location.column + `${error.location.line}`.length + 1 + 1,
    ) +
    red(repeatString('~', error.location.length)) +
    repeatString(
      ' ',
      error.location.lineText.length -
        error.location.column -
        error.location.length,
    );

  return `${pathMessage} - ${categoryMessage} ${error.message} ${os.EOL} ${code}`;
}
