**electron-run** is a tool to run your electron app easily.

[![CI](https://github.com/jctaoo/electron-run/actions/workflows/CI.yml/badge.svg)](https://github.com/jctaoo/electron-run/actions/workflows/CI.yml)

## Features

- Write [TypeScript](https://www.typescriptlang.org/) in [Node.js](https://nodejs.org/en/) with no config (No config file such as tsconfig.json, webpack.config.js and rollup.config.js).

- Let [Electron](https://www.electronjs.org/) work with any front-end framework.

- Using [esbuild](https://esbuild.github.io/) to transform your main process code, It's very fast ⚡️.

- Using [vite](https://vitejs.dev/) in renderer process.

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

### Create & Run electron app

> Assuming you use yarn.

#### Start a new project

```shell
# create project directory
mkdir my-electron-app && cd my-electron-app
# initialize your project
yarn init -y
# install electron as dependencies
yarn add electron
```

#### Write your `main process` code in `TypeScript`

src/main/index.ts
```ts
import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);
```

> For more information about Electron, see [electron doc](https://www.electronjs.org/docs)

#### Write your `renderer process` code in `TypeScript`.

> Actually, you can use any front-end framework supported by `vite` here. In a simple project, let's use a single html file.

src/renderer/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Electron App</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

#### Add a script in `package.json`.

```json
{
  "scripts": {
    "dev": "elecrun --vite"
  }
}
```
> `elecrun` is alias of `electron-run`

#### ⚡️ Start your electron app

```shell
yarn dev
```

<center> <br><img width="500px" src="images/screen-shot.webp"> <br> <div style="color:orange; border-bottom: 1px solid #d9d9d9; display: inline-block; color: #999; padding: 2px;">screen shot</div> <br></center>

#### Source codes

- https://github.com/jctaoo/electron-run/tree/main/fixtures/demo
- https://github.com/jctaoo/electron-run/tree/main/fixtures/simple

## How it works

### File Structure

```
+-src
|--+-main
|  |---index.ts
|--+-renderer
|  |---index.html
|--package.json
```


### Renderer Process

`electron-run` using `vite` to handle code in renderer process located `src/renderer`.

The entry file is `index.html` and vite using [esm](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) to struct your renderer process code.

Vite also provides a dev server support `Hot Module Replacement`. It's means your code changes can always be displayed on the interface.

> From vite official website : A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).

For more information, see [vite official website](https://vitejs.dev)

### Main Process

`electron-run` using `esbuild` to transform your code may cannot directly run in nodejs such as TypeScript and modern JavaScript to the code nodejs can handle. Besides, `electron-run` also bundle your code to one file.

When you run `elecrun dev`, `electron-run` will try to read `src/main/index.ts` as entry file and statically analyze to transform your code, then save the target code to your `node_modules/.electron-run` (there is one exception, see [options --preload](#options---preload-file)). After code transforming is over, `electron-run` will execute `electron` command line tool to start your app.

When your code in `src/main` has been changed, `electron-run` will ask if you want to rerun your app. This is useful when you don’t want to interrupt the current debugging.

## Guide

### development phase
run 
```shell
elecrun dev --vite
# or 
elecrun --vite
```

#### options `--vite`

The option `--vite` means run vite server with `electron-run`. If you don't want using `vite`, just remove this option.

#### options `--preload <file>`

When you enable `contextIsolation`, you may need `preload` (You can find in [BrowserWindow options](https://www.electronjs.org/docs/api/browser-window#browserwindow)). But Electron loads your preload script based on string variable. It's means `esbuild` cannot statically analyze the location of preload script or bundle it. The solution is to provide an option `--preload` to specify location of preload script. Then, `electron-run` just transform it and save preload code's target code in the same path as bundled code.

The parameter `<file>` should be set as preload script path relative to the main src. Example:

```
+-src
|--+-main
|  |---index.ts
|  |---preaload.ts
|--+-renderer
|  |---index.html
|--package.json
```

run 
```shell
elecrun --vite --preload preload.ts
```

### build phase

The build phase is almost the same as the development phase. The difference is that the compiled files are stored in `node_modules` in the development phase, while the build phase is stored in the app directory.

### clean output

run `elecrun clean` to easily clean output by `electron-run`
