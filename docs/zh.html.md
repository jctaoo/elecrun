**elecrun** 是一个简单快速地运行你的 electron app 的工具。

[![CI](https://github.com/jctaoo/elecrun/actions/workflows/CI.yml/badge.svg)](https://github.com/jctaoo/elecrun/actions/workflows/CI.yml)

## 特征

- 在 [Node.js](https://nodejs.org/zh-cn/) 里编写 JavaScript, [TypeScript](https://www.typescriptlang.org/) 而不需要任何配置

- 让 [Electron](https://www.electronjs.org/) 与任何前端框架一起工作

- 使用 [esbuild](https://esbuild.github.io/) 转换主进程代码,非常快 ⚡️

- 在渲染进程中使用 [vite](https://cn.vitejs.dev/)

## 快速开始

### 安装

- 全局安装

```shell
# using npm
npm install -g elecrun
# using yarn
yarn global add elecrun
```

- 安装到 `开发时依赖` (即项目依赖)

```shell
# using npm
npm install elecrun --save-dev
# using yarn
yarn global add elecrun --dev
```

### 创建并运行 Electron 应用

#### 开始一个新的项目

```shell
# 创建项目目录
mkdir my-electron-app && cd my-electron-app
# 初始化项目
yarn init -y
# 安装 electron 作为依赖
yarn add electron -D
```

#### 使用 `TypeScript` 编写 `主线程` 代码 (JavaScript 也可以)

index.ts

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

> 对于更多的 electron 的细节, 查看 [electron doc](https://www.electronjs.org/docs)

#### 使用 `TypeScript` 编写 `渲染进程` 代码

> 事实上, 你可以使用任何受 `vite` 支持的前端框架. 不过对于目前来说, 让我们使用一个简单的 html 文件.

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Electron App</title>
  </head>
  <body>
    <h1>你好世界</h1>
  </body>
</html>
```

#### 在 `package.json` 中添加一条命令

```json
{
  "scripts": {
    "dev": "elecrun --vite"
  }
}
```

> `elecrun` 是 `elecrun` 的别名

#### ⚡️ 开始运行您的 Electron 程序

```shell
yarn dev
```

<center> <br><img width="500px" src="images/screen-shot.webp"> <br> <div style="color:orange; border-bottom: 1px solid #d9d9d9; display: inline-block; color: #999; padding: 2px;">截图</div> <br></center>

#### 源代码

- https://github.com/jctaoo/elecrun/tree/main/fixtures/demo
- https://github.com/jctaoo/elecrun/tree/main/fixtures/simple

## 工作原理

### 渲染进程

`elecrun` 使用 `vite` 来处理渲染进程代码

`root directory` 里的 `index.html` 为渲染进程的入口(你可以指定 root directory 路径, 详见 [选项 --vite [renderer root]](#选项---vite-renderer-root)), 同时 vite 使用 [esm](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules) 来组织渲染进程的代码

vite 提供一个支持模块热更新的开发服务器. 这意味着任何渲染进程的代码改变都会实时显示在界面中

> 来自 vite 官方文档: 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。

对于更多 vite 的信息, 查看 [vite 官方网站](https://cn.vitejs.dev)

### 主进程

`elecrun` 使用 `esbuild` 来转换也许不能被 nodejs 直接执行的代码 (比如 TypeScript 或者现代的 JavaScript 语法) 到可以被 nodejs 处理的目标代码. 除此之外, elecrun 还会将目标代码打包 (bundle) 进一个文件.

当您运行 `elecrun dev`, `elecrun` 会尝试寻找并读取入口文件(你可以指定入口文件路径, 详见 [开发阶段](#开发阶段))并将其作为主进程的入口文件并尝试静态分析它来转换您的代码, 然后, 转换后的代码会存储在 `node_modules/.elecrun` (这里有一个例外, see [options --preload](#选项---preload-file)). 代码被转换后, `elecrun` 会执行 `electron` 命令行工具来运行您的应用程序.

当您在主进程的代码被改变, `elecrun` 询问您是否要重新执行您的程序, 这在您不想打断当前的调试的情况很有用.

## 指引

### 开发阶段

运行

```shell
elecrun dev --vite
# or
elecrun --vite
```

dev 命令的完整版本是 `elecrun [file-entry] [参数列表]`, 唯一的参数是 `file-entry`, 该参数代表了主线程的入口脚本路径. 您可以指定该参数, 若未指定, `elecrun` 会自动在以下列表依次寻找入口脚本路径:

- ./src/main/index.js
- ./src/main/index.ts
- ./src/index.js
- ./src/index.ts
- ./index.js
- ./index.ts

例子:
```shell
elecrun dev ./main.ts
```

#### 选项 `--vite [renderer root]`

`--vite` 选项一位置与 `elecrun` 一起运行 vite 服务器. 如果您不想这样, 只需去掉该选项即可.

`renderer root` 代表 vite 的 root directory, 您可以指定该参数, 若未指定, `elecrun` 会自动在以下列表依次寻找 root directory:

- ./src/renderer/
- ./src/
- ./

例子:

```shell
elecrun dev --vite ./src
```

#### 选项 `--preload <file>`

当您开启 `contextIsolation`, 可能会需要 `预加载脚本` (可以在 [BrowserWindow 的选项](https://www.electronjs.org/docs/api/browser-window#browserwindow) 找到). 但是 Electron 使用一个字符串变量来加载您的 `预加载脚本`, 这使得 `esbuild` 无法静态分析 `预加载脚本` 的位置也无法打包它. 解决方案是提供 `--preload` 选项来指定 `预加载脚本` 的路径, 然后, `elecrun` 会转换该脚本并把结果保存在与打包后的代码(bundled code)同样的目录下.

`<file>` 参数应该被设置为预加载脚本的路径, 且该路径相对于 `src/main`, 例如有如下文件结构:

```
+-src
|--+-main
|  |---index.ts
|  |---preaload.ts
|--+-renderer
|  |---index.html
|--package.json
```

运行如下命令即可

```shell
elecrun --vite --preload preload.ts
```

#### 选项 `--clean-cache`

`dev` 命令会存一些打包产物在 `node_modules/.elecrun/app` 下, 这条命令帮助你在开始 `dev` 前清除掉这些缓存.

#### 选项 `--esm`

`--esm` 选项用于指定是否使用 ESM 模块来运行主进程代码. 默认情况下, `elecrun` 会使用 `commonjs` 模块来运行主进程代码. 如果您想使用 ESM 模块, 只需添加该选项即可.

> 有一些第三方库仅仅支持 `esm` 模块, 使用这样的第三方库时, 您可能需要添加该选项.

```shell

### 编译阶段

编译阶段基本与开发阶段相同(包括除了`--vite`之外的所有参数或选项), 但区别在于开发阶段的代码会存储在 `node_modules`, 而编译阶段则会存储在 app 目录下.

### 清理输出

运行 `elecrun clean` 来清理 `elecrun` 产生的输出
