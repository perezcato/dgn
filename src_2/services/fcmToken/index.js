/**
 * @Description: Services FCM Token
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** API */
import { Config } from '../../config';

export default {
  register: async (params) => {
    let formData = new FormData();
    formData.append('os', params.os);
    formData.append('token', params.token);

    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    };

    try {
      console.log('options: ', options)
      let resp = await fetch(Config.host + '/pnfw/register', options);
      console.log('register: ', resp)
      return resp;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  }
}