/**
 ** FileName: 
 ** FileAuthor: 
 ** FileCreateAt: 
 ** FileDescription: 
**/
/* LIBRARY */
import React, { Component } from 'react';
import { Animated } from 'react-native';
/* COMPONENTS */
import { ViewAuthor } from './render';
/** COMMON */
import Services from '~/services';
import Helpers from '~/utils/helpers';
import { Config } from '~/config';

class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _refreshing: false,
      _loadmore: false,
      _dataPost: props.route.params.dataPost,
      _dataAuthor: null,
      _dataPostsOfAuthor: [],
      _scrollY: new Animated.Value(0)
    }
    this._page = 1;
    this._categorySetting = Config.settingV2.blog;
    this.author_style = this._categorySetting.blog_layout ?
      this._categorySetting.blog_layout : Config.layout.left_thumb;
    this.author_show_title = this._categorySetting.blog_show_title;
    this.author_show_excerpt = this._categorySetting.blog_show_excerpt;
  }

  /* FUNCTIONS */
  _getDataAuthor = async (id) => {
    let resAuthor = await Services.Users.getUserByID(id);
    console.log('Author: ', resAuthor);
    if (resAuthor) return resAuthor;
    return this.state._dataAuthor;
  }

  _getDataPosts = async (idAuthor) => {
    let resPosts = await Services.Posts.getPostsByAuthor(idAuthor, this._page);
    console.log('Post of Author: ', resPosts);
    if (resPosts) {
      this._page += 1;
      resPosts = Helpers.prepareListPost(resPosts);
      return resPosts;
    }
    return this.state._dataPostsOfAuthor;
  }

  _getDataFromServer = async () => {
    let { _dataPost } = this.state;
    let authorId = _dataPost.orginData.author.id;
    /** GET AUTHOR BY ID */
    let tmpAuthor = await this._getDataAuthor(authorId);
    /** GET POST BY AUTHOR */
    let tmpPosts = await this._getDataPosts(authorId);

    this.setState({
      _dataAuthor: tmpAuthor,
      _dataPostsOfAuthor: tmpPosts,
      _loading: false,
      _refreshing: false
    })
  }

  _onPressPostsOfAuthor = (dataPost) => {
    this.props.navigation.navigate('post', {
      data: dataPost
    });
  }

  _onRefreshPostsOfAuthor = () => {
    this._page = 1;
    this.setState({ _refreshing: true });
    this._getDataFromServer();
  }

  _onLoadmorePostsOfAuthor = async () => {
    if (this.state._loadmore) return;
    this.setState({ _loadmore: true });
    /** GET MORE POST BY AUTHOR */
    let tmpPosts = await this._getDataPosts(this.state._dataPost.orginData.author);
    if (tmpPosts && tmpPosts.length > 0) {
      this.setState({
        _dataPostsOfAuthor: [...this.state._dataPostsOfAuthor, ...tmpPosts],
        _loadmore: false
      })
    }
  }

  _isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  /* LIFE CYCLE */
  componentDidMount() {
    this._getDataFromServer();
  }

  /* RENDER */
  render() {
    return (
      <ViewAuthor
        state={this.state}
        setting={{
          style: this.author_style,
          title: this.author_show_title,
          excerpt: this.author_show_excerpt
        }}
        onPress={{
          postsOfAuthor: this._onPressPostsOfAuthor
        }}
        onRefresh={this._onRefreshPostsOfAuthor}
        onLoadmore={this._onLoadmorePostsOfAuthor}
        onCloseToBottom={this._isCloseToBottom}
      />
    )
  }

}

export default Author;