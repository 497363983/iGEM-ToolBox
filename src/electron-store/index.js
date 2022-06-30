const Store = window.require('electron-store');

const schema = {
    config: {
        type: 'object'
    },
    user: {
        type: 'object'
    }
}

export const electronStore = new Store({ schema });

