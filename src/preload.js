const { contextBridge, ipcRenderer } = require('electron')

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('api', {
  logMessage: (message) => console.log(message),
  getVersions: () => ({
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron,
  }),
  getAPI: async () => {
    return ipcRenderer.invoke('fetch-api-data')
  }
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }

    console.log('Preload script loaded');
  })