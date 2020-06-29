/**
 * @Description: Header of all Screens
 * @Created by ZiniTeam
 * @Date create: 12/11/2018
 */
/** LIBRARY */
import React from 'react';
import { View, Text, TouchableOpacity, Image, Share, Alert } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
/** COMMON **/
import { Device, Key, Config, ArrayBookmark, Languages } from '~/config';
import ico_bars from '~/../assets/icons/ico_bars.png';
import ico_share from '~/../assets/icons/ico_share.png';
import ico_bookmark from '~/../assets/icons/ico_bookmark.png';
import ico_bookmark_selected from '~/../assets/icons/ico_bookmark_selected.png';
/** STYLES **/
import headerStyle from './style';
import { Container, Header, Left, Body, Title, Right } from 'native-base';
import { commonStyles } from '~/utils/styles';
import { Colors } from '~/utils/colors';

/** DECLARE CLASS */
class CHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookmarked: false,
      isAtRoute: props.route.name,
      isAudio: false,
      isPlayingAudio: false,
      audioURL: ""
    };
    this._arrBookmark = [];
    this.post = Config.settingV2 && Config.settingV2.single;
    // Create instance variable(s) to store your subscriptions in your class
    _onFinishedPlayingSubscription = null;
    _onFinishedLoadingSubscription = null;
    _onFinishedLoadingFileSubscription = null;
    _onFinishedLoadingURLSubscription = null;
  }

  render() {
    let { title, hasBtnBack, hasTitle, onMenu, hasBtnClear, onClear } = this.props;
    let { isPlayingAudio, isBookmarked, isAtRoute, isAudio } = this.state;
    console.log('state of the header', this.state);
    console.log('props for the header',this.props);

    return (
      <Header hasSegment style={{
        backgroundColor: '#940a0a',
        height: Device.h_scale('10%')
      }} transparent iosBarStyle={'light-content'}
              androidStatusBarColor={'#940a0a'} translucent={false}>
        <Left>
          {hasBtnBack &&
            <Icon name={hasBtnBack ? Config.ico_back : ''} size={25} color={'#fff'} type={'light'} onPress={this._onPressBack} />
          }
          {!hasBtnBack && onMenu &&
            <TouchableOpacity onPress={onMenu}>
              <Image source={ico_bars} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          }
        </Left>

        <Body style={commonStyles.column_align_center}>
          <Title>
            <Text style={headerStyle.txt_title} ellipsizeMode={"tail"} numberOfLines={1}>
              {title ? title : 'Daily Guide Network'}
            </Text>
            {/*{hasTitle &&*/}
            {/*  <Text style={headerStyle.txt_title} ellipsizeMode={"tail"} numberOfLines={1}>*/}
            {/*    {title ? title : 'Daily Guide Network'}*/}
            {/*  </Text>*/}
            {/*}*/}
          </Title>
        </Body>

        <Right>
          {isAtRoute === 'post' && isAudio &&
            <TouchableOpacity style={{ paddingRight: Device.h_scale('3%') }}
              onPress={this._onPressPlayAudio}>
              <Icon name={isPlayingAudio ? Config.ico_pause : Config.ico_play} size={25} color={'black'} type={'light'} />
            </TouchableOpacity>
          }
          {isAtRoute === 'post' &&
            <TouchableOpacity style={{ paddingRight: Device.h_scale('3%') }}
              onPress={this._onPressShare}>
              <Icon name={'share-alt'} size={25} color={'#fff'} type={'light'} />
            </TouchableOpacity>
          }
          {isAtRoute === 'post' &&
            <TouchableOpacity
              onPress={this._onPressBookmark}>
              <Icon name={'bookmark'} size={25} color={'#fff'} type={'light'} />
            </TouchableOpacity>
          }
          {isAtRoute === 'bookmark' && hasBtnClear && onClear &&
            <TouchableOpacity>
              <Text>{Languages[Config.lang].CLEAR_ALL}</Text>
            </TouchableOpacity>
          }
        </Right>
      </Header>
    )
  }

  /**
   * Life Cycle
   */
  componentWillMount() {
    this._checkDataPost();
    if (this.state.audioURL !== "") {
      SoundPlayer.loadUrl(this.state.audioURL);
    }
  }

  // Subscribe to event(s) you want when component mounted
  componentDidMount() {
    this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      console.log('finished playing', success)
    })
    this._onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
      console.log('finished loading', success)
    })
    this._onFinishedLoadingFileSubscription = SoundPlayer.addEventListener('FinishedLoadingFile', ({ success, name, type }) => {
      console.log('finished loading file', success, name, type)
    })
    this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
      console.log('finished loading url', success, url)
    })
  }

  componentDidUpdate() {

  }
  // Remove all the subscriptions when component will unmount
  componentWillUnmount() {
    this._onFinishedPlayingSubscription.remove()
    this._onFinishedLoadingSubscription.remove()
    this._onFinishedLoadingURLSubscription.remove()
    this._onFinishedLoadingFileSubscription.remove()
  }

  /**
   * Functions
   */
  _onPressLink = () => {
    this.props.navigation.navigate("linkDemo");
  }
  _onPressBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    } else {
      this.props.navigation.goBack();
    }
  }

  _onPressComment = () => {
  }

  _onPressShare = () => {
    Share.share({
      message: this.props.data.orginData.link,
      url: this.props.data.orginData.link,
      title: 'Sharing'
    }, {
      // Android only:
      dialogTitle: 'Sharing',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }

  _onPressPlayAudio = async () => {
    if (!this.state.isPlayingAudio) {
      SoundPlayer.play();
      this.setState({ isPlayingAudio: true });
    } else {
      SoundPlayer.pause();
      this.setState({ isPlayingAudio: false });
    }
  }

  _onPressBookmark = () => {
    let pos = this._arrBookmark.indexOf(this.props.data.id);
    if (pos != -1) {
      //remove
      this._arrBookmark.splice(pos, 1);
      this.setState({ isBookmarked: false });
    } else {
      //add
      this._arrBookmark.push(this.props.data.id);
      this.setState({ isBookmarked: true });
    }
    this._arrBookmark = Array.from(new Set(this._arrBookmark));
    AsyncStorage.setItem(Key.ASYNC_STORAGE_BOOKMARK, JSON.stringify(this._arrBookmark));
    return Alert.alert('Bookmarks','added to bookmarks')
  }

  _checkDataPost = async () => {
    let { isBookmarked, isAudio, audioURL } = this.state;
    if (this.props.data) {
      /** Check data storage bookmark */
      let value = await AsyncStorage.getItem(Key.ASYNC_STORAGE_BOOKMARK);
      if (value !== null) {
        let arr = JSON.parse(value);
        this._arrBookmark = Array.from(new Set(this._arrBookmark.concat(arr)));

        let pos = this._arrBookmark.indexOf(this.props.data.id);
        if (pos != -1) {
          isBookmarked = true;
        }
      }
      /** Check data audio */
      if (this.props.data.orginData.audioURL && this.props.data.orginData.audioURL !== "") {
        isAudio = true;
        audioURL = this.props.data.orginData.audioURL;
      }
    }
    this.setState({ isBookmarked, isAudio, audioURL });
  }
}

CHeader.defaultProps = {
  hasTitle: true,
  hasBtnBack: false,
  hasBtnClear: false
};

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <CHeader {...props} navigation={navigation} route={route} />;
}
