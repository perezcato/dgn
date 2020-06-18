/**
 * @Description: Services User
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** API */
import Api from '../api';
import wpApi from '../../config/wp.api';

export default {
	getUserByID: async (userId) => {
		try{
			let results = Api.get(wpApi.user.detail + '/' + userId);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	}
}