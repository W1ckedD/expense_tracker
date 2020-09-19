const { app, BrowserWindow, ipcMain } = require('electron');
const connectDB = require('./config/db');
connectDB();

const userFunctions = require('./functions/user');
const transactionFunctions = require('./functions/transaction');

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
ipcMain.on('get-user', userFunctions.getUser);

ipcMain.on('get-user-transactions', transactionFunctions.getUserTransactions);
ipcMain.on('add-transaction', transactionFunctions.addTransaction);

app.on('ready', createWindow);