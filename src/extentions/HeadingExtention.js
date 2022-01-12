import Heading from '@tiptap/extension-image'
export default Heading.extend({
    name: 'ImageExtention',
        addAttributes() {
            return {
                ...Heading.config.addAttributes(),
                id: {
                    default: 'null'
                }
            }
        }
});