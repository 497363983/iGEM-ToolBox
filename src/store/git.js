import {
    defineStore
} from 'pinia';

export const useGitStore = defineStore('gitStore', {
    state: () => ({
        // currentState: {
        method: '',
        stage: '',
        progress: 0
        // }
    })
})