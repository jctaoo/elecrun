import readline from 'readline';

import chalk from 'chalk';

export function prompt(question: string): [() => Promise<boolean>, () => void] {
  const input = process.stdin;
  const output = process.stdout;

  const rl = readline.createInterface({
    input,
    output,
  });

  const questionAndPrompt = `${chalk.green`?`} ${question} (Y/n) `;

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
