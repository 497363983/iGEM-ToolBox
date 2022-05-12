import {
    Node,
    mergeAttributes
} from "@tiptap/core";
import {
    PluginKey
} from 'prosemirror-state'
import Suggestion from '@tiptap/suggestion'

export const MathJaxPluginKey = new PluginKey('MathJax');
export default Node.create({
    name: 'MathJax',
    addOptions() {
        return {
            HTMLAttributes: {},
            renderLabel({
                options,
                node
            }) {
                console.log("kahdka", node);
                return `${options.suggestion.char}${node.attrs.label ?? node.attrs.latex}`
            },
            suggestion: {
                char: " ",
                pluginKey: MathJaxPluginKey,
                command: ({
                    editor,
                    range,
                    props
                }) => {
                    const nodeAfter = editor.view.state.selection.$to.nodeAfter;
                    const overrideSpace = nodeAfter ?.text ?.startsWith(' ');
                    if (overrideSpace) {
                        range.to += 1
                    }
                    editor.chain()
                        .focus()
                        .insertContentAt(range, [{
                                type: this.name,
                                attrs: props,
                            },
                            {
                                type: 'text',
                                text: ' ',
                            },
                        ]).run();
                },
                allow: ({
                    state,
                    range
                }) => {
                    const $from = state.doc.resolve(range.from);
                    const type = state.schema.nodes[this.name];
                    const inputing = type.attrs.inputing;
                    const allow = !!$from.parent.type.contentMatch.matchType(type);
                    console.log(inputing);
                    return allow || !!inputing;
                },
            }
        }
    },
    content: 'text*',
    marks: '',
    group: 'inline',
    inline: true,
    selectable: true,
    atom: false,
    addAttributes() {
        return {
            latex: {
                default: null,
                parseHTML: element => element.getAttribute('data-latex'),
                renderHTML: attributes => {
                    if (!attributes.latex) {
                        return {}
                    }
                    return {
                        'data-latex': attributes.latex,
                    }
                },
            },
            label: {
                default: null,
                parseHTML: element => element.getAttribute('data-label'),
                renderHTML: attributes => {
                    if (!attributes.label) {
                        return {}
                    }
                    return {
                        'data-label': attributes.label,
                    }
                },
            },
            inputing: {
                default: false,
                parseHTML: element => element.getAttribute('data-inputing'),
                renderHTML: attributes => {
                    if (!attributes.inputing) {
                        return {}
                    }
                    return {
                        'data-inputing': attributes.inputing,
                    }
                },
            }
        }
    },
    parseHTML() {
        return [{
            tag: `span[data-type="${this.name}"]`,
        }]
    },
    renderHTML({
        node,
        HTMLAttributes
    }) {
        return [
            'span',
            mergeAttributes({
                'data-type': this.name
            }, this.options.HTMLAttributes, HTMLAttributes),
            this.options.renderLabel({
                options: this.options,
                node
            })
        ];
    },
    renderText({
        node
    }) {
        return this.options.renderLabel({
            options: this.options,
            node
        });
    },
    addKeyboardShortcuts() {
        return {
            Backspace: () => this.editor.commands.command(({
                tr,
                state
            }) => {
                let isMathJax = false
                const {
                    selection
                } = state
                const {
                    empty,
                    anchor
                } = selection
                if (!empty) {
                    return false
                }
                state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
                    if (node.type.name === this.name) {
                        isMathJax = true
                        tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize)

                        return false
                    }
                })

                return isMathJax
            }),
        }
    },
    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ]
    },
    onFocus(){

    }
});
