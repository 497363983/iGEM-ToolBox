const electron = window.require('electron');
const {
    ipcRenderer
} = electron;

export function getData() {

}

export function readJSONFile(file, callback) {
    ipcRenderer.send("readJSONFile", file);
    ipcRenderer.once("readJSONFile-reply", function (event, data) {
        if (callback && typeof callback === "function") {
            callback(data);
        }
    });
}

export function writeJSONFile(file, data, callback) {
    ipcRenderer.send("writeJSONFile", {file, data:JSON.stringify(data)});
    ipcRenderer.once("writeJSONFile-reply", function (event, data) {
        if (callback && typeof callback === "function") {
            callback(data);
        }
    });
}

export function Uppercase(str){
    return str.replace(/\b([\w|']+)\b/g, (word)=>{
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    });

}