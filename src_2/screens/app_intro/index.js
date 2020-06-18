/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React from 'react';
import { FlatList, View, StatusBar, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from "native-base";
import { connect } from 'react-redux';
/* COMPONENTS */
import CText from '~/components/CText';
import CImage from '~/components/CImage';
import CLoading from '~/components/CLoading';
/* COMMON */
import { Device, Key, Config } from '~/config';
import { Colors } from '~/utils/colors';
import { layoutWidth } from '~/utils/layout_width';
import Helpers from '~/utils/helpers';
import { commonStyles } from '~/utils/styles';
/* STYLES */
import styles from './style';

const data = [
  {
    images: Config.img_broken,
    title: "Focus UX ",
    description: "Personalization of User Experience"
  },
  {
    images: Config.img_broken,
    title: "Focus UX",
    description: "Personalization of User Experience"
  },
]

class AppIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _activeIdx: 0
    }
    this._data = data;
  }

  /* FUNCTIONS */
  renderItem = (item) => {
    return (
      <Animatable.View animation={"fadeIn"} style={styles.con_item}>
        <View style={{ width: Device.width, height: Device.height }}>
          <CImage
            style={styles.img_intro}
            src={item.url ? { uri: item.url } : Config.img_broken}
          />
        </View>
        {/* <View style={styles.con_slider_layer} /> */}
        <View style={[styles.con_group_txt, { width: Device.sW(`${layoutWidth.width}%`), paddingLeft: Device.pH(layoutWidth.width) }]}>
          <CText style={styles.txt_title_item} numberOfLines={3}>{item.title}</CText>
          <CText style={styles.txt_content_item} numberOfLines={6}>{item.description}</CText>
        </View>
      </Animatable.View>
    )
  }

  _scrollToIndex = (index, animated) => {
    this.listRef && this.listRef.scrollToIndex({ index, animated });
    this.setState({ _activeIdx: index });
  }

  _getStarted = () => {
    this.conAnimationRef.fadeOutUpBig();
    Helpers.setDataStorage(Key.AS_APP_INTRO, 1);
    Helpers.resetNavigation(this.props.navigation, "RootTab");
  }

  _viewDot = (data, activeIdx) => {
    return (
      <View style={styles.con_dot}>
        <FlatList
          style={{ marginTop: 10 }}
          data={data}
          renderItem={({ item, index }) =>
            <View style={index === activeIdx ? [styles.con_dot_active, { backgroundColor: Colors.cloBMActive }] : styles.con_dot_unactive} />
          }
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>

    )
  }

  _getSettingApp = () => {
    let { setting } = this.props;
    if (setting.settingsV2 && setting.settingsV2.intro_screen.intro_screen_gallery.length > 0) {
      this._data = setting.settingsV2.intro_screen.intro_screen_gallery;
    }
    this.setState({ _loading: false });
  }

  /* LIFE CYCLE */
  componentDidMount() {
    this._getSettingApp();
  }

  /* RENDER */
  render() {
    return (
      <>
        {this.state._loading ?
          <CLoading />
          :
          <Animatable.View duration={200} ref={ref => (this.conAnimationRef = ref)} style={styles.con} >
            <StatusBar translucent backgroundColor={"transparent"} />

            <FlatList ref={(ref) => this.listRef = ref}
              data={this._data}
              renderItem={({ item, index }) => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              // scrollEnabled={false}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={Device.OS === 'android'}
              onMomentumScrollEnd={(event) => {
                let _activeIdx = Math.ceil(event.nativeEvent.contentOffset.x ? event.nativeEvent.contentOffset.x / Device.width : 0);
                this.setState({ _activeIdx });
              }}
              getItemLayout={(item, index) => (
                { length: Device.width, offset: Device.width * index, index }
              )}
            />
            {this._viewDot(this._data, this.state._activeIdx)}

            {this.state._activeIdx === this._data.length - 1 ?
              <Animatable.View style={[styles.con_group_btn, { paddingHorizontal: Config.layout_offset.left }]}>
                <Button transparent style={[styles.con_btn, {backgroundColor: Colors.cloBMActive}]} block onPress={this._getStarted} >
                  <CText style={[styles.txt_btn, {color: Colors.cloHeadline}]} i18nKey={'GET_STARTED'} upperCase />
                </Button>
              </Animatable.View>
              :
              <View style={[styles.con_group_btn, { paddingHorizontal: Config.layout_offset.left }]}>
                <Button transparent style={[styles.con_btn, {backgroundColor: Colors.cloBMActive}]} block onPress={() => this._scrollToIndex(this.state._activeIdx + 1, true)} >
                  <CText style={[styles.txt_btn, {color: Colors.cloHeadline}]} i18nKey={'NEXT'} upperCase />
                </Button>
              </View>
            }

            {this.state._activeIdx !== this._data.length - 1 &&
              <TouchableOpacity style={[styles.con_skip, { right: Config.layout_offset.left }]} onPress={this._getStarted} >
                <CText style={styles.txt_skip} i18nKey={'SKIP'} />
              </TouchableOpacity>
            }
          </Animatable.View>
        }

      </>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    setting: state.setting
  }
}

export default connect(
  mapStateToProps,
  null,
)(AppIntro);
