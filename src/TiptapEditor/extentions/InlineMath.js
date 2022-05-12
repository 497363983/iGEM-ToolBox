import {
    Node,
    mergeAttributes
} from '@tiptap/core';
import {
    mathPlugin,
    // mathBackspaceCmd,
    // insertMathCmd,
    makeInlineMathInputRule,
    REGEX_INLINE_MATH_DOLLARS,
} from "@benrbray/prosemirror-math";
import {
    inputRules
} from 'prosemirror-inputrules';
import "katex/dist/katex.min.css";
import "@benrbray/prosemirror-math/style/math.css";
// import {
//     keymap
// } from "prosemirror-keymap";
// import {
//     chainCommands,
//     deleteSelection,
//     selectNodeBackward,
//     joinBackward
// } from "prosemirror-commands";
// import {
//     VueNodeViewRenderer
// } from '@tiptap/vue-3';
// import InlineMath from '@/components/InlineMath';
// import {
//     nodeInputRule
// } from '@tiptap/core'
// import {
//     REGEX_INLINE_MATH_DOLLARS
// } from '@/config/Math/config'


export default Node.create({
    name: 'math_inline',
    group: 'inline math',
    content: 'text*', // important!
    inline: true, // important!
    atom: true, // important!
    code: true,

    parseHTML() {
        return [{
            tag: 'math-inline', // important!
        }, ];
    },

    renderHTML({
        HTMLAttributes
    }) {
        return ['math-inline', mergeAttributes({
            class: 'math-node'
        }, HTMLAttributes), 0];
    },

    addProseMirrorPlugins() {
        const inputRulePlugin = inputRules({
            rules: [makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, this.type)],
        });

        // const keyMapPlugin = keymap({
        //     "Mod-Space": insertMathCmd(this.editor.schema.nodes.math_inline),
        //     // modify the default keymap chain for backspace
        //     "Backspace": chainCommands(deleteSelection, mathBackspaceCmd, joinBackward, selectNodeBackward)
        // });

        return [mathPlugin, inputRulePlugin];
    },
});

// export default Node.create({
//     name: 'math_inline',
//     group: "inline",
//     content: "text*",
//     inline: true,
//     atom: true,
//     renderHTML() {
//         return ["math-inline", {
//             class: "math-node",
//             spellcheck: "false"
//         }, 0];
//     },
//     parseHTML() {
//         return [{
//             tag: "math-inline",
//         }, ]
//     },
//     addCommands() {
//         return () => () => insertMathCmd(this.type);
//     },
//     addInputRules() {
//         const type = this.type;
//         return [makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, type)];
//         // return [
//         //     nodeInputRule({
//         //         find: REGEX_INLINE_MATH_DOLLARS,
//         //         type: type
//         //     })
//         // ]
//     },
//     // addKeyboardShortcuts() {
//     //     return {
//     //         "Mod-Space": insertMathCmd(this.type),
//     //         Backspace: (config) => {
//     //             return chainCommands(deleteSelection(config.editor.view.state),mathBackspaceCmd(config.editor.view.state), joinBackward(config.editor.view.state), selectNodeBackward(config.editor.view.state));
//     //         },
//     //     };
//     // },
//     addProseMirrorPlugins() {
//         return [mathPlugin];
//     }
// })



// export default Node.create({
//     name: 'InlineMath',
//     group: 'inline math',
//     content: 'text*',
//     inline: true,
//     atom: true,
//     inclusive: true,
//     // allowGapCursor: true,
//     addOptions() {
//         return {
//             HTMLAttributes: {},
//             renderLabel({
//                 node
//             }) {
//                 console.log("kahdka", node);
//                 return `${node.attrs.mathSrc}`
//             },
//         }
//     },
//     addAttributes() {
//         return {
//             mathSrc: {
//                 default: null,
//                 parseHTML: element => element.getAttribute('data-math-src'),
//                 renderHTML: attributes => {
//                     if (!attributes.mathSrc) {
//                         return {}
//                     }
//                     return {
//                         'data-math-src': attributes.mathSrc
//                     }
//                 },
//             }
//         }
//     },
//     parseHTML() {
//         return [{
//             tag: `span[data-type="${this.name}"]`
//         }];
//     },
//     renderHTML({
//         node,
//         HTMLAttributes
//     }) {
//         return [
//             'span',
//             mergeAttributes({
//                 'data-type': this.name
//             }, this.options.HTMLAttributes, HTMLAttributes),
//             this.options.renderLabel({
//                 options: this.options,
//                 node
//             })
//         ];
//     },
//     renderText({
//         node
//     }) {
//         return this.options.renderLabel({
//             options: this.options,
//             node
//         });
//     },
//     addNodeView() {
//         return VueNodeViewRenderer(InlineMath);
//     },
//     // addInputRules() {
//     //     return[
//     //         nodeInputRule({
//     //             find: REGEX_INLINE_MATH_DOLLARS,
//     //             type: this.type,
//     //         }),
//     //     ]
//     // }
//     addProseMirrorPlugins() {
//         const inputRulePlugin = inputRules({
//             rules: [makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, this.type)],
//         });

//         return [inputRulePlugin];
//     },
// });