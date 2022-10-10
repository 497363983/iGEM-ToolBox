import {
    defineStore
} from 'pinia';
import { useUserStore } from './user';

export const useTemplateStore = defineStore('templateStore', {
    state: () => ({
        pageTemplatePath: '',
        pageSuffix: `html`,
        projectPath: ``,
        componentsPath: null
    }),
    getters: {

    },
    actions: {
        getPageTemplatePath() {
            return `${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}/wiki/pages`
        },
    }
});