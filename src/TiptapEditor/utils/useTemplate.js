import { useTemplateStore } from "@/store";
import { readFile, getDirTree } from "../../utils/files";
import templates from "../templates";
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

export const getTemplate = () => {
    if (useTemplateStore().componentsPath && useTemplateStore().componentsPath !== '') {
        const templateFiles = getDirTree(useTemplateStore().componentsPath);
        templateFiles.forEach(item => {
            templates[item.substring(0, item.indexOf('.'))] = readFile(path.join(useTemplateStore().componentsPath, item));
        });
    }
}

export function DOMcreateElement(
    tag,
    attrs,
    ...children
) {
    attrs = attrs || {};
    const stack = [...children];

    // Support for components(ish)
    if (typeof tag === "function") {
        attrs.children = stack;
        return tag(attrs);
    }


    const elm = document.createElement(tag);

    // Add attributes
    for (let [name, val] of Object.entries(attrs)) {
        name = escapeHtml(name);
        if (name.startsWith("on") && name.toLowerCase() in window) {
            elm.addEventListener(name.toLowerCase().substr(2), val);
        } else if (name === "ref") {
            val(elm);
        } else if (name === "style") {
            Object.assign(elm.style, val);
        } else if (val === true) {
            elm.setAttribute(name, name);
        } else if (val !== false && val != null) {
            elm.setAttribute(name, escapeHtml(val));
        } else if (val === false) {
            elm.removeAttribute(name);
        }
    }

    // Append children
    while (stack.length) {
        const child = stack.shift();

        // Is child a leaf?
        if (!Array.isArray(child)) {
            elm.appendChild(
                (child).nodeType === null
                    ? document.createTextNode(child.toString())
                    : child
            );
        } else {
            stack.push(...child);
        }
    }

    return elm;
}

export const DOMcreateFragment = (
    attrs,
    ...children
) => {
    return children;
};
