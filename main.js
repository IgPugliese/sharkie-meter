const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain
const Menu = require('electron').Menu
const MenuItem = require('electron').MenuItem
const windowStateKeeper = require('electron-window-state');
const AutoLaunch = require('auto-launch');


let win = null;
app.disableHardwareAcceleration();
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
  setTimeout(createWindow,300)
});


let menu = new Menu()
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

let  autolaunchConfig = {
  name: "sharke-meter"
}

if(process.env.APPIMAGE){
  autolaunchConfig = {...autolaunchConfig, path:process.env.APPIMAGE}
}
const autoLauncher = new AutoLaunch(autolaunchConfig);

const disableAutolaunchLabel = "I'm awfull and i dont want to se sharkie again"
const endableAutolaunchLabel = "I really love sharkie and I want it on my pc every time it starts"

const autolaunchMenuItem = (isEnabled) => new MenuItem({
  label: isEnabled? disableAutolaunchLabel : endableAutolaunchLabel,
  role:'autolaunch',
  click: () => {
    if(isEnabled){
      autoLauncher.disable()
    }else{
      autoLauncher.enable();
    }
    updateAutolaunchMenuOptionTo(!isEnabled)
  }
})

populateMenuWithEverithingButTheAutolaunch(menu);
addAutolaunchMenuOptionCheckingSystem();

ipc.on('right-click', () => {
  menu.popup(win)
})

function populateMenuWithEverithingButTheAutolaunch(menu){
  menu.append(bigMenuItem);
  menu.append(mediumMenuItem);
  menu.append(smallMenuItem);
  menu.append(close);
}

function addAutolaunchMenuOptionCheckingSystem(){
  autoLauncher.isEnabled().then((isEnabled)=>{
    addAutolaunchMenuOption(isEnabled)
  })
}

function addAutolaunchMenuOption(isEnabled){
  const autolaunchItem = autolaunchMenuItem(isEnabled)
  menu.append(autolaunchItem)
}

//since electron menu is not dinamic the menu is fully regenerated
function updateAutolaunchMenuOptionTo(isEndabled){
  menu = new Menu()
  populateMenuWithEverithingButTheAutolaunch(menu)
  addAutolaunchMenuOption(isEndabled)
}

function resizeWindow(size) {
  win.setResizable(true);
  win.setSize(size, size);
  win.setResizable(false);
}


