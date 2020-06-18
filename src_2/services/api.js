/**
 * @Description: Api
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** COMMON */
import { Config } from '../config';

class Api {

  static headers() {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    return headers;
  }

  static get(route, version = 'v1') {
    return this.xhr(route, null, 'GET', version);
  }

  static put(route, params, version = 'v1') {
    return this.xhr(route, params, 'PUT', version);
  }

  static post(route, params, version = 'v1') {
    return this.xhr(route, params, 'POST', version);
  }

  static delete(route, params, version = 'v1') {
    return this.xhr(route, params, 'DELETE', version)
  }

  static async upload(route, params, version = 'v1') {
    let url = Config.host + '/api/' + version + '/mobile' + route;
    if (route.search('http') !== -1) {
      url = route;
    }
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: params
    };

    try {
      let resp = await fetch(url, options);
      let json = resp.json();
      if (resp.ok) {
        return json
      } else throw e;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  static async xhr(route, params, verb, version = 'v1') {
    let url = Config.host + '/wp-json' + route;
    if (route.search('http') !== -1) {
      url = route;
    }
    // console.log('============== Api.xhr.url =================', url);
    console.log(url);
    let options = {
      method: verb,
      headers: Api.headers(),
      body: params ? JSON.stringify(params) : null
    };
    // console.log('================ Api.xhr.options ' + route + ' =============', options);

    try {
      // console.log('============== Api.xhr ' + route + ' START FETCH =============');
      let resp = await fetch(url, options);
      // console.log('============== Api.xhr.resp ' + route + ' resp =============', resp);
      let respJSON = await resp.json();
      if (resp.ok) {
        // console.log('============== Api.xhr.resp ' + route + ' respJSON =============', respJSON);
        return respJSON;
      } else {
        // console.log('============== Api.xhr.throw ' + route + ' respJSON =============', respJSON);
        throw respJSON;
      }

    } catch (e) {
      console.log('============== Api.xhr.catch ' + route + ' =============', e);
      return e;
    }
  }
}

export default Api;