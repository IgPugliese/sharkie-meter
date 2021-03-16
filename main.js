const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain
const Menu = require('electron').Menu
const MenuItem = require('electron').MenuItem
const windowStateKeeper = require('electron-window-state');

let win = null;

function createWindow () {

  let mainWindowState = windowStateKeeper({
    defaultWidth: 240,
    defaultHeight: 240
  });

  win = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x:mainWindowState.x,
    y:mainWindowState.y,
    frame:false,
    resizable:false,
    transparent:true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,

    }
  })
  win.loadFile('index.html')
  win.setMenu(null);
  win.setSkipTaskbar(true);
  win.isMenuBarVisible(false);
  mainWindowState.manage(win);

}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  createWindow()
});


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

const close = new MenuItem({
  label: 'kill sharkie :(',
  click: () => {
    app.quit()
  }
})

menu.append(bigMenuItem)
menu.append(mediumMenuItem)
menu.append(smallMenuItem)
menu.append(close)

function resizeWindow(size) {
  win.setResizable(true);
  win.setSize(size, size);
  win.setResizable(false);
}

ipc.on('right-click', () => {
  menu.popup(win)
  console.log("coso");
})