import * as fs from 'fs';
import { join, resolve } from 'path';

import { PathManager } from '../common';
import { exists } from '../utils';

async function rmRecursively(path: string, excludes?: Array<string>) {
  if (!(await exists(path))) {
    return;
  }
  if (path.substr(0, 1) !== '/' && path.indexOf(':') === -1) {
    path = resolve(path);
  }
  const excludeFiles = (excludes ?? []).map((i) => {
    return resolve(path, i);
  });
  let files: Array<string> = [path];
  while (files.length > 0) {
    // TODO fix eslint

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const last = files.pop()!;

    const stat = await fs.promises.lstat(last);
    if (last === path && !stat.isDirectory) {
      return;
    }
    if (excludeFiles.includes(last)) {
      continue;
    }
    if (stat.isSymbolicLink()) {
      await fs.promises.unlink(last);
    } else if (!stat.isDirectory()) {
      await fs.promises.rm(last);
    } else {
      const children = await (await fs.promises.readdir(last)).map((p) => {
        return join(last, p);
      });
      if (children.length === 0) {
        await fs.promises.rmdir(last);
      } else {
        if (last !== path) {
          files.push(last);
        }
        files = files.concat(children);
      }
    }
  }
  if ((await fs.promises.readdir(path)).length === 0) {
    await fs.promises.rmdir(path);
  }
}

export async function clean() {
  await rmRecursively(PathManager.shard.devPath).then();
  await rmRecursively(PathManager.shard.outDir, [
    'package.json',
    'yarn.lock',
    'package-lock.json',
  ]).then();
  await rmRecursively(PathManager.shard.distDir).then();
}
