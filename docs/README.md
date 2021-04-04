**electron-run** is a tool to run your electron app easily.

[![CI](https://github.com/jctaoo/electron-run/actions/workflows/CI.yml/badge.svg)](https://github.com/jctaoo/electron-run/actions/workflows/CI.yml)

## Quick Start

### Installation

- Globally install

```shell
# using npm
npm install -g electron-run
# using yarn
yarn global add electron-run 
```

- Install as devDependencies

```shell
# using npm
npm install electron-run --save-dev 
# using yarn
yarn global add electron-run --dev
```

### Create electron app

> Assuming you use yarn.

- Start a new project

```shell
# create project directory
mkdir my-electron-app && cd my-electron-app
# initialize your project
yarn init -y
# install electron as dependencies
yarn add electron
```

- Write your `main process` code in `TypeScript`

```ts
import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL('http://localhost:3000');
}

createWindow();
```

> For more information about electron, see [electron doc](https://www.electronjs.org/docs)

- Write your `renderer process` code in `TypeScript`.

> Actually, you can use any front-end framework here. In a simple project, let's use native javascript.

index.html

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta http-equiv='Content-Security-Policy'
        content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';">
  <title>Title</title>
</head>
<body>
<div id='body'>
  <h1>Hello World</h1>
  <h5 class='label'>0</h5>
  <button class='add-btn'>+1</button>
</div>
<script src='./app.ts' type='module'></script>
</body>
</html>
```

- Add a script in `package.josn`.

app.ts

```typescript
window.onload = () => {
  let count = 0;

  const counterLabel = document.querySelector(".label")!;
  const btn = document.querySelector(".add-btn")!;

  btn.addEventListener('click', () => {
    count += 1;
    counterLabel.textContent = `updated ${count}`;
  });
}

```

```json
{
  "scripts": {
    "dev": "elecrun --vite"
  }
}
```
