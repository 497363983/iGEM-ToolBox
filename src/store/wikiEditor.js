import {
    defineStore
} from 'pinia';

export const useWikiEditorStore = defineStore('wikiEditorStore', {
    state: () => ({
        content: "",
        path: "",
        headings: [],
        jsonContent: {},
        extensions: {
            Link: {
                autoLink: true,
                openOnClick: true,
                linkOnPaste: true
            }
        }
    })
});