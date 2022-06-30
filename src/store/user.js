import {
    defineStore
} from 'pinia';
import { electronStore } from '@/electron-store';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        username: "sky1",
        realname: "Weiwei Qian",
        password: "",
        description: "",
        accessTokens: "",
        team: "Example"
    }),
    actions: {
        save(){
            electronStore.set('user',this.$state);
        },
        getElectronStore(){
            this.$state = electronStore.get('user');
        }
    }
});