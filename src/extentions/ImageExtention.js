// import Image from '@tiptap/extension-image'
// import {
//     markPasteRule
// } from '@tiptap/core'
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import {getClipboardImageURL} from '../utils/pasteImage'
// import {
//     mergeAttributes
// } from '@tiptap/core'
export default Extension.create({
    name: 'eventHandler',
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('eventHandler'),
          props: {
            handlePaste(view, event, slice) { 
                getClipboardImageURL();
                console.log(view, event, slice);
             },
            // Here is the full list: https://prosemirror.net/docs/ref/#view.EditorProps
          },
        }),
      ]
    },
  })
// export default Image.extend({
//     name: 'ImageExtention',
//     addAttributes() {
//         return {
//             ...Image.config.addAttributes(),

//         }


//     },
//     addCommands() {
//         return {
//             pasteImage: (options) => ({
//                 tr,
//                 commands
//             }) => {
//                 console.log(options, tr, commands);
//                 console.log(this.options, this);
//             }
//         }
//     },
//     addPasteRules() {
//         return [

//         ]
//     }
// })