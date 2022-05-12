import Heading from '@tiptap/extension-heading'
export default Heading.extend({
    addGlobalAttributes() {
        return [
          {
            types: [
              'heading',
            ],
            attributes: {
              id: {
                default: null,
              },
            },
          },
        ]
      }
});