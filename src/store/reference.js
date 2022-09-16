import {
    defineStore
} from 'pinia';
import { readJSONFile, writeJSONFile } from "@/utils/index";
import getReference from "@/api/reference/getReference";
import { ElMessage } from 'element-plus';
import { pullProject } from "@/utils/git";

const jsonPath = "E:\\iGEM\\igem2022\\iGEMWorkSpace\\iGEM-ToolBox\\testData\\references\\index.json";

export const useReferenceStore = defineStore('referenceStore', {
    state: () => ({
        references: []
    }),
    actions: {
        getReferences(callback) {
            //TODO:get references from gitlab
            pullProject()
            readJSONFile(
                jsonPath,
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
            getReference({
                doi,
                success: function ({ reference }) {
                    references.push(reference);
                    writeJSONFile("E:\\iGEM\\igem2022\\iGEMWorkSpace\\iGEM-ToolBox\\testData\\references.json", references, (data) => {
                        console.log(data);
                    });
                    ElMessage({
                        type: "success",
                        message: `Import success!`
                    });
                    console.log(callback, typeof callback);
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                },
                failure: function ({ err }) {
                    console.log(err);
                    ElMessage({
                        type: "error",
                        message: `Import failure!`
                    });
                }
            });
        },
        saveReferences() {
            writeJSONFile(jsonPath, this.$state.references, (data) => {
                console.log(data);
            });
        }
    }
});