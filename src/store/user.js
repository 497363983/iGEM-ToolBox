import {
    defineStore
} from 'pinia';
import { electronStore } from '@/electron-store';

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
        save(){
            electronStore.set('user',this.$state);
        },
        getElectronStore(){
            this.$state = electronStore.get('user');
        }
    }
});