import * as fs from 'fs';
import { join, resolve } from 'path';

import { DefaultPath } from '../common';

async function exists(path: fs.PathLike): Promise<boolean> {
  try {
    await fs.promises.stat(path);
    return true;
  } catch {
    return false;
  }
}

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
  rmRecursively(DefaultPath.shard.devOutPath).then();
  rmRecursively(DefaultPath.shard.outDir, [
    'package.json',
    'yarn.lock',
    'package-lock.json',
  ]).then();
  rmRecursively(DefaultPath.shard.distDir).then();
}
