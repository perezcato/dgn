/**
 * @Description: News screen
 * @Created by ZiniTeam
 * @Date create: 06/11/2018
 */
/** LIBRARY */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import _ from 'lodash';
/** COMMON */
import { Config, Languages } from '~/config';
import Helpers from '~/utils/helpers';
import Services from '~/services';
/** COMPONENTS */
import CLoading from '~/components/CLoading';
import CHeader from '~/components/CHeader';
import { TwoColumn, CCarousel } from '~/components/CLayout';
import Item from '~/components/CItem';
import CSwiper from '~/components/CSwiper';
import CScrollView from '~/components/CScrollView';
import HTML from 'react-native-render-html';
/** STYLE */
import styles from './style';
import { Container } from 'native-base';
import { Colors } from '~/utils/colors';


// const Banner = firebase.admob.Banner;
// const AdRequest = firebase.admob.AdRequest;
// const request = new AdRequest();
// request.addKeyword('foobar');

/** DECLARE CLASS */
class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _refreshing: false,
      _dataSwiper: [],
      _layoutOrder: [],
      _dataCategory: [],
      _dataCustomContent: {},
      _dataVideos: { title: '', arrItems: [] },
      _dataLatestPosts: { title: '', arrItems: [] }
    }
    this.cate_style = {
      left_thumb: 'left_thumb',
      right_thumb: 'right_thumb',
      grid_thumb: 'grid_thumb',
      card_thumb: 'card_thumb',
    }
    this.latest_news_style = {
      left_thumb: 'left_thumb',
      right_thumb: 'right_thumb',
      grid_thumb: 'grid_thumb',
      card_thumb: 'card_thumb',
    }
    this.setting = {
      latest_style: 'grid',
      category_style: (Config.settingV2.blog && Config.settingV2.blog.blog_layout) ?
        Config.settingV2.blog.blog_layout : 'grid',
    }
    this._init = {
      WP_HOME_FEATURED_POSTS: 'zs_featured_posts',
      WP_HOME_VIDEOS: 'zs_videos',
      WP_HOME_CATEGORIES: 'zs_categories',
      WP_HOME_LATEST_POSTS: 'zs_latest_posts',
      WP_HOME_WYSIWYG: 'zs_wysiwyg',
      KEY_FORMAT_VIDEO: 'video',
      KEY_TYPE_VIDEO_YOUTUBE: 'youtube',
      IC_NAME_GROUP_VIDEO: 'play-circle',
      LANG_NEWS: Languages[Config.lang].NEWS,
      LANG_LATEST_NEWS: Languages[Config.lang].LATEST_NEWS,
      LANG_VIDEOS: Languages[Config.lang].VIDEOS,
    }
  }

  /** FUNCTIONS */
  _onRefresh = () => {
    this.setState({ _refreshing: true, });
    // this._getDataFromServer();
    this.setState({ _refreshing: false, });
  }

  _getDataFromServer = async () => {
    let dataHomeSetting = [], x;
    let { navigation } = this.props;
    let { _dataSwiper, _dataCategory, _layoutOrder, _dataVideos, _dataLatestPosts, _dataCustomContent } = this.state;
    _dataCategory = [];
    _dataSwiper = [];
    _layoutOrder = [];
    _dataVideos = { title: '', arrItems: [] };
    _dataLatestPosts = { title: '', arrItems: [] };
    _dataCustomContent = {};
    /** Start Get Data */
    if (Config.homeSettings) {
      dataHomeSetting = Config.homeSettings;
      if (dataHomeSetting.length > 0) {
        let _listPostWithID, _prepareList;
        for (x in dataHomeSetting) {
          /** Get Posts on Swiper */
          if (dataHomeSetting[x].acf_fc_layout === this._init.WP_HOME_FEATURED_POSTS) {
            _listPostWithID = [], _prepareList = {};
            if (dataHomeSetting[x].zs_featured_posts && dataHomeSetting[x].zs_featured_posts.length > 0) {
              _listPostWithID = dataHomeSetting[x].zs_featured_posts;
              _prepareList = this._prepareListPost(_listPostWithID);
              _dataSwiper = _prepareList.arrItems.map((item) => {
                item.onPressTitle = () => navigation.navigate('post', { data: item });
                return item;
              });
              _layoutOrder[x] = {
                acf_fc_layout: this._init.WP_HOME_FEATURED_POSTS,
                layout_style: dataHomeSetting[x].layout_style ? dataHomeSetting[x].layout_style : "left_thumb"
              };
            }
          }

          /** Get Lated New Posts */
          if (dataHomeSetting[x].acf_fc_layout === this._init.WP_HOME_LATEST_POSTS) {
            let _listPost = dataHomeSetting[x].zs_latest_posts;
            if (_listPost && _listPost.length > 0) {
              _dataLatestPosts = this._prepareListPost(_listPost, this._init.LANG_LATEST_NEWS);
              _layoutOrder[x] = {
                acf_fc_layout: this._init.WP_HOME_LATEST_POSTS,
                layout_style: dataHomeSetting[x].layout_style ? dataHomeSetting[x].layout_style : "left_thumb"
              };
            }
          }

          /** Get Posts with type is Video */
          if (dataHomeSetting[x].acf_fc_layout === this._init.WP_HOME_VIDEOS) {
            _listPostWithID = [], _prepareList = {};
            if (dataHomeSetting[x].zs_videos && dataHomeSetting[x].zs_videos.length > 0) {
              _listPostWithID = dataHomeSetting[x].zs_videos;
              _prepareList = this._prepareListVideos(_listPostWithID, this._init.LANG_VIDEOS);
              _dataVideos = _prepareList;
              _layoutOrder[x] = {
                acf_fc_layout: this._init.WP_HOME_VIDEOS,
                layout_style: dataHomeSetting[x].layout_style ? dataHomeSetting[x].layout_style : "left_thumb"
              };
            }
          }

          /** Get Category */
          if (`${dataHomeSetting[x].acf_fc_layout}_${x}` === `${this._init.WP_HOME_CATEGORIES}_${x}`) {
            _listCateWithID = [], _prepareList = {};
            let categoryObj = dataHomeSetting[x].category;
            _listPost = dataHomeSetting[x].zs_categories;
            if (_listPost && _listPost.length > 0) {
              _prepareList = this._prepareListPost(_listPost, categoryObj.name);
              // _dataCategory.push(_prepareList);
              _dataCategory.push({
                ..._prepareList,
                index: x
              })
            }
            _layoutOrder[x] = {
              acf_fc_layout: this._init.WP_HOME_CATEGORIES,
              layout_style: dataHomeSetting[x].layout_style ? dataHomeSetting[x].layout_style : "left_thumb"
            };
          }

          /** Get Custom page content */
          if (dataHomeSetting[x].acf_fc_layout === this._init.WP_HOME_WYSIWYG) {
            _dataCustomContent = dataHomeSetting[x].zs_wysiwyg;
            _layoutOrder[x] = {
              acf_fc_layout: this._init.WP_HOME_WYSIWYG,
              layout_style: dataHomeSetting[x].layout_style ? dataHomeSetting[x].layout_style : "left_thumb"
            };
          }
        }
      }
    }

    console.log("_dataVideos", _dataVideos)
    this.setState({
      _dataSwiper,
      _layoutOrder,
      _dataCategory,
      _dataVideos,
      _dataLatestPosts,
      _dataCustomContent,
      _loading: false,
      _refreshing: false
    });
  }

  _prepareListPost = (list = [], title = 'No Name', layout = '') => {
    let _list = {};
    if (list.length > 0) {
      _list.arrItems = [];
      _list.title = title;

      list.map((item) => {
        let _tmpData = {
          id: item.id,
          title: item.title.rendered,
          time: item.date,
          excerpt: Helpers.stripTags(item.excerpt.rendered),
          orginData: item
        }
        if (item.acf) {
          if (item.acf.gallery && item.acf.gallery.length > 0) {
            _tmpData.images = item.acf.gallery;
          }
          if (item.format === this._init.KEY_FORMAT_VIDEO && item.acf.zini_post_type === this._init.KEY_TYPE_VIDEO_YOUTUBE) {
            _tmpData.video = item.acf.zini_youtube_url;
          }
        }
        if (item.featured_media) {
          _tmpData.thumbnail = item.featured_media;
        }
        _list.arrItems.push(_tmpData);
      })
    }
    return _list;
  }

  _prepareListVideos = (list = [], title = 'No Name') => {
    let _list = {};
    if (list.length > 0) {
      _list.title = title;
      _list.arrItems = [];
      list.map((item, index) => {
        let _tmpData = {
          id: item.id,
          title: item.title.rendered,
          time: item.date,
          excerpt: Helpers.stripTags(item.excerpt.rendered),
          orginData: item
        }
        if (item.acf) {
          if (item.acf.gallery && item.acf.gallery.length > 0) {
            _tmpData.images = item.acf.gallery;
          }
          if (item.format === this._init.KEY_FORMAT_VIDEO && item.zs_meta_data.zs_video_type === this._init.KEY_TYPE_VIDEO_YOUTUBE) {
            _tmpData.video = item.zs_meta_data.zs_video;
          }
        }
        if (item.featured_media) {
          _tmpData.thumbnail = item.featured_media;
        }
        _list.arrItems.push(_tmpData);
      })
    }
    return _list;
  }

  _onPressMenu = () => {
    this.props.navigation.toggleDrawer();
  }

  /** LIFE CYCLE */
  componentDidMount() {
    this._getDataFromServer();
  }

  componentWillMount() {
    if (Config.setting && Config.setting.home && Config.setting.home.data_blocks.length > 0) {
      let find = Config.setting.home.data_blocks.find(f => f.acf_fc_layout === this._init.WP_HOME_LATEST_POSTS);
      if (find) this.setting.latest_style = find.latest_news_style;
    }
  }

  /** RENDER */
  render() {
    let { _loading, _refreshing, _dataSwiper, _dataCategory, _dataVideos, _dataLatestPosts, _layoutOrder, _dataCustomContent } = this.state;
    let { isHome } = this.props;

    return (
      <Container style={styles.container}>
        {!isHome && <CHeader title={this._init.LANG_NEWS} onMenu={this._onPressMenu} />}

        {_loading && <CLoading />}

        {!_loading &&
          <CScrollView style={styles.container} refreshing={_refreshing} onRefresh={this._onRefresh}>
            {_layoutOrder.length > 0 && _layoutOrder.map((key, index) => {
              if (key.acf_fc_layout === this._init.WP_HOME_FEATURED_POSTS && _dataSwiper.length > 0) {
                return <CSwiper key={index} data={_dataSwiper} autoScroll />
              }

              if (key.acf_fc_layout === this._init.WP_HOME_LATEST_POSTS && _dataLatestPosts.arrItems.length > 0) {
                if (this.latest_news_style.grid_thumb === key.layout_style) {
                  return (
                    <TwoColumn key={'twocol_' + index.toString()}
                      style={styles.con_tow_col_2}
                      icCloOfGroup={Colors.cloHeadline}
                      data={_dataLatestPosts}
                    />
                  )
                }

                if (this.latest_news_style.card_thumb === key.layout_style) {
                  return (
                    <View key={'card_' + index.toString()} style={styles.con_card_left_right} >
                      <FlatList
                        data={_dataLatestPosts.arrItems}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={styles.con_item_card}>
                              <Item data={item} stretchImage={false} layoutCard={true} />
                            </View>
                          )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                          <View style={[styles.con_card_left_right_item, { borderLeftColor: Colors.cloHeadline }]}>
                            <Text style={[styles.txt_title, { color: Colors.cloHeadline }]}>
                              {_dataLatestPosts.title.toUpperCase()}
                            </Text>
                          </View>
                        }
                      />
                    </View>
                  )
                }

                if (this.latest_news_style.left_thumb === key.layout_style || this.latest_news_style.right_thumb === key.layout_style) {
                  return (
                    <View key={'left_right_' + index.toString()} style={styles.con_card_left_right}>
                      <FlatList
                        data={_dataLatestPosts.arrItems}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={[styles.con_left_right, { marginTop: (index === 0 ? Config.layout_offset.left : 0) }]}>
                              {this.latest_news_style.left_thumb === key.layout_style &&
                                <Item data={item} layoutLeft={true} hasExcerpt={true} />
                              }
                              {this.latest_news_style.right_thumb === key.layout_style &&
                                <Item data={item} layoutRight={true} hasExcerpt={true} />
                              }
                            </View>
                          )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                          <View style={styles.con_card_left_right_item}>
                            <Text style={[styles.txt_title, { color: Colors.cloHeadline }]}>
                              {_dataLatestPosts.title.toUpperCase()}
                            </Text>
                          </View>
                        }
                      />
                    </View>
                  )
                }
              }

              if (key.acf_fc_layout === this._init.WP_HOME_VIDEOS && _dataVideos.arrItems.length > 0) {
                return (
                  <CCarousel key={'video_' + index.toString()}
                    style={styles.con_video}
                    icNameOfGroup={this._init.IC_NAME_GROUP_VIDEO}
                    icCloOfGroup={Colors.cloHeadline}
                    autoplay={true}
                    hasIcon={true}
                    refreshing={_refreshing}
                    data={_dataVideos}
                  />
                )
              }

              if (key.acf_fc_layout === this._init.WP_HOME_CATEGORIES && _dataCategory.length > 0) {
                let itemCategory = _dataCategory.filter(f => f.index == index)
                console.log('itemCategory[0]', itemCategory[0])
                if (this.cate_style.grid_thumb === key.layout_style) {
                  return (
                    <TwoColumn key={'cateItem_' + index}
                      style={styles.con_tow_col}
                      data={itemCategory[0]} />
                  )
                }

                if (this.cate_style.card_thumb === key.layout_style) {
                  return (
                    <View key={'card_' + index.toString()} style={styles.con_card_left_right}>
                      <FlatList
                        data={itemCategory[0].arrItems}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={styles.con_item_card}>
                              <Item data={item} stretchImage={false} layoutCard={true} />
                            </View>
                          )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                          <View style={[styles.con_card_left_right_item, { borderLeftColor: Colors.cloHeadline }]}>
                            <Text style={[styles.txt_title, { color: Colors.cloHeadline }]}>
                              {itemCategory[0].title.toUpperCase()}
                            </Text>
                          </View>
                        }
                      />
                    </View>
                  )
                }

                if (this.cate_style.left_thumb === key.layout_style || this.cate_style.right_thumb === key.layout_style) {
                  return (
                    <View key={'left_right_' + index.toString()} style={styles.con_card_left_right}>
                      <FlatList
                        data={itemCategory[0].arrItems}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={[styles.con_left_right, { marginTop: (index === 0 ? Config.layout_offset.left : 0) }]}>
                              {this.cate_style.left_thumb === key.layout_style &&
                                <Item data={item} layoutLeft={true} hasExcerpt={true} />
                              }
                              {this.cate_style.right_thumb === key.layout_style &&
                                <Item data={item} layoutRight={true} hasExcerpt={true} />
                              }
                            </View>
                          )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                          <View style={styles.con_card_left_right_item}>
                            <Text style={styles.txt_title}>{itemCategory[0].title.toUpperCase()}</Text>
                          </View>
                        }
                      />
                    </View>
                  )
                }

              }

              if (key.acf_fc_layout === this._init.WP_HOME_WYSIWYG) {
                if (_dataCustomContent) {
                  return (
                    <View key={_dataCustomContent.ID} style={styles.container}>
                      <View style={styles.custom_content}>
                        <HTML html={_dataCustomContent.post_content} imagesMaxWidth={Dimensions.get('window').width - 20} />
                      </View>
                    </View>
                  )
                } else {
                  return null;
                }
              }
            })}
          </CScrollView>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    setting: state.setting
  }
}

NewsScreen.defaultProps = {
  isHome: false
}

export default connect(mapStateToProps, null)(NewsScreen);
