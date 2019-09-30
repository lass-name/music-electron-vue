const { autoUpdater } = require('electron-updater')
const { ipcMain } = require('electron')

let mainWindow = null
const updateHandle = (_window) => {
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用掉就是最新版本，不用更新',
    updated: '安装包已经下载完成'
  }

  mainWindow = _window

  autoUpdater.setFeedURL('http://localhost:3000')
  autoUpdater.autoDownload = false // 取消自动下载更新
  autoUpdater.on('error', (error) => {
    console.log('error=', error)
    sendUpdateMessage(message.error)
  })

  // 当开始检查更新掉时候触发
  autoUpdater.on('checking-for-update', () => {
    sendUpdateMessage(message.checking)
  })

  // 当发现一个可用更新掉时候触发，更新包下载会自动开始
  autoUpdater.on('update-available', (info) => {
    console.log('update-available', info)
    sendUpdateMessage(message.updateAva)
  })

  // 当没有可用更新的时候触发
  autoUpdater.on('update-not-available', () => {
    sendUpdateMessage(message.updateNotAva)
  })

  // 更新下载进程
  autoUpdater.on('download-progress', (progressObject) => {
    mainWindow.webContents.send('downloadProgress', progressObject)
  })

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
    ipcMain.on('isUpdateNow', (e, arg) => {
      console.log('isUpdateNow', e, arg)
      autoUpdater.quitAndInstall()
      sendUpdateMessage('update-downloaded')
    })

    // 发送已经存在安装包的信息
    mainWindow.webContents.send('isUpdateNow')
  })

  // 执行检查更新
  ipcMain.on('checkForUpdate', (event, data) => {
    console.log('checking update', data, event)
    console.log('mainWindow=', mainWindow.webContents)
    // 执行自动检查
    autoUpdater.checkForUpdates()
  })

  // 开始下载
  ipcMain.on('begin-download', (event, arg) => {
    console.log(event, arg)
    autoUpdater.downloadUpdate()
  })
}

const sendUpdateMessage = (text) => {
  mainWindow.webContents.send('message', text)
}

export default updateHandle
