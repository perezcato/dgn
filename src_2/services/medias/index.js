/**
 * @Description: Services Media
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** API */
import Api from '../api';
import wpApi from '../../config/wp.api';

export default {
	getMedia: async (id) => {
		try {
			let results = Api.get(wpApi.media.detail + '/' + id);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getMediaByArrayID: async (arr) => {
		try {
			let str = '', i;
			for (i = 0; i < arr.length; i++) {
				if (i == arr.length - 1) {
					str += arr[i];
				} else {
					str += arr[i] + ',';
				}
			}
			let results = Api.get(wpApi.media.detail + '?include=' + str);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	}
}