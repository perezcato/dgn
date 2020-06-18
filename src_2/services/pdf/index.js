/**
 * @Description: Services Post
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** API */
import Api from '../api';
import wpApi from '../../config/wp.api';

export default {

	getPdf: async (page) => {
		try {
			let results = Api.get(wpApi.pdf.list + '?' + (page ? 'page=' + page : ''));
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getPdfByID: async (pdfID) => {
		try {
			let results = Api.get(wpApi.posts.listPost + '/' + pdfID);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	}

}