import { editor } from "..";
// import { useFileSystemAccess } from '@vueuse/core';
import { openFileDialog } from "@/utils/useIPC";


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
            properties: ["openFile"]
        }, ({ canceled, filePaths }) => {
            if (!canceled) {
                editor
                    .chain()
                    .focus()
                    .setImage({ src: filePaths[0] })
                    .run();
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