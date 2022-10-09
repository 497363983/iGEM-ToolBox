import { electronStore } from "@/electron-store";

export const keepData = (option) => {
    const { idList } = option;
    return ({ store }) => {
        const key = store.$id.toLowerCase().slice(0, -5);
        let data = electronStore.get(key);
        if (idList.includes(store.$id)) {
            console.log(store)
            store.$subscribe(() => {
                electronStore.set(key, store.$state);
            })
        }
        return data
    }
}