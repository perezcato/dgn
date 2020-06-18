/**
 * @Description: WP API
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */

const wpApi = {
  categories: {
    list: '/wp/v2/categories'
  },
  posts: {
    listPost: '/wp/v2/posts'
  },
  postsRelated: {
    listPost: '/ziniapi/v1/getRelated'
  },
  popularPosts: {
    listPosts: '/ziniapi/v1/getPopularPosts'
  },
  media: {
    detail: '/wp/v2/media'
  },
  tags: {
    list: '/wp/v2/tags'
  },
  page: {
    detail: '/wp/v2/pages'
  },
  user: {
    detail: '/wp/v2/users'
  },
  setting: {
    detail: '/v1/mobile/settings',
    v2: '/ziniapi/v1/settings',
    home: '/ziniapi/v1/home',
  },
  settings: {
    home: '/ziniapi/v1/home',
  },
  pdf: {
    list: '/wp/v2/pdfs'
  },
  fcmToken: {
    register: '/pnfw/register'
  },
  comment: {
    host: '/wp/v2/comments',
    create: '/wp/v2/comments',
    delete: '/wp/v2/comments'
  }
}

export default wpApi;