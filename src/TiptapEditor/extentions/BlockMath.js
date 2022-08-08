import {
    Node,
    mergeAttributes
} from '@tiptap/core';

import {
    inputRules
} from 'prosemirror-inputrules';

import {
    // mathPlugin,
    makeBlockMathInputRule,
    REGEX_BLOCK_MATH_DOLLARS,
} from '@benrbray/prosemirror-math';
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


/* eslint-disable */
export const BlockMath =  Node.create({
    name: 'math_display',
    group: 'block math',
    content: 'text*', // important!
    atom: true, // important!
    code: true,

    parseHTML() {
        return [{
            tag: 'math-display', // important!
        }, ];
    },

    renderHTML({
        HTMLAttributes
    }) {
        return [
            'math-display',
            mergeAttributes({
                class: 'math-node'
            }, HTMLAttributes),
            0,
        ];
    },

    addProseMirrorPlugins() {
        const inputRulePlugin = inputRules({
            rules: [makeBlockMathInputRule(REGEX_BLOCK_MATH_DOLLARS, this.type)],
        });

        return [inputRulePlugin];
    },
});