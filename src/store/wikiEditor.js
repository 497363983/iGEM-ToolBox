import {
    defineStore
} from 'pinia';
import { pullProject } from '@/utils/git';

export const useWikiEditorStore = defineStore('wikiEditorStore', {
    state: () => ({
        content: "",
        path: "",
        headings: [],
        jsonContent: {},
        showEditor: false,
        extensions: {
            Link: {
                autoLink: true,
                openOnClick: true,
                linkOnPaste: true
            }
        }
    }),
    actions: {
        setPath(path) {
            this.$state.path = path;
        },
        async openEditor(callback) {
            await pullProject({
                success: () => {
                    this.$state.showEditor = true
                    callback && typeof callback === 'function' ? callback() : null
                }
            });

        },
        closeEditor() {
            this.$state.showEditor = false;
        }
    }
});