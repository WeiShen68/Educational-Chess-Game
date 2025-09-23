import axios from 'axios';
import Exceptions from './exceptions/common';
import Rejections from './rejections';
import router from '@/router';
import { isUndefinedNullOrEmpty } from '@/utils/tools.js';
import { REJECT_CODE } from './rejections/enum';
import AppStorage from '@/plugins/storage/index.js';
import { login } from '@/store/login';

const baseApi = axios.create({
    // baseUrl: import.meta.env.VITE_API_URL,
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000,
});

const requestHandler = request => {
    const store = login();

    if (store.getToken) {
        let storageToken = AppStorage.local.get('token');

        // 用户在其他标签页退出了
        if (!storageToken) {
            store.logout_act().then(() => {
                router.replace({ name: 'Login' }).catch();
            });
        }
        // 让每个请求携带token
        request.headers['Authorization'] = 'Bearer ' + store.getToken;
    }
    return request;
};

const responseHandler = (response, exceptions = null) => {
    try {
        if (
            response.headers &&
            ('application/pdf' === response.headers['content-type'] ||
                'image/jpeg' === response.headers['content-type'] ||
                'application/xml' === response.headers['content-type']) ||
            'application/octet-stream;charset=utf-8' === response.headers['content-type']) {
            return response;
        }

        const responseCode = response.data.ret;

        if (responseCode != 0) {
            if (responseCode == 1131) {
                console.log('logout')
            }

            const rejection = Rejections.find(item => {
                return item.values.find(code => {
                    if (code == responseCode) return code;
                });
            });

            if (!isUndefinedNullOrEmpty(rejection)) {

                if (REJECT_CODE.UNAUTHORISED == rejection.code) {
                    // store.dispatch('logout_act').then(() => {
                    //     router.replace({ name: 'Login' }).catch();
                    //     if (!isUndefinedNullOrEmpty(response.data.msg) && !isUndefinedNullOrEmpty(response.data.ret))
                    //         // throw `${response.data.ret}: ${response.data.msg}`;
                    //         throw response.data.msg;
                    // });
                    console.log('logout')
                }

                if (REJECT_CODE.WRONGKEY == rejection.code) {
                    if (!isUndefinedNullOrEmpty(response.data.msg) && !isUndefinedNullOrEmpty(response.data.ret)) {
                        return Promise.reject(response.data.msg);
                    }
                }
            }

            if (!isUndefinedNullOrEmpty(exceptions)) {
                const exception = exceptions.find(item => {
                    if (item.path == response.config.url) return item;
                });

                if (!isUndefinedNullOrEmpty(exception)) {
                    const index = exception.values.findIndex(item => {
                        if (item == responseCode) return item;
                    });
                    if (index == -1) {
                        if (!isUndefinedNullOrEmpty(response.data.msg) && !isUndefinedNullOrEmpty(response.data.ret)) {
                            throw response.data.msg;
                        }
                        else console.log(response.data); //changed to UI display error
                        throw response.data;
                    } else {
                        return response.data;
                    }
                }
            }

            if (!isUndefinedNullOrEmpty(response.data.msg) && !isUndefinedNullOrEmpty(response.data.ret))
                throw response.data.msg;
            throw response.data;
        }
        return response.data;
    }
    catch (error) {
        console.log(error) //changed to UI display error
        return Promise.reject(error);
    }
};

const errorHandler = error => {
    return Promise.reject(error);
};

baseApi.interceptors.request.use(
    request => requestHandler(request),
    error => errorHandler(error)
);

baseApi.interceptors.response.use(
    response => responseHandler(response, Exceptions.Common),
    error => {
        const { response } = error;
        if (response) {
            const data = response.data;
            // console.log ("status",response.status)
            // console.log ("data", data)

            return data;
        }
        return Promise.reject(error);
    }
);

export default baseApi;