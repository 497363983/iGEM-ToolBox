import { useTemplateStore } from "@/store";
import templates from '../templates/index.json';
import { getDirTree, readFile } from "@/utils/files";
import { transTableFormat } from "@/utils/tableFormat";

export const entityMap = {
    "&": "amp",
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "'": "#39",
    "/": "#x2F",
};

export const charMap = {
    "&": "\\&",
    "<": "\\<",
    ">": "\\>",
    '"': "\\",
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
 * 
 * @param {Object} DOM 
 * @returns 
 */
export function DOMcreateElement(DOM) {
    const { type, content = null, attrs = {}, marks = null, text = '' } = DOM;
    if (content) {
        console.log('lll', content)
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
                            console.log($content);
                            item.content.forEach(cell => {
                                $content += DOMcreateElement(cell);
                            })
                        }
                    } else {
                        $content += DOMcreateElement(item);
                    }
                })
                console.log('content table', $content)
                const props = { ...attrs, content: $content }
                return templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                    return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
                })
            } else {
                let $content = '';
                // content.forEach(item => {
                for (let item of content) {
                    console.log(item)
                    $content += DOMcreateElement(item);
                }

                // })
                console.log('content', $content)
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
                let mark_content = "{$content}";
                for (let mark of marks) {
                    const { mark_attrs = {}, type } = mark;
                    const props = { ...mark_attrs };
                    console.log('marks', mark_content, type, mark)
                    mark_content = mark_content.replace("{$content}", templates[type].replace(/{\$([\s\S]*?)}/g, (s) => {
                        console.log('k', s)
                        return props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] ? props[s.match(/(?<={\$)([\s\S]*?)(?=})/g)[0]] : ''
                    }))
                    console.log('mark', mark_content)
                }
                mark_content = mark_content.replace('{$content}', text);
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