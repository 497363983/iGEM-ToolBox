import {
    defineStore
} from 'pinia';
import { useCompetitionStore } from './competition';
import { useTemplateStore } from './template';
import { getBranch, getGitVersion } from '@/utils/git';
import { useUserStore } from './user';
import { readConfig } from "@/utils/config";
import { joinPath } from '@/utils/files';

export const useGitLabStore = defineStore('gitLabStore', {
    state: () => ({
        git: {
            version: ""
        },
        currentBranch: "",
        useSSH: false
    }),
    getters: {
        getGitPath() {
            if (this.useSSH) {
                return `https://gitlab.igem.org:${useCompetitionStore().year}/${useCompetitionStore().teamName.toLowerCase().replace(/\s+/g, "-")}.git`
            } else {
                return `https://${useUserStore().username}:${useUserStore().accessTokens}@gitlab.igem.org/${useCompetitionStore().year}/${useCompetitionStore().teamName.toLowerCase().replace(/\s+/g, "-")}.git`
            }
        },
        getBranch() {
            const getConfig = readConfig(joinPath(useTemplateStore().getProjectPath, 'tool.config.json'));
            return getConfig('branch') || `main`
        }
    },
    actions: {
        async getGit() {
            this.$state.currentBranch = await getBranch();
            this.$state.git.version = await getGitVersion();
        },

    }
});