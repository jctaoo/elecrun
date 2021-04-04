import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL('http://localhost:3000');
}

createWindow();
