import { ChildProcess } from 'child_process';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 优雅终止子进程（先 SIGTERM，再等，最后 SIGKILL）
export async function terminateChild(cp: ChildProcess, { waitMs = 5000 } = {}) {
  if (!cp || cp.killed) return;
  try {
    cp.kill('SIGTERM');
  } catch {
    // ignore
  }
  const exited = new Promise<void>((resolve) => {
    const done = () => resolve();
    cp.once('exit', done);
    cp.once('close', done);
  });
  const timed = Promise.race([exited, delay(waitMs)]);
  await timed;
  if (!cp.killed) {
    try {
      cp.kill('SIGKILL');
    } catch {
      // ignore
    }
  }
}
