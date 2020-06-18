/**
 * @Description: Services Setting
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** API */
import Api from '../api';
import wpApi from '../../config/wp.api';
import { Content } from 'native-base';

export default {
	listComment: async (params) => {
		let newUrl = wpApi.comment.host + "?post=" + params.post + "&page=" + params.page +
			"&per_page=" + params.per_page
		console.log(newUrl)
		try {
			let results = Api.get(newUrl);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},
	//?post={{commentPostId}}&content={{content}}&author_name={{author}}&author_email={{email}}
	createComment: async (params) => {
		let newUrl = wpApi.comment.create + "?post=" + params.post + "&content=" + params.content +
			"&author_name=" + params.author_name + '&author_email=' + params.author_email
		try {
			let results = Api.post(newUrl);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},
	// {{commentId}}
	deleleComment: async (params) => {
		let newUrl = wpApi.comment.delete + "/" + params.commentId
		try {
			let results = Api.delete(newUrl);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

}