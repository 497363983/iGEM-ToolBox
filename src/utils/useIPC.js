import {
  ref
} from 'vue'
import { ElMessage } from 'element-plus';
const electron = window.require('electron');
const {
  ipcRenderer
} = electron;
import { useConfigStore } from '@/store';

export function closeMain() {
  // console.log(ipcRenderer);
  ipcRenderer.send('mainWindow:close')
}

export function maximize() {
  // console.log(ipcRenderer);
  ipcRenderer.send('mainWindow:maximize')
}

export function unmaximize() {
  // console.log(ipcRenderer);
  ipcRenderer.send('mainWindow:unmaximize')
}

export function minimize() {
  // console.log(ipcRenderer);
  ipcRenderer.send('mainWindow:minimize')
}

export function closeRemind() {
  ipcRenderer.send('remindWindow:close');
}

export function setRemindMsg() {
  const remindMsg = ref('');
  ipcRenderer.on('setTask', (event, task) => {
    remindMsg.value = decodeURIComponent(task);
  });
  return remindMsg;
}

/**
 * 
 * @param {String} src 
 * @param {Object} options 
 * @param {Function} callback 
 */
export function runPythonByMain(src, options, callback) {

  ipcRenderer.send('runPython', {
    src,
    options
  });
  ipcRenderer.once('PythonReturn', (event, arg) => {
    const {
      err,
      results
    } = arg;
    if (callback && typeof callback === "function") {
      callback(err, results);
    }
  });
}

export function getDirName() {
  ipcRenderer.send('getDirName');
  ipcRenderer.once('getDirNameReply', (event, arg) => {
    arg
  });
}
/**
 * 
 * @param {Object} filelist 
 * @param {String} username 
 * @param {String} password 
 * @param {String|Number} teamID 
 */
export function SyncFiles(filelist, username, password, teamID) {
  ipcRenderer.send("SyncFiles", { filelist, username, password, teamID });

}

export function SyncFiles_return(callback) {
  //upload successful
  ipcRenderer.on('SyncFiles:return', (event, data) => {
    
    callback && typeof callback ? callback(data): console.log('SyncFiles return:', data)
  });
  //upload failed
  ipcRenderer.on('SyncFiles:error', (event, msg) => {
    console.log('SyncFiles error:', msg)
    ElMessage({
      type: "error",
      message: msg
    })
  });
}


export function getInstallationPath() {
  ipcRenderer.send("getInstallationPath");
  ipcRenderer.once('getInstallationPathReply', (event, arg) => {
    useConfigStore().installationPath = arg;
  });
}



/**
 * 
 * @param {import('electron').OpenDialogOptions} option 
 * @param {Function} callback 
 */
export function openFileDialog(option, callback) {
  ipcRenderer.send("openFileDialog", option);
  ipcRenderer.once("openFileDialogReturn", (event, { canceled, filePaths }) => {
    if (callback && typeof callback == 'function') {
      callback({ canceled, filePaths })
    }
  })
}

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {Function} callback 
 */
export function checkCookie(username, password, callback) {
  ipcRenderer.send("checkCookie", { username, password });
  ipcRenderer.once("checkCookieReturn", (event, res) => {
    if (callback && typeof callback == "function") {
      callback(res)
    }
  })
}


export function openLink(url) {
  ipcRenderer.send("open-link", url);
}