import baseApi from './index';

export default {
    get(url, data = {}) {
        return baseApi({
            url: url,
            method: 'get',
            params: data,
        });
    },
    post(url, data, params, headers = {}) {
        return baseApi({
            url: url,
            method: 'post',
            data,
            params: params,
            headers: headers,
        });
    },
    put(url, data) {
        return baseApi({
            url: url,
            method: 'put',
            data,
        });
    },
    stream(url, params = null) {
        return baseApi({
            url,
            responseType: 'blob',
            method: 'GET',
            params,
        })
    }
};