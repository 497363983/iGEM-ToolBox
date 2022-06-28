import {
    defineStore
} from 'pinia';
import { en, zhCn } from "element-plus/lib/locale";

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
            year: "2022",
            group: "",
            role: "",
            ALLOWED_ROLE: ["leader", "member", "PI", "advisor"],
            ALLOWED_GROUP: ["dry", "wet", "HP"]
        },
        theme: {
            themeList: ["dark", "light"],
            currrentTheme: "light"
        },
        update: {
            autoUpdate: true
        }
    }),
    getters: {},
    actions: {
        setCurrentLanguage: (language) => {
            this.language.currentLanguage = this.language.languageList[language];
        }
    }
});