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


export const InlineMath = Node.create({
    name: 'math_inline',
    group: 'inline math',
    content: 'text*', // important!
    inline: true, // important!
    atom: true, // important!
    code: true,

    parseHTML() {
        return [{
            tag: 'math-inline', // important!
        },];
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