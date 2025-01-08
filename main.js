const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path')
const fs = require('fs')

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

    //mainWindow.loadURL("https://neal.fun/stimulation-clicker/")
    mainWindow.loadFile('front/main.html')

}

app.whenReady().then(() => {
    createWindow();
})

ipcMain.on('hello', () => {

    console.log("hello i'm back-end");

})


let myPass = 'JeSuisUnPass';

ipcMain.on('getMyVariable', (event, username) => {

    console.log('Demande prise en compte pour ' + username)

    event.sender.send('HavePass', myPass)

    if (!fs.existsSync(path.join(app.getPath('appData') + '/.myFirstApp'))){

        fs.mkdir(path.join(app.getPath('appData') + '/.myFirstApp'), (err) =>{
            if (err) throw err;
        })

    }

    fs.appendFile(path.join(app.getPath('appData') + '/.myFirstApp/pass.txt'), myPass, (err) => {
        if (err) throw err;
    })

    fs.readFile(path.join(app.getPath('appData') + '/.myFirstApp/pass.txt'), 'utf8', (err, data) => {
        if (err) throw err;
        console.log('data = ' + data)
    })
})
