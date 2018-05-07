// import { BrowserWindow } from 'electron'

const {BrowserWindow, shell} = require('electron')
// const Menu = electron.Menu;

const appMenu = [
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      }, {
        label: '重做',
        accelerator: 'CmdOrCtrl+Shift+Z',
        role: 'redo'
      }, {
        type: 'separator'
      }, {
        label: '剪贴',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      }, {
        label: '拷贝',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      }, {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }, {
        label: '删除',
        accelerator: '',
        role: 'delete'
      }, {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
        // }, { type:'separator' },{ label: '开始听写…', accelerator: 'fnfn', role:
        // 'startspeaking' }, { label: '表情与符号', accelerator: '^+CmdOrCtrl+Space', role:
        // ''
      }
    ]
  }, {
    label: '控制',
    submenu: [
      {
        label: '播放',
        accelerator: 'Space',
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send('triggerPlay')
        }
      }, {
        label: '下一首',
        accelerator: 'CmdOrCtrl+Right',
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send('nextMusic')
        }
      }, {
        label: '上一首',
        accelerator: 'CmdOrCtrl+Left',
        // role: '',
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send('prevMusic')
        }
      }, {
        label: '升高音量',
        accelerator: 'CmdOrCtrl+Up',
        // role: '',
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send('volumeUp')
        }
      }, {
        label: '降低音量',
        accelerator: 'CmdOrCtrl+Down',
        // role: '',
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send('volumeDown')
        }
      }, {
        label: '喜欢歌曲',
        accelerator: 'CmdOrCtrl+L',
        enabled: false
      }, {
        label: '循环播放',
        accelerator: '',
        // role: '',
        submenu: [
          {
            label: '单曲',
            type: 'radio',
            checked: true
          }, {
            label: '全部',
            type: 'radio'
          }
        ]
      }, {
        label: '随机播放',
        accelerator: ''
        // role: ''
      }, {
        label: '打开/关闭歌词',
        accelerator: 'CmdOrCtrl+R'
        // role: ''
      }
    ]
  }, {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      }, {
        label: '关闭窗口',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }, {
        label: '缩放',
        accelerator: '',
        role: 'zoom',
        enabled: false
      }, {
        label: '进入全屏幕',
        accelerator: '',
        role: 'togglefullscreen'
      }, {
        type: 'separator'
      }, {
        label: '切换至迷你模式',
        accelerator: 'Ctrl+CmdOrCtrl+M',
        role: '',
        click: () => {}
      }, {
        type: 'separator'
      }, {
        label: '前置全部窗口',
        accelerator: '',
        role: 'forcereload'
      // }, { type: 'separator' }, { label: '网易云音乐', accelerator: '', role: ''
      }
    ]
  }, {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '服务条款',
        accelerator: '',
        role: '',
        click: () => {
          shell.openExternal('http://music.163.com/html/web2/service.html')
        }
      }, {
        label: '打开/关闭工具栏',
        role: 'toggledevtools'
      }
    ]
  }
]
// appMenu[2].submenu = [{role: 'front'}]
if (process.platform === 'darwin') {
  // const name = electron.app.getName();
  appMenu.unshift({
    label: '网易云音乐',
    submenu: [
      {
        label: '关于网易云音乐',
        role: 'about'
        // click: () => {
        //   console.log('about')
        //   dialog.showMessageBox({
        //     title: '网易',
        //     message: '网易云音乐',
        //     detail: `网易云音乐服务条款\n\n
        //     【注意】欢迎使用网易公司为您提供的网易云音乐软件或服务。请您（下列简称为“用户”）仔细阅读以下全部内容（特别是粗体下划线标注的内容）。未成年人则应在法定监护人陪同下阅读。如用户使用网易云音乐软件或服务，即表示用户与网易公司已达成协议，自愿接受本服务条款所有内容。此后，用户不得以未阅读本服务条款内容作任何形式的抗辩。
        //     1、服务条款的确认和接纳
        //     本条款是用户与网易公司之间关于用户使用网易云音乐软件或服务的条款，内容包括条款正文、网易公司已经发布的或将来可能发布的各类规则。所有规则为本条款不可分割的组成部分，与条款正文具有同等法律效力。除另行明确声明外，用户使用网易云音乐软件或服务的行为将受本条款约束。
        //     `
        //   })
        // }
      }, {
        type: 'separator'
      }, {
        label: '偏好设置…',
        accelerator: 'CmdOrCtrl+,'
        // role: 'services'
      }, {
        type: 'separator'
      }, {
        label: '服务',
        role: 'services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: '隐藏 网易云音乐',
        accelerator: 'CmdOrCtrl+H',
        role: 'hide'
      }, {
        label: '隐藏其他',
        accelerator: 'Option+CmdOrCtrl+H',
        role: 'hideothers'
      }, {
        label: '全部显示',
        accelerator: '',
        role: 'unhide'
      }, {
        type: 'separator'
      }, {
        label: '自定义 Mutil-Touch Bar…',
        accelerator: '',
        role: ''
      }, {
        label: '退出 网易云音乐',
        accelerator: 'CmdOrCtrl+Q',
        role: 'quit',
        click: () => {}
      }
    ]
  })
}

exports.menus = appMenu
