import { useTemplateStore } from "@/store";
import templates from '../templates/index.json';
import { getDirTree, readFile } from "@/utils/files";

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

    }
}


export function DOMcreateElement(type, attrs, content = null) {
    
}

export function hasContent() {
    return
}