import { defineStore } from 'pinia';
import AppStorage from '@/plugins/storage/index.js';
import { loginApi, changePwdApi } from '@/api/login';
import { jwtDecode } from "jwt-decode";
import md5 from 'md5';
import router from '@/router';

export const login = defineStore({
    id: 'login',
    state: () => ({
        expireTime: null,
        // name: null,
        username: null,
        email: null,
        // lang: null,
        // phone: null,
        // timezone: null,
        token: null,
        id: null,
        // groupId: null,
        // lastLogin: null,
        // saId: null,
        // country: null,
    }),

    getters: {
        // getName() {
        //     return this.name ? this.name : AppStorage.local.get('name');
        // },
        getUsername() {
            return this.username ? this.username : AppStorage.local.get('username');
        },
        getEmail() {
            return this.email ? this.email : AppStorage.local.get('email');
        },
        getId() {
            return this.id ? this.id : AppStorage.local.get('id');
        },
        // getLang() {
        //     return this.lang ? this.lang : AppStorage.local.get('lang');
        // },
        // getPhone() {
        //     return this.phone ? this.phone : AppStorage.local.get('phone');
        // },
        // getTimezone() {
        //     return this.timezone ? this.timezone : AppStorage.local.get('timezone');
        // },
        getToken() {
            return this.token ? this.token : AppStorage.local.get('token');
        },
        // getGroupId() {
        //     return this.groupId ? this.groupId : AppStorage.local.get('groupId');
        // },
        // getLastLogin() {
        //     return this.lastLogin ? this.lastLogin : AppStorage.local.get('lastLogin');
        // },
        // getSaId() {
        //     return this.saId ? this.saId : AppStorage.local.get('saId');
        // },
        // getCountry() {
        //     return this.country ? this.country : AppStorage.local.get('country');
        // },
    },

    actions: {
        async login_act(data) {
            data.pwd = md5(data.pwd);
            return loginApi.login(data).then(response => {
                return response
            }).catch(error => {
                throw error;
            });
        },

        async login_process(data) {
            return new Promise(resolve => {
                this.data_process(data);
                return resolve();
            })
        },

        async set_pwd_act(data) {
            data.pwd = md5(data.pwd);
            data.newPwd = md5(data.newPwd);
            
            return loginApi
                .setPwd(data)
                .then(async response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        },

        reset_pwd_act(data) {
            data.pwd = md5(data.pwd);
            data.newPwd = md5(data.newPwd);
            return changePwdApi
                .changePwd(data)
                .then(async response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        },

        logout_act() {
            return new Promise(resolve => {
                const data = {
                    expireTime: '',
                    // name: '',
                    username: '',
                    email: '',
                    // lang: '',
                    // phone: '',
                    // timezone: '',
                    token: '',
                    id: '',
                    // groupId: '',
                    // lastLogin: '',
                    // saId: '',
                    // country: '',
                }

                this.data_process(data);
                router.push({ name: 'Login' });
                return resolve();
            })
        },

        data_process(data) {
            console.log('data_process', data);
            return new Promise(resolve => {
                // this.name = data.name;
                // data.name ? AppStorage.local.set('name', data.name) : AppStorage.local.remove('name');

                this.username = data.user_name;
                data.user_name ? AppStorage.local.set('username', data.user_name) : AppStorage.local.remove('username');

                this.email = data.user_email;
                data.user_email ? AppStorage.local.set('email', data.user_email) : AppStorage.local.remove('email');

                this.id = data.id;
                data.id ? AppStorage.local.set('id', data.id) : AppStorage.local.remove('id');

                // this.lang = data.lang;
                // data.lang ? AppStorage.local.set('lang', data.lang) : AppStorage.local.remove('lang');

                // this.phone = data.phone;
                // data.phone ? AppStorage.local.set('phone', data.phone) : AppStorage.local.remove('phone');

                // this.timezone = data.timezone;
                // data.timezone ? AppStorage.local.set('timezone', data.timezone) : AppStorage.local.remove('timezone');

                this.token = data.token;
                data.token ? AppStorage.local.set('token', data.token) : AppStorage.local.remove('token');

                // this.groupId = data.grpId;
                // data.grpId ? AppStorage.local.set('grpId', data.grpId) : AppStorage.local.remove('grpId');

                // this.lastLogin = data.lastLogin;
                // data.lastLogin ? AppStorage.local.set('lastLogin', data.lastLogin) : AppStorage.local.remove('lastLogin');

                // this.saId = data.saId;
                // data.saId ? AppStorage.local.set('saId', data.saId) : AppStorage.local.remove('saId');

                // this.country = data.country;
                // data.country ? AppStorage.local.set('country', data.country) : AppStorage.local.remove('country');

                if (data.token) {
                    const expireTime = jwtDecode(data.token)

                    this.expireTime = expireTime.exp;
                    expireTime.exp ? AppStorage.local.set('expireTime', expireTime.exp) : AppStorage.local.remove('expireTime');
                }
                else {
                    this.expireTime = data.token;
                    data.token ? AppStorage.local.set('expireTime', data.token) : AppStorage.local.remove('expireTime');
                }

                return resolve();
            })
        },
    },
});