import {
    defineStore
} from 'pinia';

export const useGitStore = defineStore('gitStore', {
    state: () => ({
        method: '',
        stage: '',
        progress: 0
    })
})