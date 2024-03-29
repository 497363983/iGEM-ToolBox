import {
    defineStore
} from 'pinia';
import { h } from "vue";
import { readJSONFile } from '@/utils';
import { pullProject, pushProject } from '@/utils/git';
import { ElMessage, ElNotification, ElProgress } from 'element-plus';
import { readFile, writeFileItem } from '@/utils/files';
import { useTemplateStore } from './template';
import { useUserStore } from './user';
import { useGitStore } from './git';
import path from 'path';
import { DOMcreateElement, getTemplates } from '@/TiptapEditor/utils/useTemplate';
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
        },

    }),
    getters: {
        getBlockPath: (state) => (extname = 'html') => path.join(useTemplateStore().getProjectPath, `tool_box/${useUserStore().username}/pages/${state.page}/block/${state.block}.${extname}`)
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
        async save(callback) {
            ElNotification({
                title: useGitStore().method,
                message: h(ElProgress, {
                    percentage: useGitStore().progress
                }),
                duration: 0
            })
            getTemplates();
            let content = `<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} start-->\n`;
            content += DOMcreateElement(this.$state.jsonContent) + '\n';
            content += `<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} end-->`;
            let fileContent = readFile(this.$state.path);
            const testBlock = new RegExp(`<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} -->`);
            if (testBlock.test(fileContent)) {
                content = fileContent.replace(`<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} -->`, content);
            } else {
                const editBlock = new RegExp(`(<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} (|start)-->)([\\s\\S]*?)(<!-- iGEM-ToolBox:WIKI{{${this.$state.block}}} (|end)-->)`);
                content = fileContent.replace(editBlock, content);
            }
            await pullProject({
                success: () => {
                    console.log('start write')
                    writeFileItem(this.$state.path, beautify_html(content, { end_with_newline: false }), () => {
                        pushProject({
                            commitInformation: `upload block`,
                            file: [
                                `tool_box\\${useUserStore().username}\\pages\\${this.$state.page}\\block\\${this.$state.block}.html`,
                                `tool_box\\${useUserStore().username}\\pages\\${this.$state.page}\\block\\${this.$state.block}.json`,
                                `${useTemplateStore().getPageTemplatePath}\\${this.$state.page}.${useTemplateStore().getPageExtName}`
                            ]
                        }, (res) => {
                            console.log('push', res)
                            callback && typeof callback === 'function' ? callback(res) : null;
                        });
                    });
                }
            })
        },
        saveBlock() {
            // pullProject({
            //     success: () => {
            writeFileItem(this.getBlockPath(), this.$state.content)
            writeFileItem(this.getBlockPath('json'), JSON.stringify(this.$state.jsonContent))
            console.log(this.getBlockPath('json'), this.$state.content, this.$state.jsonContent)
            //     }
            // })
        },
        readBlock() {
            this.$state.content = readFile(this.getBlockPath(), (err) => {
                if (err) {
                    writeFileItem(this.getBlockPath(), '');
                }
            });

            readJSONFile(this.getBlockPath('json'), (data) => {
                this.$state.jsonContent = JSON.parse(data)
                console.log(this.$state.jsonContent)
            })


            // this.$state.jsonContent = JSON.parse(readFile(this.getBlockPath('json'), (err) => {
            //     if (err) {
            //         writeFileItem(this.getBlockPath(), {});
            //     }
            // }))
            console.log('content', this.$state.content)
        }
    }
});