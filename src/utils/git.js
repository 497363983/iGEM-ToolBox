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
    await simpleGit(useTemplateStore().getProjectPath).raw('remote', 'set-url', 'origin', useGitLabStore().gitPath);
}

export async function gitInit() {
    await simpleGit(useTemplateStore().getProjectPath).raw('config', 'user.name', `${useUserStore().username}`);
    await simpleGit(useTemplateStore().getProjectPath).raw('config', 'user.email', `${useUserStore().email}`);
}

export async function isGit() {
    let version = await simpleGit().raw('version');
    return version.includes("git version");
}

export async function getGitVersion() {
    return await simpleGit().version();
}

export async function getAllBranch() {
    let branches = await simpleGit(useTemplateStore().getProjectPath).raw('branch', '-a');
    return branches.split("\n")
}

export async function getBranch() {
    return await simpleGit(useTemplateStore().getProjectPath).raw('symbolic-ref', '--short', '-q', 'HEAD');
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
        await simpleGit(useTemplateStore().getProjectPath).raw('checkout', '-b', branchArr[branchArr.length - 1], remoteBranch);
    } else {
        await simpleGit(useTemplateStore().getProjectPath).raw('checkout', branch);
    }
}

export async function isGitRepository(projectPath) {
    return await simpleGit(projectPath).checkIsRepo();
}

export async function cloneProject() {
    // const { username, accessTokens } = options;
    // const gitpath = `https://${username}:${accessTokens}@gitlab.igem.org/${useCompetitionStore().year}/${useUserStore().team.toLowerCase().replace(/\s+/g, "-")}.git`;
    // console.log(gitpath)
    // if (!isGitRepository(useTemplateStore().getProjectPath)) {
    fs.access(useTemplateStore().getProjectPath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(useTemplateStore().getProjectPath, { recursive: true }, (err) => {
                if (!err) {
                    simpleGit(useTemplateStore().getProjectPath, { progress }).clone(useGitLabStore().getGitPath).then(() => console.log('cloned')).catch((err) => console.error('failed clone:', err));
                }
            });
        } else {
            simpleGit(useTemplateStore().getProjectPath, { progress }).clone(useGitLabStore().getGitPath).then(() => console.log('cloned')).catch((err) => console.error('failed clone:', err));
        }
    })

    // }
}

export async function pullProject(options) {
    let success = options?.success;
    let failure = options?.failure;
    if (isGitRepository(useTemplateStore().getProjectPath)) {
        console.log('start pull')
        simpleGit(useTemplateStore().getProjectPath).pull(useGitLabStore().getGitPath).then((res) => {
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
    if (isGitRepository(useTemplateStore().getProjectPath)) {
        await simpleGit(useTemplateStore().getProjectPath, { progress }).add(file).commit(commitInformation).push([useGitLabStore().getGitPath, useGitLabStore().currentBranch.trim()], (res) => {
            if (callback && typeof callback === 'function') {
                callback(res)
            }
        });
    }
}

export async function gitLog() {
    return await simpleGit(useTemplateStore().getProjectPath, { progress }).log();
}
