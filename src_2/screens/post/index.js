/**
 * @Description: Post screen
 * @Created by ZiniTeam
 * @Date create: 20/11/2018
 */
/** LIBRARY */
import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, StatusBar, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { useNavigation } from '@react-navigation/native';
import firebase from 'react-native-firebase';
import HTML from 'react-native-render-html';
import { Container, Content, Button } from 'native-base';
/** COMMON **/
import { Device, Languages, Config } from '~/config';
import Helpers from '~/utils/helpers';
import Services from '~/services';
import { Colors } from '~/utils/colors';
/** COMPONENTS **/
import CLoading from '~/components/CLoading';
import CImageGallery from '~/components/CImageGallery';
import CImage from '~/components/CImage';
import CHeader from '~/components/CHeader';
import Item from '~/components/CItem';
import HashTagItem from '~/components/CHashtagItem';
import CText from '~/components/CText';
// import HTML from 'react-native-render-html';
/** REDUX ACTIONS */
import * as sideMenuActions from '~/redux/actions/side_menu';
/** STYLES **/
import postStyle from './style';
import style from '~/components/CLoading/style';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
const htmlStyleFix = `<style type="text/css">iframe{width: 100%;height: 100%}</style>`;
/** DECLARE CLASS */
class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _isVideo: false,
      _isYoutube: false,
      _isVimeo: false,
      _isGallery: false,
      _videoPostType: '',
      _stringConvert: '',
      _author: {},
      _featuredImage: {},
      _tags: [],
      _categories: [],
      _dataRelated: [],
      _dataPopular: [],
      _loadQueue: [0, 0, 0, 0]
    }
    this._dataPost = props.route.params.data || null;
    this._single = Config.settingV2.single;
    this._ads = Config.settingV2.ads;
    this._settings = {
      post_show_featured_image: this._single.single_featured_image,
      post_show_excerpt: this._single.single_show_excerpt,
      post_show_related: this._single.single_related_posts,
      post_show_popular_post: this._single.single_popular_posts ? this._single.single_popular_posts : false,
      post_show_date: this._single.single_meta_fields.datetime,
      post_show_author: this._single.single_meta_fields.author,
      post_show_tag: this._single.single_show_tags,
      post_show_categories: this._single.single_meta_fields.categories,
      post_author_link: this._single.single_author_details,

      text_headline_color: Colors.cloHeadline,
      text_base_color: Colors.cloBody,

      adBefore: this._ads.is_show_blog_ads_header,
      adBeforeId: this._ads.blog_ads_header_id,
      adAfter: this._ads.is_show_blog_ads_footer,
      adAfterId: this._ads.blog_ads_footer_id,
      interstitialAd: this._ads.is_show_blog_interstitial_ads,
      interstitialAdId: this._ads.blog_interstitial_ads_id
    };
  }

  /** FUNCTIONS */
  _getDataFromServer = async () => {
    console.log("this._dataPost", this._dataPost)
    if (!this.state._loading) this.setState({ _loading: true })
    //GET AUTHOR BY ID
    let author = await Services.Users.getUserByID(this._dataPost.orginData.author.id);
    console.log('author: ', author)

    // GET LIST CATEGORIES BY ARRAY TAG ID
    let categories = await Services.Categories.getListCategoriesByArrayID(this._dataPost.orginData.categories);
    console.log('categories: ', categories)

    //GET LIST TAGS BY ARRAY TAG ID
    let tags = await Services.Tags.getListTagByArrayID(this._dataPost.orginData.tags)
    console.log('tags: ', tags)

    //GET RELATED POSTS
    let _dataRelated = [];
    let postShowRelated = this._settings.post_show_related;
    if (postShowRelated) {
      _dataRelated = await Services.Posts.getListPostRelated(this._dataPost.id);
      _dataRelated = Helpers.prepareListPost(_dataRelated);
    }

    //GET POPULAR POST
    let _dataPopular = [];
    let postShowPopularPost = this._settings.post_show_popular_post;
    if (postShowPopularPost) {
      _dataPopular = await Services.Posts.getListPopularPosts();
      _dataPopular = Helpers.prepareListPost(_dataPopular);
    }
    this.setState({
      _author: author ? author : {},
      _featuredImage: (this._dataPost.thumbnail && this._dataPost.thumbnail.sizes) ? this._dataPost.thumbnail.sizes.large : {},
      _categories: categories ? categories : [],
      _tags: tags ? tags : [],
      _dataRelated: _dataRelated,
      _dataPopular: _dataPopular,
      _loading: false
    })
  }

  _initialize = () => {
    //CHECK POST TYPE
    if (this._dataPost) {
      if (this._dataPost.orginData.format == 'video') { //POST IS VIDEO
        //LINK YOUTUBE CONVERT
        let str = 'https://www.youtube.com/embed/';
        let { _isYoutube } = this.state;
        if (this._dataPost.orginData.zs_meta_data.zs_video_type === "youtube") {
          var url = this._dataPost.orginData.zs_meta_data.zs_video;
          if (url.indexOf("youtube") > -1 || url.indexOf("youtu.be") > -1) {
            if (url.indexOf("watch") > -1) {
              let idVideo = url.split("=").pop();
              str = 'https://www.youtube.com/embed/' + idVideo;
            } else if (url.indexOf("youtu.be") > -1) {
              let idVideo = url.split("youtu.be/").pop();
              str = 'https://www.youtube.com/embed/' + idVideo;
            } else {
              str = url;
            }
            _isYoutube = true;
          }
          //  else if (url.indexOf("vimeo") > -1) {
          //   let idVideo = url.split("/").pop();
          //   str = idVideo;
          //   _isYoutube = false;
          // }
        }
        this.setState({
          _isVideo: true,
          _isYoutube,
          _stringConvert: str
        })
      } else if (this._dataPost.orginData.format == 'gallery') { //POST IS GALLERY
        this.setState({
          _isGallery: true
        })
      }
    }
  }

  _onPressItem = (data) => {
    this.setState({ _loading: true })
    this._dataPost = data;
    this._getDataFromServer();
    this._initialize();
  }

  _navigateToScreenCategory = (id, name) => {
    let prevRouteObj = Object.assign({}, this.props.sideMenu);
    this.props.sideMenuActions.changeSideMenu({
      name: name,
      id: id
    })
    let _routeName = (!isNaN(id) ? 'category' : id);
    if (_routeName === 'search') {
      this.props.navigation.navigate(_routeName, {
        prevRouteObj: prevRouteObj
      });
    } else {
      this.props.navigation.navigate(_routeName);
    }
  }

  _onPressAuthor = () => {
    this.props.navigation.navigate('author', {
      dataPost: this._dataPost
    });
  }

  _onPressViewComment = () => {
    this.props.navigation.navigate("comment", {
      id: this._dataPost.id
    })
  }
  /** RENDER */
  render() {
    let {
      _loading, _tags, _categories, _featuredImage, _isGallery, _isVideo, _isYoutube, _stringConvert,
      _author, _dataRelated, _dataPopular } = this.state;
    let dataRender = this._dataPost.orginData.content.rendered;
    // dataRender = dataRender.replace(/(<p[^>]+?>|<p>)/img, "");
    // dataRender = dataRender.replace(/(<\/p>)/img, "\n");
    let newTitle = require('html-entities').AllHtmlEntities.decode(this._dataPost.title);
    let newExcerpt = require('html-entities').AllHtmlEntities.decode(this._dataPost.excerpt);
    return (
      <Container style={postStyle.container}>
        <CHeader data={this._dataPost} hasTitle={false} hasBtnBack={true} />

        {_loading ?
          <CLoading />
          :
          <View style={{ flex: 1 }}>
            {this._dataPost ?
              <Content showsVerticalScrollIndicator={false}>
                {this._settings.adBefore &&
                  <Banner
                    size={"SMART_BANNER"}
                    request={request.build()}
                    unitId={this._settings.adBeforeId.trim()}
                    onAdLoaded={() => {
                      console.log('Advert loaded');
                    }}
                  />
                }

                {_featuredImage.media_details && this._settings.post_show_featured_image && !_isVideo &&
                  <CImage
                    style={[{ width: '100%', height: Device.width * 9 / 16 + 47 }]}
                    resizeMode={'cover'}
                    src={{ uri: _featuredImage.media_details.sizes.large ? _featuredImage.media_details.sizes.large.source_url : _featuredImage.media_details.sizes.full.source_url }}
                  />
                }
                {typeof _featuredImage === 'string' && this._settings.post_show_featured_image && !_isVideo &&
                  <CImage
                    style={[{ width: '100%', height: Device.width * 9 / 16 + 47 }]}
                    resizeMode={'cover'}
                    src={{ uri: _featuredImage }}
                  />
                }


                {/* TITLE POST */}
                <View style={{ paddingHorizontal: Config.layout_offset.left, paddingVertical: 10 }}>
                  <Text style={[postStyle.txt_title, { color: this._settings.text_headline_color }]}>{newTitle}</Text>
                  {(this._settings.post_show_date || this._settings.post_show_author) &&
                    <View style={postStyle.p_timeAuthor}>
                      <Text style={postStyle.txt_time_author} numberOfLines={1}>{Languages[Config.lang].DATE_CREATED + ': '}</Text>
                      {this._settings.post_show_date &&
                        <Text style={postStyle.txt_time_author} numberOfLines={1}>{Helpers.getLastPeriod(this._dataPost.time, 'fullday')}</Text>
                      }
                      {this._settings.post_show_author &&
                        <Text style={[postStyle.txt_time_author, { fontFamily: Device.fontSlabBold }]}
                          numberOfLines={1}
                          onPress={this._settings.post_author_link && this._onPressAuthor}>
                          {' ' + Languages[Config.lang].BY + ' ' + _author.name}
                        </Text>
                      }
                    </View>
                  }
                  {this._settings.post_show_categories && _categories.length > 0 &&
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      <Text style={[postStyle.txt_time_author, { fontFamily: Device.fontSlabBold }]}>{Languages[Config.lang].CATEGORIES + ': '}</Text>
                      {_categories.map((category, index) => {
                        return (
                          <TouchableOpacity key={index} style={{}} onPress={() => this._navigateToScreenCategory(category.id, category.name)}>
                            <Text style={[postStyle.txt_time_author, { fontFamily: Device.fontSlabBold, color: Colors.cloLink }]}>{category.name}  </Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  }
                </View>

                {/* SHORT DES POST */}
                {newExcerpt !== "" && this._settings.post_show_excerpt &&
                  <Text style={[postStyle.txt_short_des, { paddingHorizontal: Config.layout_offset.left }, { color: this._settings.text_base_color }]}>{newExcerpt}</Text>
                }

                {/* GALLERY STYLE */}
                {_isGallery && this._dataPost.orginData.zs_meta_data && !_loading &&
                  <CImageGallery
                    id={this._dataPost.id}
                    data={this._dataPost.orginData.zs_meta_data && this._dataPost.orginData.zs_meta_data.zs_gallery_images}
                    photoCount={this._dataPost.orginData.zs_meta_data && this._dataPost.orginData.zs_meta_data.zs_gallery_images.length}
                  />
                }

                {/* VIDEO */}
                {_isVideo && _isYoutube &&
                  // VIDEO POST TYPE 
                  <View style={postStyle.video_box}>
                    <View style={{ width: '100%', height: '100%' }}>
                      <WebView
                        source={{ html: `${htmlStyleFix}<p>${_stringConvert}</p>` }}
                        style={{ backgroundColor: 'transparent', width: Device.sW("100%") }}
                        scalesPageToFit={true}
                      />
                    </View>
                  </View>
                }

                {/* STANDARD */}
                {this._dataPost.orginData.content &&
                  <View style={{ flex: 1, paddingHorizontal: Config.layout_offset.left, paddingVertical: 10 }}>
                    <HTML
                      html={dataRender}
                      tagsStyles={{ p: postStyle.txt_p_tag, h4: postStyle.txt_h4 }}
                      imagesMaxWidth={Dimensions.get('window').width - Config.layout_offset.left * 2}
                      staticContentMaxWidth={Dimensions.get('window').width - Config.layout_offset.left * 2}
                      renderers={{
                        iframe: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                          return (
                            <View>
                              <WebView
                                source={{ uri: htmlAttribs.src }}
                                style={{ marginVertical: 10, height: Device.sW('60%'), width: Device.sW(`${Config.settingV2.general.layout_width}%`) }}
                              />
                              {htmlAttribs.title && htmlAttribs.title !== "" &&
                                <CText style={postStyle.txt_title_video} numberOfLines={3}>{htmlAttribs.title}</CText>
                              }
                            </View>
                          )
                        }
                      }}
                    />

                    {this._settings.post_show_tag && _tags.length > 0 &&
                      <View>
                        <Text style={[postStyle.txt_time_author, { fontFamily: Device.fontSlabBold }]}>Tag: </Text>
                        <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                          {_tags.map((item, index) =>
                            <View style={{ height: 30, marginTop: 10 }} key={index}>
                              <HashTagItem
                                index={index}
                                name={item.name}
                                id={item.id}
                                style={{ backgroundColor: '#f2f2f2' }}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    }
                  </View>
                }

                {/* RELATED POSTS */}
                {this._settings.post_show_related && _dataRelated.length > 0 &&
                  <View style={postStyle.relatedPosts}>
                    <FlatList contentContainerStyle={{ paddingHorizontal: Config.layout_offset.left }}
                      data={_dataRelated}
                      renderItem={({ item, index }) => {
                        return (
                          <View key={index} style={{ width: '100%', height: Device.w_scale('28%'), marginVertical: 10 }}>
                            <Item data={item} layoutLeft={true} hasExcerpt={true} onPress={this._onPressItem} />
                          </View>
                        )
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      ListHeaderComponent={
                        <View style={[postStyle.title_wrapper]}>
                          <Text style={postStyle.title}>{Languages[Config.lang].RELATED_POSTS.toUpperCase()}</Text>
                        </View>
                      }
                    />
                  </View>
                }

                {/* POPULAR POSTS */}
                {this._settings.post_show_popular_post && _dataPopular.length > 0 &&
                  <View style={postStyle.relatedPosts}>
                    <FlatList contentContainerStyle={{ paddingHorizontal: Config.layout_offset.left }}
                      data={_dataPopular}
                      renderItem={({ item, index }) => {
                        return (
                          <View key={index} style={{ width: '100%', height: Device.w_scale('28%'), marginVertical: 10 }}>
                            <Item data={item} layoutLeft={true} hasExcerpt={true} onPress={this._onPressItem} />
                          </View>
                        )
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      ListHeaderComponent={
                        <View style={[postStyle.title_wrapper]}>
                          <Text style={postStyle.title}>{Languages[Config.lang].POPULAR_POSTS.toUpperCase()}</Text>
                        </View>
                      }
                    />
                  </View>

                }
                {/* <Button block style={[postStyle.con_btn, { backgroundColor: Colors.cloBMActive, margin: Config.layout_offset.left }]} onPress={this._onPressViewComment}  >
                  <CText style={postStyle.txt_btn} i18nKey={'COMMENT'} upperCase />
                </Button> */}
                {this._settings.adAfter &&
                  <Banner
                    size={"SMART_BANNER"}
                    request={request.build()}
                    unitId={this._settings.adAfterId.trim()}
                    onAdLoaded={() => {
                      console.log('Advert loaded');
                    }}
                  />
                }
              </Content>
              :
              <View style={{ height: '100%', width: '100%', alignItems: 'center', marginTop: Device.h_scale('20%') }}>
                <Text style={{ color: 'black', fontSize: Device.fS(14), fontFamily: Device.fontSlabRegular }}>No Data</Text>
              </View>
            }
          </View>
        }
      </Container>
    )
  }

  /** LIFE CYCLE */
  componentDidMount() {
    console.log(this._dataPost)
    this._getDataFromServer();
    this._initialize();
    StatusBar.setBarStyle('dark-content');
    //config
    if (this._settings.interstitialAd) {
      const advert = firebase.admob().interstitial(this._settings.interstitialAdId.trim());
      // Load the advert with our AdRequest
      advert.loadAd(request.build());
      setTimeout(() => {
        if (advert.isLoaded()) {
          advert.show();
        }
      }, 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.route.params.data !== prevProps.route.params.data) {
      this._dataPost = this.props.route.params.data;
      this._getDataFromServer();
      this._initialize();
    }
  }
}

const htmlStyles = StyleSheet.create({
  p: {
    margin: 0,
    padding: 0
  },
});
const mapStateToProps = (state) => {
  return {
    sideMenu: state.sideMenu,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sideMenuActions: bindActionCreators(sideMenuActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  function (props) {
    const navigation = useNavigation();

    return <PostScreen {...props} navigation={navigation} />;
  }
);
