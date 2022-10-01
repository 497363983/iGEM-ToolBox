const fs = window.require('fs');
const path = window.require("path");
/**
 * 
 * @param {String} dirPath 
 * @param {Number} depth 
 * @param {String[]} except 
 * @returns 
 */
export function getDirTree(dirPath, depth = 0, except = ["node_modules", "dist", ".git"]) {
    let currentDepth = 0;
    /**
     * 
     * @param {String} dirPath 
     * @param {Number} depth 
     * @returns 
     */
    function getMap(dirPath, depth) {
        let tree = [];
        let files = fs.readdirSync(dirPath);
        files.map((file) => {
            let subPath = path.resolve(dirPath, file);
            let state = fs.statSync(subPath);
            if (!except.includes(file)) {
                let item = {
                    path: subPath,
                    depth: currentDepth,
                }
                if (state.isDirectory()) {
                    item.type = "directory";
                    item.leaf = isLeaf(subPath)
                    item.name = path.basename(subPath);
                    if (currentDepth < depth) {
                        item.children = []
                        currentDepth += 1
                        item.children.push(...getMap(subPath, currentDepth));
                        currentDepth -= 1
                    }
                    tree.push(item);
                } else {
                    item.type = "file";
                    item.leaf = true;
                    let name = path.basename(subPath);
                    item.name = name.substring(0, name.lastIndexOf("."));
                    item.extname = path.extname(name);
                    tree.push(item);
                }
            }
        })
        return tree
    }

    return getMap(dirPath, depth);
}
/**
 * 
 * @param {String} dirPath 
 * @returns 
 */
export function isLeaf(dirPath) {
    let files = fs.readdirSync(dirPath);
    let res = true;
    files.map(file => {
        let subPath = path.resolve(dirPath, file);
        let state = fs.statSync(subPath);
        if (state.isDirectory()) {
            res = false
        }
    })
    return res
}
/**
 * 
 * @param {String} dirPath 
 * @returns 
 */
export function getFilesName(dirPath) {
    let files = fs.readdirSync(dirPath);
    return files;
}
/**
 * 
 * @param {String} dirPath 
 * @param {Function} callback 
 * @returns 
 */
export function readFile(dirPath, callback) {
    try {
        fs.accessSync(dirPath, fs.constants.F_OK);
        const res = fs.readFileSync(dirPath, 'utf8');
        if (callback) {
            callback(null, res);
        }
        return res;
    } catch (err) {
        console.log(err);
        if (callback) {
            callback(err);
        }

    }
}
/**
 * 
 * @param {String} dirPath 
 * @param {Function} callback 
 */
export function checkFile(dirPath, callback) {
    fs.access(dirPath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(path.dirname(dirPath), { recursive: true }, (err) => {
                if (!err && callback) {
                    callback()
                }
            });
        } else {
            callback();
        }
    })
}

/**
 * 
 * @param {String} filePath 
 * @param {String} data 
 * @param {Function} callback 
 */
export async function writeFileItem(filePath, data, callback) {
    checkFile(filePath, () => {
        fs.writeFileSync(filePath, data, 'utf8', (err) => {
            if (!err && callback) {
                console.log('write file err', err)
                callback()
            } else {
                console.log(err)
            }
        });
    })
}