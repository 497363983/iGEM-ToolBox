import { useTemplateStore, useGitLabStore, useUserStore, useGitStore } from '@/store';
// import simpleGit from "simple-git";
const simpleGit = window.require("simple-git");

const progress = ({ method, stage, progress }) => {
    console.log(`git.${method} ${stage} stage ${progress}% complete `)
    useGitStore().method = method;
    useGitStore().progress = progress;
    useGitStore().stage = stage;
}

export async function setGitPath() {
    await simpleGit(useTemplateStore().projectPath).raw('remote', 'set-url', 'origin', useGitLabStore().gitPath);
}

export async function gitInit() {
    await simpleGit(useTemplateStore().projectPath).raw('config', 'user.name', `${useUserStore().username}`);
    await simpleGit(useTemplateStore().projectPath).raw('config', 'user.email', `${useUserStore().email}`);
}

export async function isGit() {
    let version = await simpleGit(useTemplateStore().projectPath).raw('version');
    return version.includes("git version");
}

export async function getGitVersion() {
    let version = await simpleGit(useTemplateStore().projectPath).raw('version');
    version = version.replace("git version", "");
    version = version.replace("\n", "");
    return version;
}

export async function getAllBranch() {
    let branches = await simpleGit(useTemplateStore().projectPath).raw('branch', '-a');
    return branches.split("\n")
}

export async function getBranch() {
    return await simpleGit(useTemplateStore().projectPath).raw('symbolic-ref', '--short', '-q', 'HEAD');
}
/**
 * 
 * @param {String} branch 
 */
export async function setBranch(branch) {
    if (branch.includes("remotes/origin")) {
        let remoteBranch = branch.replace("remotes/", "");
        let branchArr = branch.split("/");
        console.log(remoteBranch, branchArr)
        await simpleGit(useTemplateStore().projectPath).raw('checkout', '-b', branchArr[branchArr.length - 1], remoteBranch);
    } else {
        await simpleGit(useTemplateStore().projectPath).raw('checkout', branch);
    }

    // await pullProject();
}

export async function isGitRepository() {
    return await simpleGit(useTemplateStore().projectPath).raw('rev-parse', '--is-inside-work-tree');
}

export async function cloneProject(options) {
    const { username, accessTokens, gitPath } = options;
    const gitpath = `https://${username}:${accessTokens}@${gitPath.replace('https://', '')}`;
    if (!isGitRepository(useTemplateStore().projectPath)) {
        simpleGit(useTemplateStore().projectPath).clone(gitpath).then(() => console.log('cloned')).catch((err) => console.error('failed clone:', err));
    }
}

export async function pullProject(options) {
    let success = options?.success;
    let failure = options?.failure;
    if (isGitRepository(useTemplateStore().projectPath)) {
        console.log('start pull')
        simpleGit(useTemplateStore().projectPath).pull().then((res) => {
            // const { changes, deletions, insertions } = res.summary;
            // if (changes !== 0 || deletions !== 0 || insertions !== 0) {
            //     simpleGit(useTemplateStore().projectPath).merge().then(() => (success && typeof success === 'function') ? success(res) : console.log('pull success', res)).catch((err) => console.log(err));
            // } else {
            console.log('pull end', res);
            (success && typeof success === 'function') ? success(res) : console.log('pull success', res);
            // }
        }).catch((err) => (failure && typeof failure === 'function') ? failure(err) : console.log('pull failed:', err));
    } else {
        cloneProject();
    }
}
/**
 * 
 * @param {Object} options 
 * @param {Function} callback 
 */
export async function pushProject(options, callback) {
    const { commitInformation, file } = options;
    // const gitpath = `https://${username}:${accessTokens}@${gitPath.replace('https://', '')}`;
    if (isGitRepository(useTemplateStore().projectPath)) {
        console.log('start push')
        await simpleGit(useTemplateStore().projectPath, { progress }).add(file).commit(commitInformation).push(['origin', useGitLabStore().currentBranch.trim()], (res) => {
            console.log('push end', res)
            if (callback && typeof callback == 'function') {
                callback(res)
            }
        });
    }
}

