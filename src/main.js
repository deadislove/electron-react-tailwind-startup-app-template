// main.js
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? './.env.production' : './.env.development'
});

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const isDev = process.env.NODE_ENV === 'production' ? false : true

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      //allowRunningInsecureContent: true,
      nodeIntegration: false,     // Prevent Node.js integration in the renderer
      contextIsolation: true,     // Required for secure preload scripts
      enableRemoteModule: false,  // Disable remote module for security
      webSecurity: true,           // Enforce security policies (CSP)
      devTools: isDev
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('src/index.html')
  // Load the React app
  if(isDev) {
    mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`);
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }

  // fetch API data
  ipcMain.handle('fetch-api-data', async () => {
    const apiData = {
      url: process.env.API_URL,
      auth: process.env.AUTH_ENDPOINT,
      secret: process.env.SECRET_HEADER
    }
    return JSON.stringify(apiData)
  })

  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.