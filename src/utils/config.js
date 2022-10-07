const fs = window.require('fs');
// const path = window.require("path");
import { writeJSONFile } from ".";

export function checkConfig(projectPath, callback) {
    fs.access(projectPath, fs.constants.F_OK, (err) => {
        if (callback && typeof callback === 'function') {
            callback(err);
        }
    })
}

export function createConfig(projectPath, data, callback) {
    writeJSONFile(projectPath, data, callback);
}