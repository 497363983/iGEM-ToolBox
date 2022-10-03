import {
    defineStore
} from 'pinia';
import { en, zhCn } from "element-plus/lib/locale";
import { electronStore } from '@/electron-store';
import { useColorMode } from '@vueuse/core';

export const useConfigStore = defineStore('configStore', {
    state: () => ({
        language: {
            languageMap: [
                {
                    label: "中文简体",
                    value: "zh"
                },
                {
                    label: "English",
                    value: "en"
                }
            ],
            languageList: {
                zh: zhCn,
                en: en
            },
            currentLanguage: "en"
        },
        theme: {
            themeList: ["dark", "light"],
            currentTheme: useColorMode().value
        },
        update: {
            autoUpdate: true
        },
        installationPath: ""
    }),
    getters: {},
    actions: {
        setCurrentLanguage: (language) => {
            this.language.currentLanguage = this.language.languageList[language];
        },
        save() {
            useColorMode().value = this.$state.theme.currentTheme;
            electronStore.set('config', this.$state);
        }
    }
});