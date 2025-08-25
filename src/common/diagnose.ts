import os from 'os';

import { magentaBright } from 'colorette';

import { CompileError, formatCompileError } from './compileError';
import { consoleMessagePrefix } from './loggerMeta';

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
    magentaBright(
      `${consoleMessagePrefix} Some typescript compilation errors occurred:`,
    ) +
    '\n' +
    diagnosticDetail +
    '\n' +
    magentaBright(errorMessage);

  return res;
}

export function diagnose(...errors: CompileError[]): void {
  const output = formatDiagnosticsMessage(errors);
  console.error(output);
}
