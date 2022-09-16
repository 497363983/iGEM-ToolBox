import {
    defineStore
} from 'pinia';
import { useUserStore } from './user';
import { useConfigStore } from './config';
import { getBranch } from '@/utils/git';

export const useGitLabStore = defineStore('gitLabStore', {
    state: () => ({
        gitLabPath: `https://gitlab.igem.org/${useConfigStore().competition.year}/${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}`,
        gitPath: `https://gitlab.igem.org:${useConfigStore().competition.year}/${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}.git`,
        git: {
            version: ""
        },
        currentBranch: ""
    }),
    actions: {
        setPaths() {
            this.$state.gitLabPath = `https://gitlab.igem.org/${useConfigStore().competition.year}/${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}`;
            this.$state.gitPath = `git@gitlab.igem.org:${useConfigStore().competition.year}/${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}.git`;
        },
        async getCurrentBranch() {
            console.log(await getBranch())
            this.$state.currentBranch = await getBranch()
        }
    }
});