/**
 * @Description: Services Category
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** API */
import Api from '../api';
import wpApi from '../../config/wp.api';

export default {
	getSubCategories: async (params) => {
		try {
			let newUrl = wpApi.categories.list + "?parent=" + params.id
			let results = Api.get(newUrl);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getAllCategories: async () => {
		try {
			let newUrl = wpApi.categories.list + "?parent=0";
			let results = Api.get(newUrl);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getListCategoriesByArrayID: async (arr) => {
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
			let results = Api.get(wpApi.categories.list + '?includes=' + str);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null
		}
	},

	getCateByID: async (id) => {
		try {
			let results = Api.get(wpApi.categories.list + '/' + id);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getCateByArrayID: async (arr) => {
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
			let results = Api.get(wpApi.categories.list + '?include=' + str);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null
		}
	},
}