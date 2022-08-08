import {
    defineStore
} from 'pinia';

export const useWikiEditorStore = defineStore('wikiEditorStore', {
    state: () => ({
        content: ''
    })
});