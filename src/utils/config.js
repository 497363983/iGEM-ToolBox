const fs = window.require('fs');
const path = window.require("path");
import { writeJSONFile } from ".";
import { readFile } from "./files";
import { pullProject, pushProject } from "./git";

export function checkConfig(projectPath, callback) {
    fs.access(path.join(projectPath, 'tool.config.json'), fs.constants.F_OK, (err) => {
        if (callback && typeof callback === 'function') {
            callback(err);
        }
    })
}

export function createConfig(projectPath, data, callback) {
    pullProject({
        success: () => {
            writeJSONFile(path.join(projectPath, 'tool.config.json'), data, () => {
                pushProject({
                    commitInformation: 'update tool.config.json',
                    file: ['tool.config.json']
                }, callback)
            });
        }
    })
}


export function readConfig(path) {
    const config = JSON.parse(readFile(path));
    return (key) => {
        return key.split('.').reduce((o, i) => {
            console.log(i, o, config, path)
            if (o) return o[i]
        }, config)
    }
}