// import { ElIcon } from 'element-plus';

const axios = require('axios');
const https = require('https');
const { existsSync, createReadStream } = require('fs');
const FormData = require('form-data');

/**
 * 
 * @param {filelist, username, password, teamID, event} args 
 * @returns
 */
export async function SyncFiles(args) {
    //Fetch cookies
    const { username, password, event, teamID, filelist } = args;
    let cookie , status = await get_cookie(username, password).catch((error, resolve) => {
        event.sender.send("SyncFiles:error", error)
        resolve(null)
    });

    if (status == 200){
        event.sender.send("SyncFiles:error", "wrong username or password")
    }else if(status == 404){
        event.sender.send("SyncFiles:error", "get cookie failed!")
    }

    if (cookie == null) {
        event.sender.send("SyncFiles:error", "error")
        return null;
    }
    event.sender.send("SyncFiles:return", "fetch cookie successful!")
    //URL_list
    let URL_list = []
    //Upload each file
    for (let i = 0; i < filelist.length; i++) {
        const formData = new FormData();
        if (!existsSync(filelist[i]["filepath"])) {
            event.sender.send("SyncFiles:error", "file '" + filelist[i]["filename"] + "' don't exist")
            console.log("file '" + filelist[i]["filename"] + "' don't exist")
            URL_list.push("Get url failed");
            continue;
        } else {
            formData.append('file', createReadStream(filelist[i]["filepath"], {
                encoding: 'utf8',
                autoClose: true
            }));
        }
        console.log(formData)
        formData.append('directory', filelist[i]["type"]);
        URL_list.push(await SyncFile(teamID, cookie, formData, event))
    }
    event.sender.send("SyncFiles:return", URL_list)
    return URL_list;
}


/**
 * @description Fetch cookie
 * @param {String} username 
 * @param {String} password 
 * @returns {Promise}
 */
export async function get_cookie(username, password) {
    return new Promise((resolve) => {
        const data = 'return_to=https%3A%2F%2Fold.igem.org%2FLogin2&username=' + username + '&password=' + password + '&Login=Login'
        // console.log(data)
        const options = {
            hostname: 'old.igem.org',
            port: 443,
            path: '/Login2',
            method: 'POST',
            headers: {
                'Content-Length': data.length,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        const req = https.request(options, (res) => {
            console.log("get cookie status:")
            // console.log(res)
            console.log(res.statusCode)
            if (res.statusCode == 200) {
                // event.sender.send("SyncFiles:error", "wrong username or password")
                resolve(null , 200);
            }
            let cookie = res.rawHeaders[9]
            // console.log(cookie)
            resolve(cookie , 0);
        });
        req.on('error', () => {
            resolve(null , 404);
            // event.sender.send("SyncFiles:error", "get cookie failed!")
        })
        req.write(data)
        req.end()
    });
}

/**
 * @description Sync each file after fetch the cookie
 * @param {String} teamID 
 * @param {String} cookie 
 * @param {FormData} formData 
 * @param {import('electron/renderer').Event} event 
 * @returns 
 */
async function SyncFile(teamID, cookie, formData, event) {
    console.log(teamID, cookie)
    console.log('https://shim-s3.igem.org/v1/teams/' + teamID.trim() + '/wiki')
    const res = await axios({
        url: 'https://shim-s3.igem.org/v1/teams/' + teamID.trim() + '/wiki',
        method: 'POST',
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 ',
            'cookie': cookie
        }
    }).catch((error) => {
        console.log(error)
        event.sender.send("SyncFiles:error", error)
    });
    console.log("upload status:")
    console.log(res.status)
    return res.data["location"];
}