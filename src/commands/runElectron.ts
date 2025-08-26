import { ChildProcess } from 'child_process';
import * as childProcess from 'child_process';
import * as stream from 'stream';

import { gray } from 'colorette';

import { removeJunkTransformOptions, terminateChild } from '../utils';

const stopList: Array<() => Promise<void>> = [];
let exitByScripts = false;

export async function startElectron({
  path,
  silent = false,
}: {
  path?: string;
  silent?: boolean;
}): Promise<[ChildProcess, () => Promise<void>]> {
  for (const stop of stopList) {
    await stop();
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const electronPath = require('electron');

  const electronProcess = childProcess.spawn(electronPath, [
    path ?? '',
    '--color',
  ]);
  electronProcess.on('exit', (code) => {
    if (!exitByScripts) {
      console.log(gray(`Electron exited with code ${code}`));
      process.exit();
    }
    exitByScripts = true;
  });

  function createStop() {
    let called = false;
    let isStopping = false;
    return async () => {
      if (isStopping) return;

      if (!called && electronProcess && !isStopping) {
        isStopping = true;
        electronProcess.removeAllListeners();
        await terminateChild(electronProcess);
        exitByScripts = true;
      }
      called = true;
    };
  }
  const stop = createStop();

  stopList.push(stop);

  if (!silent) {
    const removeElectronLoggerJunkOut = new stream.Transform(
      removeJunkTransformOptions,
    );
    const removeElectronLoggerJunkErr = new stream.Transform(
      removeJunkTransformOptions,
    );

    electronProcess
      .stdout!.pipe(removeElectronLoggerJunkOut)
      .pipe(process.stdout);
    electronProcess
      .stderr!.pipe(removeElectronLoggerJunkErr)
      .pipe(process.stderr);
  }

  return [electronProcess, stop];
}
