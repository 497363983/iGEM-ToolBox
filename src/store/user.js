import {
    defineStore
} from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        username: "sky1",
        realname: "Weiwei Qian",
        password: "",
        description: "",
    })
});