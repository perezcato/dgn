/**
 * @Description: Helpers
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */

/** LIBRARY */
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { CommonActions } from '@react-navigation/native';

/** COMMON */
import { Key, Config, Languages, Device } from '~/config';
import { Toast } from 'native-base';
import { Colors } from '../colors';


/************************* */
export default Helpers = {

  setDataStorage: async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data === '' ? data : JSON.stringify(data));
    } catch (e) {
      console.log('Error: ', e);
      return null;
    }
  },

  prepareListPost: (list) => {
    let _list = [];
    if (list.length > 0) {
      list.map((item) => {
        let _tmpData = {
          id: item.id,
          title: item.title.rendered,
          time: item.date,
          excerpt: Helpers.stripTags(item.excerpt.rendered),
          orginData: item
        }
        if (item.acf) {
          if (item.acf.gallery && item.acf.gallery.length > 0) {
            _tmpData.images = item.acf.gallery;
          }
          if (item.format === 'video' && item.acf.zini_post_type === 'youtube') {
            _tmpData.video = item.acf.zini_youtube_url;
          }
        }
        if (item.featured_media) {
          _tmpData.thumbnail = item.featured_media;
        }
        _list.push(_tmpData);
      })
    }
    return _list;
  },

  /** Set async storage for rating */
  setAsyStrRating: async value => {
    try {
      await AsyncStorage.setItem(Key.ASYNC_STORAGE_RATING, value);
    } catch (error) {
      console.log('Error save to AsyncStorage: ', error);
      return null;
    }
  },

  getAsyStrRating: async () => {
    try {
      let value = await AsyncStorage.getItem(Key.ASYNC_STORAGE_RATING);
      if (value !== null) {
        if (typeof value === 'string') {
          return value;
        } else {
          return JSON.parse(value);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error get from AsyncStorage: ', error);
      return null;
    }
  },

  /** Set async storage for number to rating */
  setAsyStrNumberToRating: async value => {
    try {
      await AsyncStorage.setItem(Key.ASYNC_STORAGE_NUMBER_TO_RATING, value);
    } catch (error) {
      console.log('Error save to AsyncStorage: ', error);
      return null;
    }
  },

  getAsyStrNumberToRating: async () => {
    try {
      let value = await AsyncStorage.getItem(Key.ASYNC_STORAGE_NUMBER_TO_RATING);
      if (value !== null) {
        if (typeof value === 'string') {
          return value;
        } else {
          return JSON.parse(value);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error get from AsyncStorage: ', error);
      return null;
    }
  },

  getAsyncStorageBookmark: async () => {
    try {
      let value = await AsyncStorage.getItem(Key.ASYNC_STORAGE_BOOKMARK);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  setAsyncStorageBookmark: async (value) => {
    try {
      await AsyncStorage.setItem(Key.ASYNC_STORAGE_BOOKMARK, value);
    } catch (error) {
      return null;
    }
  },

  removeAsyncStorageBookmark: async () => {
    try {
      await AsyncStorage.removeItem(Key.ASYNC_STORAGE_BOOKMARK);
    } catch (error) {
      return null;
    }
  },

  getAsyncStorageSettings: async () => {
    try {
      let value = await AsyncStorage.getItem(Key.ASYNC_STORAGE_SETTINGS);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  setAsyncStorageSettings: async (value) => {
    try {
      await AsyncStorage.setItem(Key.ASYNC_STORAGE_SETTINGS, value);
    } catch (error) {
      return null;
    }
  },

  resetNavigation: (navigation, routeName, params) => {
    return navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }]
      })
    )
  },

  getAsyncStorageSettingsV2: async () => {
    try {
      let value = await AsyncStorage.getItem(Key.ASYNC_STORAGE_SETTINGS_V2);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  setAsyncStorageSettingsV2: async (value) => {
    try {
      await AsyncStorage.setItem(Key.ASYNC_STORAGE_SETTINGS_V2, value);
    } catch (error) {
      return null;
    }
  },

  getLastPeriod: (time, fullday) => {
    let _ago = moment() - moment(time);
    let _days = _ago / (1000 * 60 * 60 * 24);
    let _hours = _ago / (1000 * 60 * 60);
    let _minutes = _ago / (1000 * 60);
    if (_days > 1) {
      if (fullday == 'fullday') {
        return moment(time).format(Config.settingV2.general.date_format);
      }
      return Languages[Config.lang].AGO + ' ' + Math.floor(_days) + ' ' + Languages[Config.lang].TIME.DAY;
    }
    if (_hours < 24)
      return Languages[Config.lang].AGO + ' ' + Math.floor(_hours) + ' ' + Languages[Config.lang].TIME.HOUR;
    if (_minutes < 60)
      return Languages[Config.lang].AGO + ' ' + Math.floor(_minutes) + ' ' + Languages[Config.lang].TIME.MINUTE;
  },

  stripTags: (txt) => {
    return txt.replace(/(<([^>]+)>)/ig, "").replace(/\n/gi, '');
  },
  
  /**
   ** Remove multi data local storage
  **/
 removeMultiKeyStorage: async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log('Error: ', e);
    return null;
  }
},

  /**
   ** Remove data local storage
  **/
  removeKeyStorage: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log('Error: ', e);
      return null;
    }
  },

  /**
   ** Save data to local storage
  **/
  setDataStorage: async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data === '' ? data : JSON.stringify(data));
    } catch (e) {
      console.log('Error: ', e);
      return null;
    }
  },

  // add information
  getDataStorage: async (key) => {
    try {
      let res = await AsyncStorage.getItem(key);
      if (res) {
        if (res === '') return null;
        res = JSON.parse(res);
        return res;
      } else {
        return null;
      }
    } catch (e) {
      console.log('Error: ', e);
      return null;
    }
  },

  
  /**
   * Toast an message
   */
  showToastDuration: (style = {}, message = "", type = "success") => {
    Toast.show({
      style,
      position: "bottom",
      textStyle: {
        fontSize: Device.fS(14),
        fontFamily: Device.fontSlabRegular,
        color: Colors.WHITE_COLOR
      },
      text: message,
      duration: 2000,
      type
    });
  },
}
/************************** */
