import os from 'os';

import chalk from 'chalk';

import { CompileError, formatCompileError } from './compile-error';
import { consoleMessagePrefix } from './logger-meta';

function formatDiagnosticsMessage(errors: CompileError[]): string {
  const messages = errors.map((e) => formatCompileError(e));
  const errorMessage = `Found ${errors.length} errors. Watching for file changes.`;

  let diagnosticDetail = '';
  messages.forEach((item, index, { length }) => {
    diagnosticDetail += item
      .split(os.EOL)
      .map((i) => '  ' + i)
      .join(os.EOL);
    if (index + 1 !== length) {
      diagnosticDetail += os.EOL;
    }
  });

  const res =
    chalk.rgb(
      255,
      161,
      237
    )(`${consoleMessagePrefix} Some typescript compilation errors occurred:`) +
    '\n' +
    diagnosticDetail +
    '\n' +
    chalk.rgb(255, 161, 237)(errorMessage);

  return res;
}

export function diagnose(...errors: CompileError[]): void {
  const output = formatDiagnosticsMessage(errors);
  console.error(output);
}
