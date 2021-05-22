---
sidebar_position: 1
---

# 简介

- 🌈 elecrun 能帮助你快速构建并交付使用最新 JavaScript 标准或 TypeScript 的 Electron 应用。

- 💸 自行搭建技术栈是非常昂贵的，而使用 elecrun 可以让你专注于编写你的业务逻辑，你只需要用你熟悉的 import/export, async/await, **TypeScript** 以及 **任何前端框架**，elecrun 将帮助你将它们转换为 Node.js 和浏览器支持的形式并运行。

- ⚡️ elecrun 是一个命令行工具并提供可编程 API，发挥了 **Vite** 和 **ESBuild** 的出色性能和体验来为你提供 **极速** 的 **热更新** 体验与打包体验。

- 📦 electrun 集成了 monorepo 的仓库管理形式，让你得以用更科学的方式管理你的代码。

- 🛡️ elecrun 对你的项目流程没有侵入性，elecrun 可以很好地与你现有的工作流一起运行，无论你正在使用 create-react-app 还是 vue-cli，你都可以快速地把当前的工作迁移到 electron 上。

- 🔧 即刻将你的网页应用打包成桌面应用。

> [为什么创建 elecrun](#为什么创建-elecrun)? 因为开发环境设置应该是足够简单的, 开发过程应该是足够快速的 !

让我们用 **五分钟快速上手 elecrun**

## 体验

- [TypeScript, React](https://github.com/jctaoo/vite-electron-esbuild-starter)
- [TypeScript, Vue3](https://github.com/jctaoo/electron-vue-starter)



还需要更多模版项目？[告诉我们你想要的模版](https://github.com/jctaoo/electron-run/issues)

## 快速入门 ⏱️

### 创建一个新项目

> 我们将使用最简单直接的方式创建一个新项目

```shell
# 创建项目目录
mkdir my-electron-app && cd my-electron-app
# 初始化项目
yarn init -y
# 安装 electron 和 elecrun 作为依赖
yarn add electron elecrun -D
```

### 编写主进程代码

我们使用 `TypeScript` 来编写样例代码，以向你展示 `elecrun` 的能力。在 index.ts 中书写如下代码

```typescript
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

> 虽然此处我们以 TypeScript 为例子，但在项目中你可以自由的选择 JavaScript 或 TypeScript

### 编写渲染进程代码

我们同样使用 `TypeScript` 编写渲染进程的代码。首先在 index.html 中书写如下代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Electron App</title>
  </head>
  <body>
    <h1>你好世界</h1>
    <script src="app.ts" type="module" />
  </body>
</html>
```

在 app.ts 中书写如下代码

```typescript
alert("👏 欢迎使用 elecrun")
```

### 编辑 package.json

我们将在 package.json 中添加一条名为 dev 的 scripts 指令以使用包管理工具（npm, yarn 等）来运行我们的应用程序

```json
{
  "scripts": {
    "dev": "elecrun --vite"
  }
}
``` 

### 🏃‍♀️ 运行

运行如下命令
```shell
yarn dev
```

![屏幕截图](../../docs/images/screen-shot.webp)

### 代码

你可以在下面的链接中找到这个简易项目的源码

- [TypeScript 版本](https://github.com/jctaoo/electron-run/tree/main/fixtures/demo)
- [JavaScript 版本](https://github.com/jctaoo/electron-run/tree/main/fixtures/simple)

## elecrun 功能

- 渲染进程, 浏览器环境
  - 使用 Vite，支持零配置或自定义配置，理论上支持所有前端框架
  - 支持使用最新的 ECMAScript 标准，JSX 以及 TypeScript / TSX
  - 支持 sass, less 等各种 loader
  - 支持开启或关闭 [Electron contextIsolation](https://www.electronjs.org/docs/tutorial/context-isolation) 以及 [Electron nodeInteration](https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions)
- 主进程, Nodejs 环境
  - 使用 ESBuild，支持零配置或自定义 tsconfig.json 或 jsconfig.json
  - 支持使用最新的 ECMAScript 标准以及 TypeScript
  - 支持 Electron 预加载脚本([参考](https://www.electronjs.org/docs/api/context-bridge#exposing-node-global-symbols))
- 周边功能
  - 提供对外 API，你可以轻松使用 elecrun api 来构建自己的工作流
  - 打包已有的 web 应用到桌面应用
  - 与现有的 web 项目开发流程集成
  - 支持 monorepo 的仓库管理模式
  - 漂亮的终端 UI
  - 打包后的应用加固

## 为什么创建 elecrun

那天，我准备写一个基于 Electron 的程序，正值 Vite Release 的时机，我想要把这个全新的工具集成在新 App 的开发流程里，我翻遍了 GitHub 上的 Vite Electron Starter，没找到我想要的，便着手自己写了一些脚本与配置，终于，我看到了效果，它有着前所未有到速度，着实令我震惊

![第一个版本的效果](../../new-docs/static/img/demo.gif)

如今，现代 Web 开发正飞速发展，我们常常需要一大堆配置来开始我们的新项目，诸如 webpack，rollup，tsconfig，lint 等等。每当我们准备创建一个项目时我们不得不面对这一大堆东西。elecrun 的目标便是为你消除这些烦恼，管理你的项目环境，让一切开箱即用，让你全身心投入到你的项目开发之中。

> 有这么多项目模版可选，为什么我不去用这些项目模版来创建我的项目呢？

起初我使用在项目中编写启动脚本来构造我的工作流，当我要支持的情况越来越多，我意识到无需要一个更 **可扩展** 的方式，这也是为什么会有诸如 create-react-app，vue-cli 等项目。当然，项目模版能够使用，但是烦人的配置和脚本会充斥在仓库中，或许还得手动更新这些配置文件。你可以查看 [elecrun 的功能](#elecrun-功能)，它真的很棒。

> elecrun 和 electron-webpack 有什么区别？

elecrun 和 electron-webpack 的意图很相似，但 electron-webpack 使用 webpack 管理两个进程的代码，elecrun 使用 Vite 和 ESBuild，这比 webpack 有着更高的速度。当然，如果你希望使用 webpack 或集成已有的 webpack 项目，elecrun 也能很好地工作。

除此之外，elecrun 多比 electron-webpack 提供了一些项目流程上的工具，例如创建项目、加固你的项目、更好的终端UI等等，且原生支持 monorepo。如果你只是想使用 webpack，你可以尝试使用 electron-webpack。



