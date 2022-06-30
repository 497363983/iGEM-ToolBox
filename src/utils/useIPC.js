import {
  ref
} from 'vue'
const electron = window.require('electron');
const {
  ipcRenderer
} = electron;

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

export function setTaskTimer(time, name) {
  ipcRenderer.send('setTaskTimer', time, encodeURIComponent(name));
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

export function getDirName(){
  ipcRenderer.send('getDirName');
  ipcRenderer.once('getDirNameReply',(event, arg) =>{
    

  });
}