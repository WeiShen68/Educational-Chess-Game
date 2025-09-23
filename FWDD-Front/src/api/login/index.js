import Api from '../api';
import { sanitizeParams } from '@/utils/tools.js';

export const loginApi = {

  login(data) {
    sanitizeParams(data)
    return Api.post('login', data);
  },

  setPwd(data) {
    return Api.post('setlogin', data);
  },
  
};

export const changePwdApi = {
  changePwd(data) {
    const params = {
    };
    const headers = {
      Authorization: `Bearer ${data.token}`,
    };
    delete data.token

    return Api.post('merchant/changepassword', data, params, headers);
  },
}