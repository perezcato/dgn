/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React, { Component, Children } from 'react';
/* COMPONENT */
import { ViewComment } from './render';
import Services from '~/services';
import { Key } from '~/config';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _refreshing: false,
      _data: [],
      _newData: [],
      _isLoadMore: true,
      _comment: "",
    }
    this._page = 1;
    this._limit = 10;
  }

  /** FUNCTIONS */
  _getListComment = async (TYPE) => {
    let { id } = this.props.route.params;
    let { _data, _isLoadMore } = this.state;
    let params = {
      post: id,
      page: this._page,
      per_page: this._limit
    }
    let res = await Services.Comment.listComment(params);
    if (res && !res.code) {
      this.changeData(res);
      if (res.length < this._limit) _isLoadMore = false;
      if (res.length > 0) {
        if (TYPE === Key.REFRESH) {
          _data = [...res]
        } else if (TYPE === Key.LOAD_MORE) {
          _data = [..._data, ...res]
        }
        this._page += 1;
      } else {
        _isLoadMore = false;
      }
    }
    this.setState({
      _data,
      _isLoadMore,
      _refreshing: false,
      _loading: false
    })
  }

  changeData(data) {
    let newData = [];
    let children = [];
    newData = data.filter(e => e.parent === 0);
    children = data.filter(e => e.parent !== 0);
    for (let x of newData) {
      for (let y of children) {
        if (x.id === y.parent) {
          if (x.reply) {
            x.reply.push(y)
          } else {
            x.reply = [y]
          }
        }
      }
    }
    this.setState({
      _newData: newData
    })
  }

  _onRefresh = () => {
    this.setState({
      _refreshing: true,
      _isLoadMore: true
    });
    this._page = 1;
    this._getListComment(Key.REFRESH);
  }

  _onLoadMore = () => {
    if (this.state._isLoadMore) {
      this._getListComment(Key.LOAD_MORE)
    }
  }

  _onChangeText = (text) => {
    this.setState({
      _comment: text
    })
  }

  _onCreateComment = async () => {
    let { id } = this.props.route.params;
    const { _comment } = this.state;
    let params = {
      post: id,
      content: _comment,
      // author_name: author_name,
      // author_email: author_email,
    }
    // let res = await Services.Comment.createComment(params);
    console.log('res', params)
    this.setState({
      _comment: '',
    })
    this._getListComment(Key.REFRESH);
  }

  _onDeleteComment = async (id) => {
    let params = {
      commentId: id,
    }
    let res = await Services.Comment.deleleComment(params);
    console.log('res', params)
    this._getListComment(Key.REFRESH);
  }

  /** LIFE CYCLE */
  componentDidMount() {
    this._getListComment(Key.REFRESH)
  }

  /** RENDER */
  render() {
    return (
      <ViewComment
        state={this.state}
        props={this.props}
        onFunction={{
          onChangeText: this._onChangeText,
          onCreateComment: this._onCreateComment,
          onDeleteComment: this._onDeleteComment,
        }}
      />
    )
  }
}

export default Comment;
