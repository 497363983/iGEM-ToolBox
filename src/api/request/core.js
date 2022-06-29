import axios from 'axios';

export const request = {
    get: (options = {
        //The url of the request
        //required
        url: "",
        //The callback function of success
        success: null,
        //The callback function of failure
        failure: null,
        //The config of axios
        config: {}
    }) => {
        const {
            url,
            success,
            failure,
            config
        } = options;

        return new Promise((resolve, reject) => {
            axios.get(url, config).then((res) => {
                success ? resolve(success(res.data)) : resolve(res.data);
            }).catch((err) => {
                failure ? reject(failure(err)) : reject(err);
            });
        });
    },
    post: (options = {
        //The url of the request
        //required
        url: "",
        //The callback function of success
        success: null,
        //The callback function of failure
        failure: null,
        //The config of axios
        config: {}
    }) => {
        const {
            url,
            success,
            failure,
            config
        } = options;

        return new Promise((resolve, reject) => {
            axios.post(url, config).then((res) => {
                success ? resolve(success(res.data)) : resolve(res.data);
            }).catch((err) => {
                failure ? reject(failure(err)) : reject(err);
            });
        });
    }
};