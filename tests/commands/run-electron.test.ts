import { ChildProcess } from 'child_process';

import test from 'ava';
import pidExists from 'process-exists';

import { startElectron } from '../../src/commands';
import { delay } from '../../src/utils';

const COUNT = 5;

// TODO Do not use serial
test.serial('test run-electron synchronously', async (t) => {
  const processList: Array<ChildProcess> = [];

  let stop = () => {};
  for (let i = 0; i < COUNT; i++) {
    stop();
    const [cp, s] = await startElectron({ silent: true });
    stop = s;
    processList.push(cp);
  }

  await delay(200);
  for (const [i, cp] of processList.entries()) {
    if (i + 1 < COUNT) {
      t.is(await pidExists(cp.pid), false);
    } else {
      t.is(await pidExists(cp.pid), true);
    }
  }

  stop();
});

test.serial('test run-electron concurrently', (t) => {
  const processList: Array<ChildProcess> = [];
  t.plan(5);

  return new Promise<void>((resolve) => {
    for (let i = 0; i < COUNT; i++) {
      startElectron({ silent: true }).then(async ([cp, stop]) => {
        processList.push(cp);

        if (i + 1 === COUNT) {
          await delay(2000);

          for (const [i, cp] of processList.entries()) {
            if (i + 1 < COUNT) {
              t.is(await pidExists(cp.pid), false);
            } else {
              t.is(await pidExists(cp.pid), true);
            }
          }

          stop();
          resolve();
        }
      });
    }
  });
});
