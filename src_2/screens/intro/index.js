/**
 * @Description: Intro screen
 * @Created by ZiniTeam
 * @Date create: 06/11/2018
 */
/** LIBRARY */
import React from 'react';
import { Image, ImageBackground, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackActions, CommonActions } from '@react-navigation/native';
import firebase from 'react-native-firebase';
/** COMMON */
import { Config, Key } from '~/config';
import Services from '~/services';
import Helpers from '~/utils/helpers';
import * as settingActions from '~/redux/actions/settings';
/** STYLE */
import styles from './style';
import { Colors } from '~/utils/colors';

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { navigation, setting } = this.props;
    if (setting && setting.intro_screen) {
      if (setting.intro_screen.is_show_intro_screen) {
        let appIntro = await Helpers.getDataStorage(Key.AS_APP_INTRO);
        if (appIntro && appIntro !== "") {
          setTimeout(() => {
            Helpers.resetNavigation(navigation, "RootTab")
          }, 3000);
        } else {
          setTimeout(() => {
            Helpers.resetNavigation(navigation, "appIntro")
          }, 3000);
        }
      } else {
        setTimeout(() => {
          Helpers.resetNavigation(navigation, "RootTab")
        }, 3000);
      }
    }

  }

  /** RENDER */
  render() {
    return (
      <ImageBackground
        style={styles.container}
        imageStyle={styles.img_bg}
        source={Config.img_bg}
        resizeMode={'cover'}
      >
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    setting: state.setting.settingsV2
  }
}

export default connect(
  mapStateToProps,
  null
)(IntroScreen);
