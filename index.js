const { app, BrowserWindow, ipcMain } = require('electron');
const connectDB = require('./config/db');
connectDB();

const userFunctions = require('./functions/user');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL('http://localhost:5000');
}

ipcMain.on('login', userFunctions.login);
ipcMain.on('register', userFunctions.register);

app.on('ready', createWindow);