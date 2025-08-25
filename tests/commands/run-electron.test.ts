import { ChildProcess } from 'child_process';

import pidExists from 'process-exists';
import { describe, expect, it } from 'vitest';

import { startElectron } from '../../src/commands';
import { delay } from '../../src/utils';

const COUNT = 5;

describe('test run electron', () => {
  it('should run electron correctly synchronously', async function () {
    const processList: Array<ChildProcess> = [];

    let stop = () => {};
    for (let i = 0; i < COUNT; i++) {
      const [cp, s] = await startElectron({ silent: true });
      stop = s;
      processList.push(cp);
    }

    await delay(200);
    for (const [i, cp] of processList.entries()) {
      if (i + 1 < COUNT) {
        expect(await pidExists(cp.pid!)).toBe(false);
      } else {
        expect(await pidExists(cp.pid!)).toBe(true);
      }
    }

    stop();
  });

  it('should run electron correctly concurrently', async function () {
    const processList: Array<ChildProcess> = [];
    expect.assertions(5);

    return new Promise<void>((resolve) => {
      for (let i = 0; i < COUNT; i++) {
        startElectron({ silent: true }).then(async ([cp, stop]) => {
          processList.push(cp);

          if (i + 1 === COUNT) {
            await delay(2000);

            for (const [i, cp] of processList.entries()) {
              if (i + 1 < COUNT) {
                expect(await pidExists(cp.pid!)).toBe(false);
              } else {
                expect(await pidExists(cp.pid!)).toBe(true);
              }
            }

            stop();
            resolve();
          }
        });
      }
    });
  });
});
