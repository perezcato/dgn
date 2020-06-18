/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
**/
/* LIBRARY */
import React from 'react';
import { Text, Animated } from 'react-native';
import { connect } from 'react-redux';
/** COMMON */
import I18n from '~/utils/languages/i18n';
import { commonFonts } from '~/utils/styles';
import { Config } from '~/config';

class CText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _i18n: I18n
    };
  }

  /** FUNCTIONS */
  _setMainLocaleLanguage = language => {
    let { _i18n } = this.state;
    _i18n.locale = language;
    this.setState({ _i18n });
  }

  /** LIFE CYCLE */
  UNSAFE_componentWillMount() {
    const { language } = this.props;
    // const { language } = Config;
    if (language) this._setMainLocaleLanguage(language.settingsV2.general.language);
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    const { language } = nextProps;
    if (nextProps && language && language.settingsV2.general) this._setMainLocaleLanguage(language.settingsV2.general.language);
  }

  /** RENDER */
  render() {
    let { style, i18nKey, animated, upperCase, numberOfLines, onPress } = this.props;
    let { _i18n } = this.state;

    if (animated) {
      if (onPress) {
        return (
          <Animated.Text style={[commonFonts.small, style]} numberOfLines={numberOfLines} onPress={onPress}>
            {upperCase ?
              (i18nKey ? _i18n.t(i18nKey) : this.props.children).toUpperCase()
              :
              i18nKey ? _i18n.t(i18nKey) : this.props.children
            }
          </Animated.Text>
        )
      }

      return (
        <Animated.Text style={[commonFonts.small, style]} numberOfLines={numberOfLines}>
          {upperCase ?
            (i18nKey ? _i18n.t(i18nKey) : this.props.children).toUpperCase()
            :
            i18nKey ? _i18n.t(i18nKey) : this.props.children
          }
        </Animated.Text>
      );
    } else {
      if (onPress) {
        return (
          <Text style={[commonFonts.small, style]} numberOfLines={numberOfLines} onPress={onPress}>
            {upperCase ?
              (i18nKey ? _i18n.t(i18nKey) : this.props.children).toUpperCase()
              :
              i18nKey ? _i18n.t(i18nKey) : this.props.children
            }
          </Text>
        );
      }

      return (
        <Text style={[commonFonts.small, style]} numberOfLines={numberOfLines}>
          {upperCase ?
            (i18nKey ? _i18n.t(i18nKey) : this.props.children).toUpperCase()
            :
            i18nKey ? _i18n.t(i18nKey) : this.props.children
          }
        </Text>
      );
    }
  }
}

CText.defaultProps = {
  style: {},
  i18nKey: '',
  animated: false,
  upperCase: false,
  numberOfLines: 1,
  onPress: null
}

const mapStateToProps = state => {
  return {
    language: state.setting
  };
};

export default connect(
  mapStateToProps,
  null
)(CText);