import {
    defineStore
} from 'pinia';
import { electronStore } from '@/electron-store';

export const useCompetitionStore = defineStore('competitionStore', {
    state: () => ({
        year: `${new Date().getFullYear()}`,
        group: "",
        role: "",
        ALLOWED_ROLE: ["leader", "member", "PI", "advisor"],
        ALLOWED_GROUP: ["dry", "wet", "HP"],
        teamID: "4227"
    }),
    actions: {
        save(){
            electronStore.set('competition',this.$state);
        }
    }
})