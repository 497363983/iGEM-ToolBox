import { useTemplateStore } from "@/store";
import templates from '../templates/index.json';
import { getDirTree, readFile } from "@/utils/files";
import { transTableFormat } from "@/utils/tableFormat";

export const entityMap = {
    "&": "amp",
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "'": "#8216",
    "/": "#x2F",
};

export const charMap = {
    "&": "\\&",
    "<": "\\<",
    ">": "\\>",
    '"': "\\\"",
    "'": "\\'",
    "/": "\\/",
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

/**
 * 
 * @param {String} str 
 * @returns 
 */
export const escapeChar = (str) => String(str).replace(/[&<>"'/\\]/g, (s) => `${charMap[s]}`);

export function getTemplates() {
    if (useTemplateStore().componentsPath && useTemplateStore().componentsPath.trim() !== '') {
        const templateFiles = getDirTree(useTemplateStore().componentsPath);
        templateFiles.forEach(file => {
            const template = readFile(file.path);
            templates[file.name] = template;
        })
    }
    console.log(templates)
}

/**
 * TODO:rebuild the DOMcreateElement function
 * @param {Object} DOM 
 * @returns 
 */
export function DOMcreateElement(DOM) {
    const { type, content = null, attrs = {}, marks = null, text = '' } = DOM;
    if (content) {
        if (typeof content === "object") {
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
                for (let item of content) {
                    $content += DOMcreateElement(item);
                }
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
            if (marks) {
                console.log('llll', marks, text)
                let mark_content = "{$content}";
                marks.forEach((mark, index) => {
                    const { attrs: mark_attrs, type } = mark;
                    console.log(mark_attrs, type, text, index, templates[type], mark_content)
                    let props = {};
                    if (index === marks.length - 1) {
                        console.log('ll-0', mark_content)
                        props = { ...mark_attrs, content: text };
                        mark_content = mark_content.replace(/{\$content}/g, templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                            console.log('ll-1', mark_content)
                            return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
                        }))
                    } else {
                        props = { ...mark_attrs };
                        console.log(mark_content, marks, props)
                        mark_content = mark_content.replace(/{\$content}/g, templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                            return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : s
                        }))
                    }
                    console.log(text, mark_content)
                })
                return mark_content;
            } else {
                return text
            }
        } else {
            const props = { ...attrs }
            return templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
            })
        }
    }
}