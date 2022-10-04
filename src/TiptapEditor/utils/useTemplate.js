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
        templateFiles.forEach(file=>{
            const template = readFile(path.join(useTemplateStore().componentsPath, file));
            
        })
    }
}


export function DOMcreateElement(DOM) {
    const { type, content = null, attrs } = DOM;
}

export function hasContent() {
    return
}