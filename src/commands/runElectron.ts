import { ChildProcess } from 'child_process';
import * as childProcess from 'child_process';
import * as stream from 'stream';

import { gray } from 'colorette';

import { removeJunkTransformOptions } from '../utils';

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
    return () => {
      if (!called && electronProcess) {
        electronProcess.removeAllListeners();
        process.kill(electronProcess.pid!);
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
