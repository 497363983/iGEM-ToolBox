import {
    defineStore
} from 'pinia';

export const useCompetitionStore = defineStore('competitionStore', {
    state: () => ({
        year: `${new Date().getFullYear()}`,
        group: "",
        role: "",
        ALLOWED_ROLE: ["leader", "member", "PI", "advisor"],
        ALLOWED_GROUP: ["dry", "wet", "HP"]
    })
})