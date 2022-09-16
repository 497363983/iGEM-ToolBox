import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib';
import {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  shell
  // screen
} from 'electron';
import runPython from './utils/runPython';
const fs = require('fs');
const Store = require('electron-store');
const axios = require('axios')
const https = require('https');
const FormData = require('form-data');
// const simpleGit = require('simple-git');

Store.initRenderer();
// import installExtension, {
//   VUEJS3_DEVTOOLS
// } from 'electron-devtools-installer'
// const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const iconPath = path.join(__static, 'icon.png');
// const {
//   PythonShell
// } = require('python-shell');
let mainWindow, tray;
// Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([{
//   scheme: 'app',
//   privileges: {
//     secure: true,
//     standard: true
//   }
// }])

// async function createWindow() {
//   // Create the browser window.
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {

//       // Use pluginOptions.nodeIntegration, leave this alone
//       // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
//       nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
//       contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
//     }
//   })

// if (process.env.WEBPACK_DEV_SERVER_URL) {
//   // Load the url of the dev server if in development mode
//   await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
//   if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
// } else {
//   createProtocol('app')
//   // Load the index.html when not in development
//   win.loadURL('app://./main.html')
// }
// }

app.on('web-contents-created', (e, webContents) => {
  webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    // createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    frame: true,
    width: 1000,
    height: 700,
    minHeight: 450,
    icon: iconPath,
    webPreferences: {
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      backgroundThrottling: false,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/index.html');
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    mainWindow.loadURL(`file://${__dirname}/index.html`);
  }
  if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  mainWindow.removeMenu();
  setTray();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // createWindow();
  }
});

ipcMain.on('mainWindow:close', (e) => {
  mainWindow.hide();
});
ipcMain.on('mainWindow:maximize', (e) => {
  mainWindow.maximize();
});
ipcMain.on('mainWindow:unmaximize', (e) => {
  mainWindow.unmaximize();
});
ipcMain.on('mainWindow:minimize', (e) => {
  mainWindow.minimize();
});
ipcMain.on('SyncFiles', (event,filelist,username,password) => {
  // event.sender.send("SyncFiles:return",cookie)
  SyncFiles(filelist , username , password)
  // event.sender.send("SyncFiles:return",filelist[0])
  //The main function use for SyncFiles
  async function SyncFiles(filelist, username, password) {
    //Fetch cookie
    let cookie = await get_cookie(username, password)
    event.sender.send("SyncFiles:return",cookie)
    if (cookie == null) {
        return null;
    }
    //URL_list
    let URL_list = []
    //Upload each file
    for (let i = 0; i < filelist.length; i++) {
        console.log(filelist[i])
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filelist[i]["filepath"]));
        formData.append('directory', filelist[i]["type"]);
        URL_list.push(await SyncFile(cookie, formData))
    }
    event.sender.send("SyncFiles:return",URL_list)
    return URL_list;
  }

//Fetch cookie
function get_cookie(username, password) {
  return new Promise((resolve) => {
      const data = 'return_to=https%3A%2F%2Fold.igem.org%2FLogin2&username=' + username + '&password=' + password + '&Login=Login'
      console.log(data)
      const options = {
          hostname: 'old.igem.org',
          port: 443,
          path: '/Login2',
          
          method: 'POST',
          headers: {
              'Content-Length': data.length,
              "Content-Type": "application/x-www-form-urlencoded",
          }
      }
      const req = https.request(options, (res) => {
          console.log("get cookie status:")
          // console.log(res)
          console.log(res.statusCode)
          if (res.statusCode != 302) {
              console.log("get cookie error!")
              resolve(null);
          }
          let cookie = res.rawHeaders[9]
          console.log(cookie)
          resolve(cookie);
      });
      req.on('error', (error) => {
          console.error(error)
      })
      req.write(data)
      req.end()
      
      // event.sender.send("SyncFiles:return",data)
      // axios({
      //     url: 'https://old.igem.org/Login2',
      //     method: 'POST',
      //     maxRedirects: 0,
      //     data: data ,
      //     headers: {
      //         'Content-Length': data.length,
      //         // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 ',
      //         // 'cookie': cookie
      //     }
      // }).then((resp) => {
      //   // event.sender.send("SyncFiles:return",resp)

      //     console.log(resp)
      //     // console.log(resp.headers)
      //     // return resp.data["location"];
      // }).catch((error) => {
      //   event.sender.send("SyncFiles:return",error)
    
      //   return null;
      // });
  }).catch((error) => {
    event.sender.send("SyncFiles:return",error)

    return null;
  });
}


//Sync each file after fetch the cookie
async function SyncFile(cookie, formData) {
  const res = await axios({
      url: 'https://shim-s3.igem.org/v1/teams/4227/wiki',
      method: 'POST',
      data: formData,
      headers: {
          "Content-Type": "image/png",
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 ',
          'cookie': cookie
      }
  });
  console.log("uplod status:")
  console.log(res.status)
  return res.data["location"];
}
});
ipcMain.on('readJSONFile', function (event, arg) {
  // arg是从渲染进程返回来的数据
  console.log(arg);

  // 这里是传给渲染进程的数据
  fs.readFile(arg, "utf8", (err, data) => {
    if (err) {
      event.sender.send('readJSONFile-reply', err);
    } else {
      event.sender.send('readJSONFile-reply', data);
    }

  });
});

ipcMain.on('writeJSONFile', function (event, arg) {
  fs.writeFile(arg.file, arg.data, (err, data) => {
    if (err) {
      event.sender.send('writeJSONFile-reply', err);
    } else {
      event.sender.send('writeJSONFile-reply', data);
    }

  });
});

function setTray() {
  tray = new Tray(iconPath);
  tray.setToolTip('IWS');
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
  tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([{
      label: 'Quit',
      click: () => app.quit()
    }]);
    tray.popUpContextMenu(menuConfig);
  });

}

// Exit cleanly on request from parent process in development mode.
// if (isDevelopment) {
//   if (process.platform === 'win32') {
//     process.on('message', (data) => {
//       if (data === 'graceful-exit') {
//         app.quit()
//       }
//     })
//   } else {
//     process.on('SIGTERM', () => {
//       app.quit()
//     })
//   }
// }

ipcMain.on('show-context-menu', (event) => {
  const template = [{
    label: 'Menu Item 1',
    click: () => {
      event.sender.send('context-menu-command', 'menu-item-1');
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Menu Item 2',
    type: 'checkbox',
    checked: true
  }
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup(BrowserWindow.fromWebContents(event.sender));
});

ipcMain.on('runPython', (event, arg) => {
  const {
    src,
    options
  } = arg;
  runPython(src, options, function (err, results) {
    event.reply('PythonReturn', {
      err,
      results
    });
  });
});

// ipcMain.handle('git', async function (e, { projectPath, cmd, args }) {
//   const git = simpleGit(projectPath);
//   try {
//     const res = await git[cmd](...args);
//     return res;
//   } catch (e) {
//     console.error('执行 simple-git 命令时发生错误', { projectPath, cmd, args }, e);
//     throw e;
//   }
// });
//
//