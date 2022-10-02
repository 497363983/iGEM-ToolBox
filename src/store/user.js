import {
    defineStore
} from 'pinia';
import { electronStore } from '@/electron-store';
import { writeJSONFile } from '@/utils';
import { useTemplateStore } from './template';
import { useCompetitionStore } from './competition';
import { pullProject, pushProject } from '@/utils/git';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        username: "",
        realname: "",
        password: "",
        description: "",
        accessTokens: "",
        team: "",
        email: "",
        isDeveloper: false
    }),
    actions: {
        async save() {
            electronStore.set('user', this.$state);
            await pullProject({
                success: () => {
                    writeJSONFile(`${useTemplateStore().projectPath}\\tool_box\\members\\${this.$state.username}.json`, {
                        username: this.$state.username,
                        realname: this.$state.realname,
                        description: this.$state.description,
                        group: useCompetitionStore().$state.group,
                        role: useCompetitionStore().$state.role
                    }, () => {
                        pushProject({
                            commitInformation: `upload user information`,
                            file: [`tool_box\\members\\${this.$state.username}.json`]
                        })
                    })
                }
            })

        },
        getElectronStore() {
            this.$state = electronStore.get('user');
        }
    }
});