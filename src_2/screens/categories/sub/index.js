/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
**/
/* LIBRARY */
import React from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
/* COMPONENTS */
import { ViewSubCategories } from './render';
import CHeader from '~/components/CHeader';
import CLoading from '~/components/CLoading';
import CText from '~/components/CText';
import { TwoColumn } from '~/components/CLayout';
import Item from '~/components/CItem';
import CScrollView from '~/components/CScrollView';
/** COMMON */
import { Config, Device } from '~/config';
import Services from '~/services';
import * as sideMenuActions from '~/redux/actions/side_menu';
import Helpers from '~/utils/helpers';
import styles from './style';
import { Colors } from '~/utils/colors';
import { commonFonts } from '~/utils/styles';
import { layoutWidth } from '~/utils/layout_width';
import { commonStyles } from '~/utils/styles';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');

class SubCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _refresh: false,
      _noMoreData: false,
      _dataSubCategories: [],
      _dataListPost: [],
      _listPostSubCate: [],
      index: 0,
      routes: [
        {
          index: 0,
          name: 'All',
          key: 'home',
        }
      ],
    }
    this._page = 1;
    this._categorySetting = Config.settingV2.blog;
    this._ads = Config.settingV2.ads;
    this.category_style = this._categorySetting.blog_layout ?
      this._categorySetting.blog_layout : Config.layout.left_thumb;
    this.category_show_title = this._categorySetting.blog_show_title;
    this.category_show_excerpt = this._categorySetting.blog_show_excerpt;
    this.adBefore = this._ads.is_show_blog_ads_header;
    this.adBeforeId = this._ads.blog_ads_header_id;
    this.adAfter = this._ads.is_show_blog_ads_footer;
    this.adAfterId = this._ads.blog_ads_footer_id;
    this.text_base_color = Colors.cloBody;
  }

  /* FUNCTIONS */
  _getDataFromServer = async () => {
    let { _dataSubCategories, _dataListPost, routes } = this.state;
    let _categoryId = this.props.route.params.categoryId;
    let tmp = [];
    let res = await Services.Categories.getSubCategories({ id: _categoryId });
    if (res && res.length > 0) {
      // _dataSubCategories = res;
      for (let std of res) {
        let checkSub = await Services.Categories.getSubCategories({ id: std.id });
        if (checkSub && checkSub.length > 0) {
          std.isParent = true
        }

      }
      routes = [...routes, ...res];
    }

    for (let std of routes) {
      let dataPost = await Services.Posts.getPostsByCategory(std.id ? std.id : _categoryId, this._page);
      if (dataPost && dataPost.length > 0) {
        std.post = Helpers.prepareListPost(dataPost);
      }
    }
    this._page += 1;
    //ready to render
    this.setState({
      // _category: category ? category : null,
      routes,
      _dataListPost,
      _dataSubCategories,
      _loading: false,
      _refresh: false,
      _noMoreData: false,
    });

  }

  _onRefresh = async () => {
    this.setState({ _refresh: true });
    this._page = 1;
    this._getDataFromServer();
  }

  _loadMoreData = async () => {
    let _categoryId = this.props.route.params.categoryId;
    if (!this.state._noMoreData) {
      let { routes, index, _c } = this.state;
      for (let i = 0; i < routes.length; i++) {
        if (i === index) {
          let dataPost = await Services.Posts.getPostsByCategory(routes[i].id ? routes[i].id : _categoryId, this._page);
          if (dataPost && dataPost.length > 0) {
            dataPost = Helpers.prepareListPost(dataPost);
            routes[i].post = [...routes[i].post, ...dataPost];
            this._page += 1;
            this.setState({ route })
          } else {
            this.setState({ _noMoreData: true });
          }
        }
      }
    }
  }

  // tab view
  _onRenderScene = ({ route, jumpTo }) => {
    if (!route.post.length > 0) {
      this.ViewListEmpty()
    } else {
      let result = { arrItems: route.post, title: route.name }
      return (
        <View>
          {/* GRID LAYOUT */}
          {Config.layout.grid_thumb === this.category_style &&
            <TwoColumn style={{ flex: 1 }} data={result} hasTitle={false} />
          }

          {/* CARD LAYOUT */}
          {Config.layout.card_thumb === this.category_style &&
            <FlatList contentContainerStyle={{ marginVertical: Config.layout_offset.vertical }}
              data={route.post}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: '100%', height: Device.w_scale('60%'), marginVertical: Config.layout_offset.vertical }}>
                    <Item data={item} stretchImage={false} layoutCard={true} />
                  </View>
                )
              }}
            />
          }

          {/* LEFT - RIGHT LAYOUT */}
          {(Config.layout.left_thumb === this.category_style || Config.layout.right_thumb === this.category_style) &&
            <FlatList contentContainerStyle={{ marginVertical: Config.layout_offset.vertical }}
              data={route.post}
              renderItem={({ item, index }) => {
                return (
                  <View key={index} style={{ width: '100%', height: Device.w_scale('27.5%'), marginVertical: Config.layout_offset.vertical, paddingHorizontal: Config.layout_offset.left }}>
                    {Config.layout.left_thumb === this.category_style &&
                      <Item data={item} layoutLeft={true} hasExcerpt={true} />
                    }
                    {Config.layout.right_thumb === this.category_style &&
                      <Item data={item} layoutRight={true} hasExcerpt={true} />
                    }
                  </View>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          }
        </View>
      )
    }
  }

  _onRenderTabbar = (props) => {
    let { index } = this.state;
    return (
      <View style={[styles.con_tabbar, { paddingHorizontal: Config.layout_offset.left }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity key={i}
                style={[styles.con_tabbar_item,
                i === index && [styles.con_tabbar_active_item, { borderBottomColor: Colors.cloBMActive }],
                i === props.navigationState.routes.length - 1 && styles.con_tabbar_last_item
                ]}
                onPress={() => { route.isParent ? this._onPressSubCate(route) : this._onPressTabbar(route, i) }}>
                <CText style={[styles.txt_tabbar, { color: Colors.cloBodyMeta }, this.state.index === i && [commonFonts.x_small, { fontFamily: Device.fontSlabBold, color: Colors.cloBMActive }]]}>
                  {Config.html5Entities.decode(route.name)}
                </CText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  _onChangeTabIndex = (index) => {
    this.setState({ index });
  }

  _onPressTabbar = async (route, index) => {
    const id = route.name === 'All' ? '' : route.id;
    let listPost = await Services.Posts.getPostsByCategory(id, 1);
    if (listPost) {
      this.setState({
        index,
        _listPostSubCate: [...listPost]
      })
    }
  }

  _onBack = () => {
    this.props.navigation.goBack();
  }

  _onPressItem = (id, name) => {
    this.props.sideMenuActions.changeSideMenu({
      name,
      id
    });
    this.props.navigation.navigate('category');
  }

  ViewListEmpty = () => {
    return (
      <View style={styles.con_no_data}>
        <CText style={styles.txt_no_data} i18nKey={"NO_DATA"} />
      </View>
    )
  }

  _onPressSubCate = (item) => {
    this.props.navigation.push('subCategories', {
      categoryId: item.id,
      categoryName: item.name,
    });
  }
  /* LIFE CYCLE */
  componentDidMount() {
    this._getDataFromServer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sideMenu.id != this.props.sideMenu.id) {
      this.setState({ _loading: true });
      this._page = 1;
      this._getDataFromServer();
    }
  }

  /* RENDER */
  render() {
    let _categoryId = this.props.route.params.categoryId;
    let _categoryName = this.props.route.params.categoryName;


    let { _loading, _refresh, _dataListPost, _dataSubCategories, routes } = this.state;
    return (
      <View style={styles.container}>
        <CHeader hasBtnBack hasTitle title={_categoryName} onBack={this._onBack} />

        {_loading ? <CLoading />
          :
          routes.length === 1 && routes[0].post.length === 0 ?
            this.ViewListEmpty()
            :
            <CScrollView loadMore={this._loadMoreData} onRefresh={this._onRefresh} refreshing={_refresh}>
              {this.adBefore &&
                <Banner
                  size={"SMART_BANNER"}
                  request={request.build()}
                  unitId={this.adBeforeId}
                  onAdLoaded={() => {
                    console.log('Advert loaded');
                  }}
                />
              }
              {/* {this._categorySetting.blog_categories_content_type === "sub_categories" && */}
              <ViewSubCategories
                state={this.state}
                category={{
                  parent: {
                    id: _categoryId,
                    name: _categoryName
                  }
                }}
                onFunction={{
                  onBack: this._onBack,
                  onPressItem: this._onPressItem,
                  onRenderScene: this._onRenderScene,
                  onRenderTabbar: this._onRenderTabbar,
                  onChangeTabIndex: this._onChangeTabIndex
                }}
              />
              {/* } */}

              {this.adAfter &&
                <Banner
                  size={"SMART_BANNER"}
                  request={request.build()}
                  unitId={this.adAfterId}
                  onAdLoaded={() => {
                    console.log('Advert loaded');
                  }}
                />
              }
            </CScrollView>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sideMenu: state.sideMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sideMenuActions: bindActionCreators(sideMenuActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategories);

// {/* <View style={{}}>
// {/* GRID LAYOUT */}
// {Config.layout.grid_thumb === this.category_style &&
//   <TwoColumn style={{ flex: 1 }} data={_dataListPost} />
// }

// {/* CARD LAYOUT */}
// {Config.layout.card_thumb === this.category_style &&
//   <FlatList
//     data={_dataListPost}
//     renderItem={({ item, index }) => {
//       return (
//         <View style={{ width: '100%', height: Device.w_scale('60%'), marginBottom: 15 }}>
//           <Item data={item} stretchImage={false} layoutCard={true} />
//         </View>
//       )
//     }}
//     keyExtractor={(item, index) => index.toString()}
//   />
// }

// {/* LEFT - RIGHT LAYOUT */}
// {(Config.layout.left_thumb === this.category_style || Config.layout.right_thumb === this.category_style) &&
//   <FlatList
//     data={_dataListPost}
//     renderItem={({ item, index }) => {
//       return (
//         <View key={index} style={{ width: '100%', height: Device.w_scale('27.5%'), marginVertical: Config.layout_offset.left, paddingHorizontal: Config.layout_offset.left, marginTop: (index === 0 ? Config.layout_offset.left : 0) }}>
//           {Config.layout.left_thumb === this.category_style &&
//             <Item data={item} layoutLeft={true} hasExcerpt={true} />
//           }
//           {Config.layout.right_thumb === this.category_style &&
//             <Item data={item} layoutRight={true} hasExcerpt={true} />
//           }
//         </View>
//       )
//     }}
//     keyExtractor={(item, index) => index.toString()}
//   />
// }
// </View> */}
