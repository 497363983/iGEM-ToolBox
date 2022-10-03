import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import InlineMath from './index.vue';

const INLINE_MATH_INPUT_RULE = /(?<!\\)\$(.+)(?<!\\)\$/;

export const inlineMath = Node.create({
    name: "inlineMath",
    group: "inline math",
    content: 'text*',
    inline: true,
    atom: true,
    code: true,
    addAttributes() {
        return {
            src: {
                default: "",
                parseHTML: element => element.getAttribute('data-src'),
                renderHTML: attributes => {
                    return {
                        'data-src': attributes.src
                    }
                }
            }
        }

    },
    addNodeView() {
        return VueNodeViewRenderer(InlineMath);
    },
    addInputRules() {
        return [
            nodeInputRule({
                find: INLINE_MATH_INPUT_RULE,
                type: this.type
            })
        ]
    },
    renderHTML({ HTMLAttributes }){
        return ['inline-math',mergeAttributes(HTMLAttributes)]
    }

});