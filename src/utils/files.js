const { readdirSync, statSync } = window.require("fs");
const path = window.require("path");
export function getDirTree(dirPath, depth = 0, except = ["node_modules", "dist"]) {
    let currentDepth = 0;
    function getMap(dirPath, depth) {
        let tree = [];
        let files = readdirSync(dirPath);
        files.map((file) => {
            let subPath = path.resolve(dirPath, file);
            let state = statSync(subPath);
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

export function isLeaf(dirPath) {
    let files = readdirSync(dirPath);
    let res = true;
    files.map(file => {
        let subPath = path.resolve(dirPath, file);
        let state = statSync(subPath);
        if (state.isDirectory()) {
            res = false
        }
    })
    return res
}