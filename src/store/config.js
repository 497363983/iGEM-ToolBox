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
        competition: {
            year: `${new Date().getFullYear()}`,
            group: "",
            role: "",
            ALLOWED_ROLE: ["leader", "member", "PI", "advisor"],
            ALLOWED_GROUP: ["dry", "wet", "HP"]
        },
        theme: {
            themeList: ["dark", "light"],
            currentTheme: useColorMode().value
        },
        update: {
            autoUpdate: true
        }
    }),
    getters: {},
    actions: {
        setCurrentLanguage: (language) => {
            this.language.currentLanguage = this.language.languageList[language];
        },
        save() {
            useColorMode().value = this.$state.theme.currentTheme;
            electronStore.set('config',this.$state);
        }
    }
});