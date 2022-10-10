import {
    defineStore
} from 'pinia';
import { useCompetitionStore } from './competition';
import { getBranch, getGitVersion } from '@/utils/git';
import { useUserStore } from './user';

export const useGitLabStore = defineStore('gitLabStore', {
    state: () => ({
        git: {
            version: ""
        },
        currentBranch: "",
        useSSH: false
    }),
    actions: {
        async getGit() {
            this.$state.currentBranch = await getBranch();
            this.$state.git.version = await getGitVersion();
        },
        getGitPath() {
            if (this.$state.useSSH) {
                return `https://gitlab.igem.org:${useCompetitionStore().year}/${useCompetitionStore().teamName.toLowerCase().replace(/\s+/g, "-")}.git`
            } else {
                return `https://${useUserStore().username}:${useUserStore().accessTokens}@gitlab.igem.org/${useCompetitionStore().year}/${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}.git`
            }
        }
    }
});