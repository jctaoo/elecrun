import path from 'path';

import { exists } from './';

/*
  Until elecrun v2.0, doesn't have an argument 'entry file' on dev command.
  It means we lose some flexibility. So I add this argument.

  But when the user migrate from v2.0 to a newer version, the old command 'dev'
  won't work anymore because 'entry file' is not be set. So I add a list that
  indicates the default places to find the entry file. Then, the old command
  will work in the new version.

  Anyway, this function does this. Besides 'entry file', like 'entry file' in
  build command and 'vite root path' need the logic in this function.
*/
export async function findPathOrExit(
  specificPath: string | undefined,
  defaultPaths: string[],
  notFoundMessage: string,
): Promise<string> {
  // TODO 也许可以在这里校验是否存在
  // 但是不应该在这里做太多事情，也许用户有其他 hack 将失效？？
  if (specificPath) {
    return specificPath;
  }

  let res: string | undefined = specificPath;

  for (const defaultPlace of defaultPaths) {
    const entry = path.join(process.cwd(), defaultPlace);
    if (await exists(entry)) {
      res = entry;
      break;
    }
  }

  if (!res) {
    console.error(notFoundMessage);
    process.exit();
  }

  return res;
}
