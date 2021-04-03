import { ChildProcess } from 'child_process';
import * as childProcess from 'child_process';
import * as stream from 'stream';

import chalk from 'chalk';

import { removeJunkTransformOptions } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const electron = require('electron');

const stopList: Array<() => void> = [];
let exitByScripts = false;

export async function startElectron({
  path,
  silent = false,
}: {
  path?: string;
  silent?: boolean;
}): Promise<[ChildProcess, () => void]> {
  for (const stop of stopList) {
    stop();
  }

  const electronProcess = childProcess.spawn(electron, [path ?? '', '--color']);
  electronProcess.on('exit', (code) => {
    if (!exitByScripts) {
      console.log(chalk.gray(`Electron exited with code ${code}`));
      process.exit();
    }
    exitByScripts = true;
  });

  function createStop() {
    let called = false;
    return () => {
      if (!called && electronProcess) {
        electronProcess.removeAllListeners();
        process.kill(electronProcess.pid);
        exitByScripts = true;
      }
      called = true;
    };
  }
  const stop = createStop();

  stopList.push(stop);

  if (!silent) {
    const removeElectronLoggerJunkOut = new stream.Transform(
      removeJunkTransformOptions
    );
    const removeElectronLoggerJunkErr = new stream.Transform(
      removeJunkTransformOptions
    );

    // TODO fix eslint

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    electronProcess
      .stdout!.pipe(removeElectronLoggerJunkOut)
      .pipe(process.stdout);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    electronProcess
      .stderr!.pipe(removeElectronLoggerJunkErr)
      .pipe(process.stderr);
  }

  return [electronProcess, stop];
}
