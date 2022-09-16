const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
// const https = require('https');

//user profile
const username = "sky1"
const password = "qian12345"
const filelist = [
    {
        "filename": "logo",
        "filepath": "E:\\iGEM\\igem2022\\iGEMWorkSpace\\iGEM-ToolBox\\src\\assets\\logo.png",
        "type": "ima"
    },
    {
        "filename": "hack-bold-subset",
        "filepath": "E:\\iGEM\\zjut-china\\src\\assets\\fonts\\hack-bold-subset.woff",
        "type": "ima"
    }
]

//Example
//Asynchronous
SyncFiles(filelist, username, password).then(URL_list => {
    console.log(URL_list)
});

//Synchronous
// URL_list = await SyncFiles(filelist,username,password);

//The main function use for SyncFiles
async function SyncFiles(filelist, username, password) {
    //Fetch cookie
    let cookie = await get_cookie(username, password)
    if (cookie == null) {
        return null;
    }
    //URL_list
    let URL_list = []
    //Upload each file
    for (let i = 0; i < filelist.length; i++) {
        console.log(filelist[i])
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filelist[i]["filepath"]));
        formData.append('directory', filelist[i]["type"]);
        URL_list.push(await SyncFile(cookie, formData))
    }
    return URL_list;
}

//Fetch cookie
function get_cookie(username, password) {
    return new Promise(() => {
        const data = 'return_to=https%3A%2F%2Fold.igem.org%2FLogin2&username=' + username + '&password=' + password + '&Login=Login'
        console.log(data)
        // const options = {
        //     hostname: 'old.igem.org',
        //     port: 443,
        //     path: '/Login2',
            
        //     method: 'POST',
        //     headers: {
        //         'Content-Length': data.length,
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     }
        // }
        // const req = https.request(options, (res) => {
        //     console.log("get cookie status:")
        //     console.log(res)
        //     console.log(res.statusCode)
        //     if (res.statusCode != 302) {
        //         console.log("get cookie error!")
        //         resolve(null);
        //     }
        //     let cookie = res.rawHeaders[9]
        //     console.log(cookie)
        //     resolve(cookie);
        // });
        // req.on('error', (error) => {
        //     console.error(error)
        // })
        // req.write(data)
        // req.end()
        axios({
            url: 'https://old.igem.org/Login2',
            method: 'POST',
            maxRedirects: 0,
            data: data ,
            headers: {
                'Content-Length': data.length,
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 ',
                // 'cookie': cookie
            }
        }
        const req = https.request(options, (res) => {
            console.log("get cookie status:")
            console.log(res, res.statusCode)
            if (res.statusCode != 302) {
                console.log("get cookie error!")
                resolve(null);
            }
            let cookie = res.rawHeaders[9]
            console.log(cookie)
            resolve(cookie);
        });
        req.on('error', (error) => {
            console.error(error)
        })
        // return res.data["location"];
    });
}


//Sync each file after fetch the cookie
async function SyncFile(cookie, formData) {
    const res = await axios({
        url: 'https://shim-s3.igem.org/v1/teams/4227/wiki',
        method: 'POST',
        data: formData,
        headers: {
            "Content-Type": "image/png",
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 ',
            'cookie': cookie
        }
    });
    console.log("uplod status:")
    console.log(res.status)
    return res.data["location"];
}






