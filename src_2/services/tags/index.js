/**
 * @Description: Services TAG
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** API */
import Api from '../api';
import wpApi from '../../config/wp.api';

export default {

	getList: async () => {
		try {
			let results = Api.get(wpApi.tags.list);
			return results;

		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getListTagByArrayID: async (arr) => {
		try {
			//create string url from array id (str: id[0],id[1],...)
			let str = '';
			for (let i = 0; i < arr.length; i++) {
				if (i == arr.length - 1) {
					str += arr[i];
				} else {
					str += arr[i] + ',';
				}
			}
			let results = Api.get(wpApi.tags.list + '?includes=' + str);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null
		}
	},


	getInfoByID: async (id) => {
		try {
			let results = Api.get(wpApi.tags.list + '/' + id);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},
}