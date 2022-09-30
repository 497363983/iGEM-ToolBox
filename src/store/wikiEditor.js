import {
    defineStore
} from 'pinia';
import { pullProject, pushProject } from '@/utils/git';
import { ElMessage } from 'element-plus';
import { readFile, writeFileItem } from '@/utils/files';
import { useTemplateStore } from './template';
import { useUserStore } from './user';
import path from 'path';
const beautify_html = require('js-beautify').html;

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
    getters: {
        getBlockPath: (state) => (extname = 'html') => path.join(useTemplateStore().projectPath, `tool_box/${useUserStore().username}/pages/${state.page}/block/${state.block}.${extname}`)
    },
    actions: {
        setPath(path) {
            this.$state.path = path;
        },
        async openEditor(callback) {
            await pullProject({
                success: () => {
                    this.$state.showEditor = true
                    callback && typeof callback === 'function' ? callback(null) : null
                },
                failure: (err) => {
                    console.log(err);
                    ElMessage({
                        type: "error",
                        message: `Failure to pull remote`
                    });
                    this.$state.showEditor = true;
                    callback && typeof callback === 'function' ? callback(err) : null
                }
            });
        },
        closeEditor() {
            this.$state.showEditor = false;
        },
        getPageName() {
            let pagearr = this.$state.path.split('/');
            return pagearr[pagearr.length - 1];
        },
        save() {
            let content = `<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} start-->\n`;
            content += this.$state.content + '\n';
            content += `<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} end-->\n`;
            let fileContent = readFile(this.$state.path);
            const testBlock = new RegExp(`<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} -->`);
            if (testBlock.test(fileContent)) {
                content = fileContent.replace(`<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} -->`, content);
            } else {
                const editBlock = new RegExp(`(<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} (|start)-->)([\\s\\S]*?)(<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} (|end)-->)`);
                content = fileContent.replace(editBlock, content);
            }
            pullProject({
                success: () => {
                    writeFileItem(this.$state.path, beautify_html(content, { end_with_newline: true }), () => {
                        pushProject({
                            commitInformation: `upload block`,
                            file: [`tool_box\\${useUserStore().username}\\pages\\${this.$state.page}\\block\\${this.$state.block}.html`, `wiki\\pages\\${this.$state.page}.html`]
                        }, (res) => {
                            console.log('push', res)
                        });
                    });
                }
            })
        },
        saveBlock() {
            // pullProject({
            //     success: () => {
            writeFileItem(this.getBlockPath(), this.$state.content)
            console.log(this.getBlockPath(), this.$state.content)
            //     }
            // })
        },
        readBlock() {
            this.$state.content = readFile(this.getBlockPath(), (err) => {
                if (err) {
                    writeFileItem(this.getBlockPath(), '');
                }
            });
            console.log('content', this.$state.content)
        }
    }
});