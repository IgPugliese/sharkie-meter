const { app, BrowserWindow } = require('electron')
let win = null;

function createWindow () {
  win = new BrowserWindow({
    width: 240,
    height: 240,
    frame:false,
    resizable:false,
    transparent:true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,

    }
  })
  //win.webContents.openDevTools()
  win.loadFile('index.html')
  win.setMenu(null);
  win.setSkipTaskbar(true);
  win.isMenuBarVisible(false);

}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  createWindow()
});


const Menu = require('electron').Menu
const MenuItem = require('electron').MenuItem


const menu = new Menu()
const bigMenuItem = new MenuItem({
  label: 'Big sharkie',
  click: () => {
    resizeWindow(240);
  }
})

const mediumMenuItem = new MenuItem({
  label: 'Medium sharkie',
  click: () => {
    resizeWindow(140);
  }
})

const smallMenuItem = new MenuItem({
  label: 'Small sharkie',
  click: () => {
    resizeWindow(80);
  }
})


menu.append(bigMenuItem)
menu.append(mediumMenuItem)
menu.append(smallMenuItem)


function resizeWindow(size) {
  win.setResizable(true);
  win.setSize(size, size);
  win.setResizable(false);
}

const ipc = require('electron').ipcMain

ipc.on('right-click', () => {
  menu.popup(win)
  console.log("coso");
})