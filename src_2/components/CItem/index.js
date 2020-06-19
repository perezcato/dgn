/** LIBRARY */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import {useNavigation} from '@react-navigation/native';
/** COMMON **/
import {Config, Device} from '~/config';
import Helpers from '~/utils/helpers';
import {Colors} from '~/utils/colors';
/** COMPONENTS **/
import CImage from '~/components/CImage';
/** STYLES **/
import styles from './style';

class Item extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      _init: {
        iconImgName: 'images',
        iconVidName: 'play-circle'
      },
      _featured_media: -1,
      _numOfImage: 0,
      _typeOfPost: ''
    }
    this._hasExcerpt = Config.settingV2.blog.blog_show_excerpt;
    this._hasTitle = Config.settingV2.blog.blog_show_title;
  }

  render() {
    let {
      data, touchOpacity, thumbWidth, hasThumbnail, hasIcon, hasNoImages, hasAgo, hasTitle, borderRadius,
      flatImage, stretchImage, twoColumn, threeColumn, layoutLeft, layoutRight, layoutCard, hasExcerpt, heightImage
    } = this.props;
    let {_init, _typeOfPost, _numOfImage, _featured_media} = this.state;
    let settings = {
      layout_content_width: Config.settingV2.general.layout_width ?
        Config.settingV2.general.layout_width :
        '95'
    }
    let newTitle = require('html-entities').AllHtmlEntities.decode(data.title);
    let newExcerpt = require('html-entities').AllHtmlEntities.decode(data.excerpt);

    return (
      <TouchableOpacity
        style={[styles.container, (layoutLeft || layoutRight ? {flexDirection: 'row'} : {})]}
        onPress={this._onPressItem} activeOpacity={touchOpacity}
      >
        {hasThumbnail && (!layoutRight || layoutCard || layoutLeft) &&
        <View
          style={[styles.linear_gardiant, {borderRadius: (flatImage ? 0 : 7)}, (layoutLeft || layoutRight ? {flex: thumbWidth} : {}), (layoutCard && (typeof (_featured_media) == 'number' && _featured_media == -1) && {marginHorizontal: 10})]}>
          {/** Image and loading */}
          {(typeof (_featured_media) == 'number' && _featured_media == -1) ?
            <CImage
              style={[styles.img, {borderRadius: (flatImage ? 0 : 7)}]}
              resizeMode={'cover'}
              src={Config.img_broken}
            />
            :
            this.renderImage(_featured_media, settings)
          }

          {_typeOfPost != '' &&
          !layoutCard ?
            <LinearGradient style={[styles.container_icon, (!stretchImage ? {
              paddingVertical: 7,
              paddingHorizontal: Config.layout_offset.left + 7
            } : {}), {marginTop: -50}]}
                            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,.9)']}>
              {hasIcon &&
              <Icon
                name={_typeOfPost == 'video' ? _init.iconVidName : _typeOfPost == 'image' ? _init.iconImgName : ''}
                size={Device.s * 20}
                color={'white'}
                type={'regular'}
              />
              }
              {hasNoImages &&
              <Text style={styles.txt_icon}>{_typeOfPost == 'image' ? '+' + _numOfImage : ''}</Text>
              }
            </LinearGradient>
            :
            <View style={[styles.container_icon, (!stretchImage ? {
              paddingVertical: 7,
              paddingHorizontal: Config.layout_offset.left + 7
            } : {})]}/>
          }
        </View>
        }

        {(!twoColumn && !layoutLeft && !layoutRight && (layoutCard || threeColumn)) ?
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,.9)']}
                          style={[
                            {
                              flex: 1,
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              borderBottomLeftRadius: 7,
                              borderBottomRightRadius: 7
                            },
                            ({
                              paddingLeft: layoutLeft ? Config.layout_offset.left : 10,
                              paddingRight: layoutRight ? Config.layout_offset.left : 10
                            }),
                            ((layoutCard && !flatImage) ? {marginHorizontal: Config.layout_offset.left} : {}),
                            !borderRadius ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : {},
                            {marginTop: -100}
                          ]}>
            {<Text style={[styles.txt_title, (layoutLeft || layoutRight ? {marginTop: 0} : {})]}
                   numberOfLines={2}>{newTitle}</Text>
            }
            {this._hasExcerpt && newExcerpt !== '' &&
            <Text numberOfLines={2} style={styles.txt_description}>{newExcerpt}</Text>
            }
            {<Text style={styles.txt_time} numberOfLines={1}>{Helpers.getLastPeriod(data.time, 'fullday')}</Text>
            }
          </LinearGradient>
          :
          <View style={[
            (layoutLeft || layoutRight ? {flex: 10 - thumbWidth} : {}),
            ({
              paddingLeft: layoutLeft ? Config.layout_offset.left : 0,
              paddingRight: layoutRight ? Config.layout_offset.left : 10
            }),
            (layoutCard ? {marginHorizontal: Config.layout_offset.left} : {}),
            !borderRadius ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : {}]}
          >
            {<Text style={[styles.txt_title, {color: 'black'}, (layoutLeft || layoutRight ? {marginTop: 0} : {})]}
                   numberOfLines={2}>{newTitle}</Text>
            }

            {<Text numberOfLines={2} style={[styles.txt_description, {color: 'black'}]}>{newExcerpt}</Text>
            }
            {hasAgo &&
            <Text style={[styles.txt_time, {color: 'black'}, layoutLeft || layoutRight && {
              paddingBottom: 20,
              marginTop: 10
            }]} numberOfLines={1}>{Helpers.getLastPeriod(data.time, 'fullday')}</Text>
            }
          </View>
        }

        {
          hasThumbnail && layoutRight && !layoutLeft &&
          <View
            style={[styles.linear_gardiant, {borderRadius: (flatImage ? 0 : 7)}, (layoutLeft || layoutRight ? {flex: thumbWidth} : {})]}
            colors={Colors.cloGdaPostItem}
          >
            {/** Image and loading */}
            {(typeof (_featured_media) == 'number' && _featured_media == -1) ?
              <CImage
                style={[styles.img, {borderRadius: (flatImage ? 0 : 7)}]}
                resizeMode={'cover'}
                src={Config.img_broken}
              />
              :
              this.renderImage(_featured_media, settings)
            }
            {_typeOfPost != '' &&
            !layoutCard ?
              <LinearGradient style={[styles.container_icon, (!stretchImage ? {
                paddingVertical: 7,
                paddingHorizontal: Config.layout_offset.left + 7
              } : {}), {marginTop: -50}]}
                              colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,.9)']}>
                {hasIcon &&
                <Icon
                  name={_typeOfPost == 'video' ? _init.iconVidName : _typeOfPost == 'image' ? _init.iconImgName : ''}
                  size={Device.s * 20}
                  color={'white'}
                  type={'regular'}
                />
                }
                {hasNoImages &&
                <Text style={styles.txt_icon}>{_typeOfPost == 'image' ? '+' + _numOfImage : ''}</Text>
                }
              </LinearGradient>
              :
              <View style={[styles.container_icon, (!stretchImage ? {
                paddingVertical: 7,
                paddingHorizontal: Config.layout_offset.left + 7
              } : {})]}/>
            }
          </View>
        }
      </TouchableOpacity>
    )
  }

  renderImage = (_featured_media, settings) => {
    let {hasThumbnail, flatImage, stretchImage, heightImage, widthImage} = this.props;
    let {_typeOfPost} = this.state;

    if (!_featured_media) {
      return (
        <CImage
          style={[styles.img, {borderRadius: (flatImage ? 0 : 7)}]}
          resizeMode={'cover'}
          src={Config.img_broken}
        />
      )
    }

    return (
      _typeOfPost === 'pdf' ?
        (_featured_media.pdf_size ?
            <CImage
              style={[styles.img, {borderRadius: (flatImage ? 0 : 7)}]}
              resizeMode={'contain'}
              src={{uri: _featured_media.pdf_size.source_url}}
            />
            : null
        )
        :
        (_featured_media.large ?
            (hasThumbnail ?
                <CImage
                  style={[styles.img, {borderRadius: (flatImage ? 0 : 7)},
                    (!stretchImage
                        ? {
                          width: Device.w_scale(settings.layout_content_width + '%'),
                          marginHorizontal: Config.layout_offset.left
                        }
                        : {}
                    ), heightImage ? {height: heightImage} : {},
                    widthImage ? {width: widthImage} : {}]}
                  resizeMode={'cover'}
                  src={{uri: _featured_media.large}}
                />
                : null
            )
            :
            (_featured_media.source && hasThumbnail ?
                <CImage
                  style={[styles.img, {borderRadius: (flatImage ? 0 : 7)},
                    (!stretchImage ? {
                      width: Device.w_scale(settings.layout_content_width + '%'),
                      marginHorizontal: Config.layout_offset.left
                    } : {})
                  ]}
                  resizeMode={'contain'}
                  src={_featured_media.source}
                />
                :
                <View style={[styles.img, {padding: 30, backgroundColor: Colors.cloImage},
                  (!stretchImage ? {
                    width: Device.w_scale(settings.layout_content_width + '%'),
                    marginHorizontal: Config.layout_offset.left
                  } : {})
                ]}>
                  <CImage
                    style={{width: '100%', height: '100%'}}
                    resizeMode={'contain'}
                    src={Config.img_broken}
                  />
                </View>
            )
        )
    )
  }
  /* Life Cycle */
  componentDidMount = async () => {
    let {data} = this.props;
    if (data && data.thumbnail) {
      this.setState({
        _featured_media: data.thumbnail.sizes
      })

      //set type item
      if (data.video) {
        this.setState({
          _typeOfPost: 'video'
        });
      } else if (data.images && data.images.length > 0) {
        this.setState({
          _typeOfPost: 'image',
          _numOfImage: data.images.length
        })
      } else if (data.pdf) {
        this.setState({
          _typeOfPost: 'pdf'
        })
      }
    }
  }
  // Function
  _onLoad = () => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }
  _onPressItem = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.data);
    } else {
      this.props.navigation.navigate('post', {
        data: this.props.data
      });
    }
  }
}

Item.defaultProps = {
  style: {},
  touchOpacity: 0.5,
  thumbWidth: 4,
  hasThumbnail: true,
  hasIcon: true,
  hasNoImages: true,
  hasTitle: true,
  hasExcerpt: false,
  hasAgo: true,
  flatImage: false,
  stretchImage: true,
  layoutLeft: false,
  layoutRight: false,
  layoutCard: false,
  twoColumn: false,
  threeColumn: false,
  borderRadius: true
};

export default function (props) {
  const navigation = useNavigation();
  return <Item {...props} navigation={navigation}/>;
}
