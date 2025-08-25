export function repeatString(char: string, len: number): string {
  return Array(len).fill(char).join('');
}
