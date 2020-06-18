/**
 * @Description: Services Page
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** API */
import Api from '../api';
import wpApi from '../../config/wp.api';

export default {
	getPageByID: async (pageID) => {
		try{
			let results = Api.get(wpApi.page.detail + '/' + pageID);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	}
}