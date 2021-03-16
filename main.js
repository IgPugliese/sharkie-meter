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
      nodeIntegration: true
    }
  })

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

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {

  }
})


app.on('ready', function () {
  setTimeout(function() {
      createWindow();
  },300);
});

