import Strike from '@tiptap/extension-strike'
import {
    nodeInputRule
} from '@tiptap/core'
import {
    REGEX_INLINE_MATH_DOLLARS
} from '@/config/Math/config'
export default Strike.extend({
    addInputRules() {
        return [
            nodeInputRule({
                find: REGEX_INLINE_MATH_DOLLARS,
                type: 'InlineMath',
            }),
        ]
    },
})