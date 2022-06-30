import {
    defineStore
} from 'pinia';
import { useUserStore } from './user';
import { electronStore } from '@/electron-store';

export const useTemplateStore = defineStore('templateStore', {
    state: () => ({
        pageTemplatePath: `${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}/wiki/pages`,
        pageSuffix: `.html`,
        projectPath: `E:/iGEM/igem2022/iGEMWorkSpace/wiki/zjut-china`
    }),
    actions: {
        save() {
            electronStore.set('template', this.$state);
        },
        setPageTemplatePath() {
            this.$state.pageTemplatePath = `${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}/wiki/pages`;
        }
    }
});