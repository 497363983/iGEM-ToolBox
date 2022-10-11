import {
    defineStore
} from 'pinia';
import { readJSONFile, writeJSONFile } from "@/utils/index";
import { getReference } from "@/api/reference/getReference";
import { ElMessage } from 'element-plus';
import { pullProject, pushProject } from "@/utils/git";
import { useTemplateStore } from './template';

export const useReferenceStore = defineStore('referenceStore', {
    state: () => ({
        references: []
    }),
    actions: {
        getReferences(callback) {
            pullProject();
            readJSONFile(
                `${useTemplateStore().getProjectPath}\\tool_box\\references\\index.json`,
                (content) => {
                    this.$state.references = JSON.parse(content);
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                }
            );
        },
        importReferenceByDOI(doi, callback) {
            let references = this.$state.references;
            const doiList = references.map(item => {
                return item.doi
            })
            if (!doiList.includes(doi)) {
                getReference({
                    doi,
                    success: async function ({ reference }) {
                        references.push(reference);
                        await pullProject({
                            success: () => {
                                writeJSONFile(`${useTemplateStore().getProjectPath}\\tool_box\\references\\${doi.replace("/", "_")}.json`, reference, (data) => {
                                    console.log(data);
                                });
                                writeJSONFile(`${useTemplateStore().getProjectPath}\\tool_box\\references\\index.json`, references, (data) => {
                                    console.log(data);
                                });
                                pushProject({
                                    commitInformation: `upload references`,
                                    file: [`tool_box\\references\\index.json`, `tool_box\\references\\${doi.replace("/", "_")}.json`]
                                })
                                ElMessage({
                                    type: "success",
                                    message: `Import success!`
                                });
                                if (callback && typeof callback === 'function') {
                                    callback();
                                }
                            }
                        });
                    },
                    failure: function ({ err }) {
                        console.log(err);
                        ElMessage({
                            type: "error",
                            message: `Import failure!`
                        });
                    }
                });
            } else {
                ElMessage({
                    type: "info",
                    message: `DOI already exists`
                });
            }

        },
        saveReferences() {
            writeJSONFile(`${useTemplateStore().getProjectPath}\\tool_box\\references\\index.json`, this.$state.references, (data) => {
                console.log(data);
            });
        }
    }
});