const simpleGit = window.require('simple-git');

export async function getGit() {
    console.log(await simpleGit().raw('version'))
    return await simpleGit().raw('version');
}

export async function getAllBranch() {
    let branches = await simpleGit().raw('branch', '-a');
    return branches.split("\n")
}

export async function getBranch() {
    return await simpleGit().raw('symbolic-ref', '--short', '-q', 'HEAD');
}

export async function setBranch(branch) {
    await simpleGit().raw('checkout', branch);
}

export async function isGitRepository(projectPath) {
    return await simpleGit(projectPath).raw('rev-parse', '--is-inside-work-tree');
}

export async function cloneProject(options) {
    const { username, accessTokens, gitPath, projectPath } = options;
    const gitpath = `https://${username}:${accessTokens}@${gitPath.replace('https://', '')}`;
    if (!isGitRepository(projectPath)) {
        simpleGit(projectPath).clone(gitpath).then(() => console.log('cloned')).catch((err) => console.error('failed clone:', err));
    }
}

export async function pullProject(options) {
    const { success, failure, projectPath } = options;
    if (isGitRepository(projectPath)) {
        simpleGit(projectPath).pull().then((res) => {
            const { changes, deletions, insertions } = res.summary;
            if (changes !== 0 || deletions !== 0 || insertions !== 0) {
                simpleGit(projectPath).merge().then(() => (success && typeof success === 'function') ? success(res) : console.log('pull success', res)).catch((err) => console.log(err));
            } else {
                (success && typeof success === 'function') ? success(res) : console.log('pull success', res);
            }
        }).catch((err) => (failure && typeof failure === 'function') ? failure(err) : console.err('pull failed:', err));
    } else {
        cloneProject();
    }
}

export async function pushProject(options) {
    const { projectPath, commitInformation, branch = 'main', file } = options;
    // const gitpath = `https://${username}:${accessTokens}@${gitPath.replace('https://', '')}`;
    if (isGitRepository(projectPath)) {
        simpleGit(projectPath).add(file).commit(commitInformation).push(['origin', branch], (res) => console.log('push success', res));
    }
}

