import { Editor } from "@tiptap/vue-3";
import { Extensions } from "./config/config";
import { ref } from 'vue';
export const editor = new Editor({
    extensions: Extensions,
    injectCSS: false,
    content: "",
    onUpdate: ({ editor }) => {
        console.log(editor.getHTML());
    }
});