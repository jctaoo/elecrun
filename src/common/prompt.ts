import readline from 'readline';

import { green } from 'colorette';

export function prompt(question: string): [() => Promise<boolean>, () => void] {
  const input = process.stdin;
  const output = process.stdout;

  const rl = readline.createInterface({
    input,
    output,
  });

  const questionAndPrompt = `${green('?')} ${question} (Y/n) `;

  let answerResolve: (answer: boolean) => void = () => {};
  const answerPromise = new Promise<boolean>((r) => {
    answerResolve = r;
  });

  rl.question(questionAndPrompt, (answer) => {
    answerResolve(answer === 'Y' || answer == 'y');
    rl.close();
  });

  return [
    () => answerPromise,
    () => {
      console.log('');
      rl.close();
    },
  ];
}
