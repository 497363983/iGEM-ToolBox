import { useTemplateStore } from "@/store";
import templates from '../templates/index.json';
import { getDirTree, readFile } from "@/utils/files";
const path = require('path');

export const entityMap = {
    "&": "amp",
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "'": "#39",
    "/": "#x2F",
};

export const empty_tags = [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
];

/**
 * 
 * @param {String} str 
 * @returns 
 */
export const escapeHtml = (str) => String(str).replace(/[&<>"'/\\]/g, (s) => `&${entityMap[s]};`);

export function getTemplates() {
    if (useTemplateStore().componentsPath && useTemplateStore().componentsPath.trim() !== '') {
        const templateFiles = getDirTree(useTemplateStore().componentsPath);
        templateFiles.forEach(file => {
            const template = readFile(path.join(useTemplateStore().componentsPath, file));
            templates[file.substring(0, file.indexOf('.'))] = template;
        })
    }
}


export function DOMcreateElement(DOM) {
    const { type, content = null, attrs = {}, mark = null, text = '' } = DOM;
    if (content) {
        let $content = '';
        content.forEach(item => {
            $content += DOMcreateElement(item)
        })
        const props = { ...attrs, content: $content }
        return templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
            return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]]
        })
    } else if (type === 'text') {
        if (mark) {
            const props = { ...attrs, content: text }
            return templates[mark].replace(/{\$([\s\S]*?)}/g, (s) => {
                return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]]
            })
        } else {
            return text
        }
    }
}
