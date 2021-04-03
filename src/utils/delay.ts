export function delay(duration: number): Promise<void> {
  return new Promise((r) => {
    setTimeout(() => {
      r();
    }, duration);
  });
}
