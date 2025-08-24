import fs from 'fs';

export async function readJson(path: fs.PathLike) {
  const content = await fs.promises.readFile(path, 'utf-8');
  return JSON.parse(content);
}
