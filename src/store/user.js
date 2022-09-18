import {
    defineStore
} from 'pinia';
import { electronStore } from '@/electron-store';
import { writeJSONFile } from '@/utils';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        username: "",
        realname: "",
        password: "",
        description: "",
        accessTokens: "",
        team: "",
        email: "",
    }),
    actions: {
        save() {
            electronStore.set('user', this.$state);
            writeJSONFile(`E:\\iGEM\\igem2022\\iGEMWorkSpace\\iGEM-ToolBox\\testData\\members\\${this.$state.username}.json`,{
                username: this.$state.username,
                realname: this.$state.realname,
                description: this.$state.description
            })
        },
        getElectronStore() {
            this.$state = electronStore.get('user');
        }
    }
});