import { editor } from "..";
// import { useFileSystemAccess } from '@vueuse/core';
import { openFileDialog, SyncFiles, SyncFiles_return } from "@/utils/useIPC";
import { useUserStore, useCompetitionStore } from "@/store";
import { baseName } from "@/utils/files";

export const floating = [
    {
        role: "item",
        icon: "image",
        title: "Image",
        // action: () => {
        //     const { file, open, isSupported } = useFileSystemAccess({
        //         types: [{
        //             accept: ['.png', '.jpg', '.gif', '.jpeg', '.svg']
        //         }]
        //     });
        //     console.log('isSupported', isSupported.value, window)
        //     open().then(() => {
        //         editor
        //             .chain()
        //             .focus()
        //             .setImage({ src: file })
        //             .run();
        //     })
        // }
        action: () => openFileDialog({
            filters: [{ name: "images", extensions: ['png', 'jpg', 'gif', 'jpeg', 'svg'] }],
            properties: ["openFile"],
            title: 'choose image'
        }, ({ canceled, filePaths }) => {
            console.log(filePaths, baseName(filePaths[0]))
            if (!canceled) {
                SyncFiles([{
                    filepath: filePaths[0],
                    filename: baseName(filePaths[0]),
                    type: 'image'
                }], useUserStore().username, useUserStore().password, useCompetitionStore().teamID)
                SyncFiles_return((data) => {
                    editor
                        .chain()
                        .focus()
                        .setImage({ src: data[0] })
                        .run();
                })

            }
        })
    },
    {
        role: "item",
        icon: "table",
        title: "Table",
        action: () => addTable(),
    },
];


function addTable() {
    editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
}