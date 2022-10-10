import {
    defineStore
} from 'pinia';
import { useUserStore } from './user';
import { useConfigStore } from './config';
import { useCompetitionStore } from './competition';

export const useTemplateStore = defineStore('templateStore', {
    state: () => ({
        pageTemplatePath: '',
        pageSuffix: `html`,
        projectPath: ``,
        componentsPath: null
    }),
    getters: {
        getPageTemplatePath() {
            return `${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}/wiki/pages`
        },
        getProjectPath() {
            return `${useConfigStore().installationPath}\\wiki\\${useCompetitionStore().year}\\${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}`
        }
    },
    actions: {

    }
});