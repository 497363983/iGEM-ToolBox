import {
    defineStore
} from 'pinia';
import { pullProject } from '@/utils/git';
import { ElMessage } from 'element-plus';
import { writeFileItem, readFile } from '@/utils/files'

export const useWikiEditorStore = defineStore('wikiEditorStore', {
    state: () => ({
        content: "",
        path: "",
        headings: [],
        jsonContent: {},
        showEditor: false,
        block: "",
        page: "",
        extensions: {
            Link: {
                autoLink: true,
                openOnClick: true,
                linkOnPaste: true
            }
        }
    }),
    actions: {
        setPath(path) {
            this.$state.path = path;
        },
        async openEditor(callback) {
            await pullProject({
                success: () => {
                    this.$state.showEditor = true
                    callback && typeof callback === 'function' ? callback() : null
                },
                failure: (err) => {
                    console.log(err);
                    ElMessage({
                        type: "error",
                        message: `Failure to pull remote`
                    })
                    this.$state.showEditor = true
                }
            });

        },
        closeEditor() {
            this.$state.showEditor = false;
        },
        getPageName() {
            let pagearr = this.$state.path.split('/');
            return pagearr[pagearr.elngth - 1];
        },
        save() {
            let content = `<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} -->`;
            content += this.$state.content;
            content += `<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} end-->`;
            let fileContent = readFile(this.$state.path);
            content = fileContent.replace(`<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} -->`, content);
            pullProject({
                success: () => {
                    writeFileItem(this.$state.path, content)
                }
            })

        }
    }
});