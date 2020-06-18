/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
/* COMMON */
import Services from '~/services';
/* COMPONENTS */
import { ViewListCategories } from './render';


class ListCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _categories: []
    }
  }

  /** FUNCTIONS */
  _getCategories = async () => {
    let { _categories } = this.state;
    let resp = await Services.Categories.getAllCategories()
    if (resp && resp.length > 0) {
      console.log("resp", resp)
      _categories = resp
    }
    this.setState({
      _categories,
      _loading: false
    })
  }

  _onPressItem = (item) => {
    this.props.navigation.navigate('subCategories', {
      categoryId: item.id,
      categoryName: item.name,
    });
  }

  /** LIFE CYCLE */
  componentDidMount() {
    this._getCategories()
  }

  /** RENDER */
  render() {
    return (
      <ViewListCategories
        state={this.state}
        onFunction={{
          onPressItem: this._onPressItem
        }}
      />
    )
  }
}
export default ListCategories;