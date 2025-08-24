import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(createWindow);
