import { Editor } from "@tiptap/vue-3";
import { Extensions } from "./config/config";
import { useWikiEditorStore } from "@/store";
// import { ref } from 'vue';
export const editor = new Editor({
    extensions: Extensions,
    injectCSS: false,
    // content: useWikiEditorStore().content,
    onUpdate: ({ editor }) => {
        useWikiEditorStore().content = editor.getHTML();
        useWikiEditorStore().jsonContent = editor.getJSON();
        console.log('update', useWikiEditorStore().jsonContent, editor);
        useWikiEditorStore().saveBlock();

        const transaction = editor.state.tr;
        const headings = [];
        editor.state.doc.descendants((node, pos) => {
            if (node.type.name === "heading") {
                const id = `heading-${headings.length + 1}`;
                if (node.attrs.id != id) {
                    transaction.setNodeMarkup(pos, undefined, {
                        ...node.attrs,
                        id,
                    });
                }
                headings.push({
                    level: node.attrs.level,
                    text: node.textContent,
                    id,
                });
            }
        });
        transaction.setMeta("preventUpdate", true);
        editor.view.dispatch(transaction);
        console.log(useWikiEditorStore().jsonContent);
    }
});