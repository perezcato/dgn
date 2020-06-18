/**
 * @Description: Services Setting
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** API */
import Api from '../api';
import wpApi from '../../config/wp.api';

export default {
	getSetting: async () => {
		try {
			let results = Api.get(wpApi.setting.detail);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getSettingV2: async () => {
		try {
			let results = Api.get(wpApi.setting.v2);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getHomeSettings: async () => {
		try {
			let results = Api.get(wpApi.settings.home);
			console.log('res', results)
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	}
}