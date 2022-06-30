// const electron = window.require('electron');
// const {
//     ipcRenderer
// } = electron;
const simpleGit = window.require('simple-git');
import { computed } from 'vue';
import { useUserStore, useTemplateStore, useGitLabStore } from '@/store';


export async function cloneProject() {
    const { username, accessTokens } = computed(() => useUserStore().$state).value;
    const { gitPath } = computed(() => useGitLabStore().$state).value;
    const gitpath = computed(() => `https://${username}:${accessTokens}@${gitPath.replace('git@', '')}`).value;
    const { projectPath } = computed(() => useTemplateStore().$state).value;
    console.log(projectPath, gitpath);
    simpleGit(projectPath).clone(gitpath).then(() => console.log('cloned')).catch((err) => console.error('failed clone:', err));
}

export async function pullProject() {
    
}