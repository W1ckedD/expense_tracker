const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL('http://localhost:5000');

}


ipcMain.on('test-connection', (e, data) => {
    console.log(data);
    e.reply('test-result', 'connected');
})

app.on('ready', createWindow);