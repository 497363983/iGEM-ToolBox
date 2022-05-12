import { Node } from '@tiptap/core'
export default Node.create({
    name:'GlobalAttributes',
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