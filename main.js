const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'renderer/dashboard.html'));
});

const { fork } = require('child_process');

app.on('ready', () => {
    const backend = fork(path.join(__dirname, 'backend/server.js'));

    backend.on('message', (msg) => {
        console.log('Mensagem do backend:', msg);
    });

    backend.on('exit', (code) => {
        console.log(`Backend finalizado com código ${code}`);
    });
});