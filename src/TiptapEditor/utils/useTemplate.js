import { useTemplateStore } from "@/store";
import templates from '../templates/index.json';
import { getDirTree, readFile } from "@/utils/files";
import { transTableFormat } from "@/utils/tableFormat";
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
            const template = readFile(path.join(useTemplateStore().componentsPath, file.name));
            templates[file.substring(0, file.indexOf('.'))] = template;
        })
    }
    console.log(templates)
}

/**
 * 
 * @param {Object} DOM 
 * @returns 
 */
export function DOMcreateElement(DOM) {
    const { type, content = null, attrs = {}, mark = null, text = '' } = DOM;
    if (content) {
        if (typeof content === "object") {
            console.log(type, DOM)
            if (type === "table") {
                let $data = transTableFormat(DOM);
                let $content = '';
                content.forEach(item => {
                    $content += DOMcreateElement(item);
                })
                const props = { ...attrs, content: $content, data: JSON.stringify($data).replace(/"/g, '\'') }
                return templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                    return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
                })
            } else if (["tableCell", "tableHeader"].includes(type)) {
                let $content = '';
                content.forEach(item => {
                    if (item.type === "paragraph") {
                        if (item.content) {
                            console.log($content);
                            item.content.forEach(cell => {
                                $content += DOMcreateElement(cell);
                            })
                        }
                    } else {
                        $content += DOMcreateElement(item);
                    }
                })
                const props = { ...attrs, content: $content }
                return templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                    return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
                })
            } else {
                let $content = '';
                content.forEach(item => {
                    $content += DOMcreateElement(item);
                })
                const props = { ...attrs, content: $content }
                return templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                    return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
                })
            }
        } else if (typeof content === 'string') {
            const props = { ...attrs, content: content }
            return templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
            })
        }

    } else {
        if (type === 'text') {
            if (mark) {
                const props = { ...attrs, content: text }
                return templates[mark].replace(/{\$([\s\S]*?)}/g, (s) => {
                    return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
                })
            } else {
                return text
            }
        } else {
            const props = { ...attrs, content: '' }
            return templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
            })
        }
    }
}