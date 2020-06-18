/**
 * @Description: Services Post
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
import moment from 'moment';
/** API */
import Api from '../api';
import wpApi from '../../config/wp.api';

export default {

	getPostsByAuthor: async (authorId, page) => {
		try {
			let results = Api.get(wpApi.posts.listPost + '?author=' + authorId + (page ? '&page=' + page : ''));
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getPostsByCategory: async (cateId, page) => {
		try {
			let results = Api.get(wpApi.posts.listPost + '?categories=' + cateId + (page ? '&page=' + page : ''));
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getPostByID: async (postID) => {
		try {
			let results = Api.get(wpApi.posts.listPost + '/' + postID);
			console.log('results', results)
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getPostByKeySeach: async (key, page) => {
		try {
			let results = Api.get(wpApi.posts.listPost + '?search=' + key + (page ? '&=10&page=' + page : ''));
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getPostLatest: async (perPage = 10) => {
		try {
			let results = await Api.get(wpApi.posts.listPost + `?per_page=${perPage}`);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getPostByTagID: async (tagId, page) => {
		try {
			let results = Api.get(wpApi.posts.listPost + '?tags=' + tagId + (page ? '&page=' + page : ''));
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null
		}
	},

	getPostByArrayID: async (arr) => {
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
			let results = Api.get(wpApi.posts.listPost + '?include=' + str);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null
		}
	},

	getPostByFormat: async (format, page) => {
		try {
			let results = Api.get(wpApi.posts.listPost + '?filter[post_format]=post-format-' + format + '&page=' + page + '&timestamp=' + moment().valueOf());
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	getListPostRelated: async (id) => {
		try {
			let results = Api.get(wpApi.postsRelated.listPost + '/id=' + id);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},
	getListPopularPosts: async (id) => {
		try {
			let results = Api.get(wpApi.popularPosts.listPosts);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

}