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

app.on("before-quit", () => {
  console.log("before-quit signal received");
});


app.whenReady().then(createWindow);
