const fs = window.require('fs');
const path = window.require("path");
import { writeJSONFile } from ".";

export function checkConfig(projectPath, callback) {
    fs.access(path.join(projectPath, 'tool.config.json'), fs.constants.F_OK, (err) => {
        if (callback && typeof callback === 'function') {
            callback(err);
        }
    })
}

export function createConfig(projectPath, data, callback) {
    writeJSONFile(path.join(projectPath, 'tool.config.json'), data, callback);
}