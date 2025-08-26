import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL('http://localhost:5173');
}

// listen to exit signal
process.on('exit', () => {
  console.log('exit signal received');
});

// 监听 SIGTERM 信号 (来自 process.kill)
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// 监听 SIGINT 信号 (来自 Ctrl+C)
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

app.whenReady().then(createWindow);
