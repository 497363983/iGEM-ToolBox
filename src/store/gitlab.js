import {
    defineStore
} from 'pinia';
import { useUserStore } from './user';
import { useCompetitionStore } from './competition';
import { getBranch, getGitVersion } from '@/utils/git';

export const useGitLabStore = defineStore('gitLabStore', {
    state: () => ({
        gitLabPath: `https://gitlab.igem.org/${useCompetitionStore().year}/${useCompetitionStore().teamName.toLowerCase().replace(/\s+/g, "-")}`,
        gitPath: `https://gitlab.igem.org:${useCompetitionStore().year}/${useCompetitionStore().teamName.toLowerCase().replace(/\s+/g, "-")}.git`,
        git: {
            version: ""
        },
        currentBranch: "",
        useSSH: false,
        accessTokens: ""
    }),
    actions: {
        setPaths() {
            this.$state.gitLabPath = `https://gitlab.igem.org/${useCompetitionStore().year}/${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}`;
            this.$state.gitPath = `git@gitlab.igem.org:${useCompetitionStore().year}/${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}.git`;
        },
        async getGit() {
            this.$state.currentBranch = await getBranch();
            this.$state.git.version = await getGitVersion();
        }
    }
});