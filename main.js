const { app, BrowserWindow } = require("electron");
const path = require('path')

let mainWindow;

function createWindow () {

    mainWindow = new BrowserWindow({
        frame: true,
        title:'My app',
        width: 1318,
        height: 710,
        resizable: true,
        minWidth: 577,
        minHeight: 609,
        //icon: path.join(__dirname, 'assets/logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'front/preload.js'),
            webSecurity: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    mainWindow.setMenuBarVisibility(false);

    //mainWindow.loadURL("https://gamenium.fr ")
    mainWindow.loadFile('front/main.html')

}

app.whenReady().then(() => {
    createWindow();
})