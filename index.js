const { app, BrowserWindow, ipcMain } = require('electron');
const connectDB = require('./config/db');
connectDB();

const profileFuncs = require('./funcs/profile');

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


ipcMain.on('create-profile', profileFuncs.createProfile);
ipcMain.on('get-all-profiles', profileFuncs.getAllProfiles);
ipcMain.on('select-profile', profileFuncs.selectProfile);

app.on('ready', createWindow);