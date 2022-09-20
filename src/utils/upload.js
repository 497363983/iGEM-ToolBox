const axios = require('axios');
const https = require('https');
const { existsSync, createReadStream } = require('fs');
const FormData = require('form-data');
/*
 * @params args: { filelist, username, password, teamID, event }
 */
export async function SyncFiles(args) {
    //Fetch cookies
    let cookie = await get_cookie(args.username, args.password, args.event).catch((error, resolve) => {
        args.event.sender.send("SyncFiles:error", error)
        resolve(null)
    });
    if (cookie == null) {
        args.event.sender.send("SyncFiles:error", "error")
        return null;
    }
    args.event.sender.send("SyncFiles:return", "fetch cookie successful!")
    //URL_list
    let URL_list = []
    //Upload each file
    for (let i = 0; i < args.filelist.length; i++) {
        const formData = new FormData();
        if (!existsSync(args.filelist[i]["filepath"])) {
            args.event.sender.send("SyncFiles:error", "file '" + args.filelist[i]["filename"] + "' don't exist")
            console.log("file '" + args.filelist[i]["filename"] + "' don't exist")
            URL_list.push("Get url failed");
            continue;
        } else {
            formData.append('file', createReadStream(args.filelist[i]["filepath"]));
        }
        formData.append('directory', args.filelist[i]["type"]);
        URL_list.push(await SyncFile(args.teamID, cookie, formData, args.event))
    }
    args.event.sender.send("SyncFiles:return", URL_list)
    return URL_list;
}

//Fetch cookie
async function get_cookie(username, password, event) {
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
                event.sender.send("SyncFiles:error", "wrong username or password")
                resolve(null);
            }
            let cookie = res.rawHeaders[9]
            // console.log(cookie)
            resolve(cookie);
        });
        req.on('error', () => {
            resolve(null);
            event.sender.send("SyncFiles:error", "get cookie failed!")
        })
        req.write(data)
        req.end()
    });
}


//Sync each file after fetch the cookie
async function SyncFile(teamID, cookie, formData, event) {
    console.log(teamID, cookie, formData, event)
    const res = await axios({
        url: `https://shim-s3.igem.org/v1/teams/${teamID.trim()}/wiki`,
        method: 'POST',
        data: formData,
        headers: {
            "Content-Type": "image/png",
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 ',
            'cookie': cookie
        }
    }).catch((error) => {
        event.sender.send("SyncFiles:error", error)
        console.log(error)
    });
    console.log("upload status:")
    console.log(res.status)
    return res.data["location"];
}