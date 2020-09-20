const { app, BrowserWindow, ipcMain } = require('electron');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDB = require('./config/db');
connectDB();

const userFunctions = require('./functions/user');
const transactionFunctions = require('./functions/transaction');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 900,
        width: 1400,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL('http://localhost:5000');
}

ipcMain.on('login', userFunctions.login);
ipcMain.on('register', userFunctions.register);
ipcMain.on('get-user', userFunctions.getUser);

ipcMain.on('get-user-transactions', transactionFunctions.getUserTransactions);
ipcMain.on(
    'get-user-transactions-by-date',
    transactionFunctions.getUserTransactionsByDate
);
ipcMain.on(
    'transaction-advanced-search',
    transactionFunctions.transactionAdvancedSearch
);
ipcMain.on('add-transaction', transactionFunctions.addTransaction);
ipcMain.on('delete-transaction', transactionFunctions.deleteTransaction);

app.on('ready', createWindow);
