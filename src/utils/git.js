import { useTemplateStore, useGitLabStore, useUserStore, useGitStore } from '@/store';
// import simpleGit from "simple-git";
const fs = window.require('fs');
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
    let version = await simpleGit().raw('version');
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
}

export async function isGitRepository(projectPath) {
    return await simpleGit(projectPath).checkIsRepo();
}

export async function cloneProject() {
    // const { username, accessTokens } = options;
    // const gitpath = `https://${username}:${accessTokens}@gitlab.igem.org/${useCompetitionStore().year}/${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}.git`;
    // console.log(gitpath)
    // if (!isGitRepository(useTemplateStore().projectPath)) {
    fs.access(useTemplateStore().projectPath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(useTemplateStore().projectPath, { recursive: true }, (err) => {
                if (!err) {
                    simpleGit(useTemplateStore().projectPath, { progress }).clone(useGitLabStore().getGitPath).then(() => console.log('cloned')).catch((err) => console.error('failed clone:', err));
                }
            });
        } else {
            simpleGit(useTemplateStore().projectPath, { progress }).clone(useGitLabStore().getGitPath).then(() => console.log('cloned')).catch((err) => console.error('failed clone:', err));
        }
    })

    // }
}

export async function pullProject(options) {
    let success = options?.success;
    let failure = options?.failure;
    if (isGitRepository(useTemplateStore().projectPath)) {
        console.log('start pull')
        simpleGit(useTemplateStore().projectPath).pull(useGitLabStore().getGitPath).then((res) => {
            console.log('pull end', res);
            (success && typeof success === 'function') ? success(res) : console.log('pull success', res);
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
        await simpleGit(useTemplateStore().projectPath, { progress }).add(file).commit(commitInformation).push([useGitLabStore().getGitPath, useGitLabStore().currentBranch.trim()], (res) => {
            console.log('push end', res)
            if (callback && typeof callback == 'function') {
                callback(res)
            }
        });
    }
}

export async function gitLog() {
    return await simpleGit(useTemplateStore().projectPath, { progress }).log();
}
