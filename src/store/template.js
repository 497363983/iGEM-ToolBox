import {
    defineStore
} from 'pinia';
import { useConfigStore } from './config';
import { useCompetitionStore } from './competition';
import { readConfig } from '@/utils/config';
import { joinPath } from '@/utils/files';

export const useTemplateStore = defineStore('templateStore', {
    state: () => ({

    }),
    getters: {
        getPageTemplatePath() {
            const getConfig = readConfig(joinPath(this.getProjectPath, 'tool.config.json'));
            return getConfig('pages.path') || `${useCompetitionStore().teamName.toLowerCase().replace(/\s+/g, "-")}/wiki/pages`
        },
        getProjectPath() {
            return `${useConfigStore().installationPath}\\wiki\\${useCompetitionStore().year}\\${useCompetitionStore().teamName.toLowerCase().replace(/\s+/g, "-")}`
        },
        getTemplatesPath() {
            const getConfig = readConfig(joinPath(this.getProjectPath, 'tool.config.json'));
            return getConfig('templates.path') || `${useCompetitionStore().teamName.toLowerCase().replace(/\s+/g, "-")}/templates`
        },
        getPageExtName() {
            const getConfig = readConfig(joinPath(this.getProjectPath, 'tool.config.json'));
            return getConfig('pages.extname') || `html`
        },
        getTemplatesExtName() {
            const getConfig = readConfig(joinPath(this.getProjectPath, 'tool.config.json'));
            return getConfig('templates.extname') || `html`
        },
    },
    actions: {

    }
});