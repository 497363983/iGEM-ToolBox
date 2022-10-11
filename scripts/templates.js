const fs = require('fs');
const path = require('path');

const defaultTemplatPath = path.join(path.dirname(__dirname), 'src/TiptapEditor/templates');

let templates = {};
// const entityMap = {
//     "&": "amp",
//     "<": "lt",
//     ">": "gt",
//     '"': "quot",
//     "'": "#8216",
//     "/": "#x2F",
// };


/**
 * 
 * @param {String} str 
 * @returns 
 */
// const escapeHtml = (str) => String(str).replace(/[&<>"'/\\]/g, (s) => `&${entityMap[s]};`);

async function getTemplates(dirPath) {
    const files = fs.readdirSync(dirPath, 'utf-8');
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const status = fs.statSync(filePath);
        if (status.isDirectory()) {
            getTemplates(filePath);
        } else if (status.isFile() && path.basename(filePath) === 'index.html') {
            // templates[path.basename(path.dirname(filePath))] = escapeHtml(fs.readFileSync(filePath, 'utf-8'));
            templates[path.basename(path.dirname(filePath))] = fs.readFileSync(filePath, 'utf-8');
        }
    })
}

getTemplates(defaultTemplatPath);
fs.writeFileSync(path.join(defaultTemplatPath, 'index.json'), JSON.stringify(templates), 'utf-8');