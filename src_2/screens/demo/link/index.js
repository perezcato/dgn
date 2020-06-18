/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RNRestart from 'react-native-restart';
import { ActionSheet } from 'native-base';
/* COMPONENTS */
import { ViewLinkDemo } from './render';
/** COMMON */
import { Key, Config, Languages } from '~/config';
import { Colors } from '~/utils/colors';
import Helpers from '~/utils/helpers';
import * as bookmarkActions from '~/redux/actions/bookmark';
import * as sideMenuActions from '~/redux/actions/side_menu';
import * as settingActions from '~/redux/actions/settings';
import * as categoryActions from '~/redux/actions/category';
import wpApi from '~/config/wp.api';

var CANCEL_INDEX = 1;
var DESTRUCTIVE_INDEX = 0;

class LinkDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: false,
      _errorHostUrl: "",
      _errorConsumerKey: "",
      _errorConsumerSecret: "",
    }
    this._inputs = {};
  }

  /* FUNCTIONS */
  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onFocusNextField = (id) => {
    this._inputs[id].wrappedInstance.focus();
  }

  _onValidateUrl = async () => {
    try {
      let newURL = this._inputs['hostUrl'].wrappedInstance._lastNativeText + '/wp-json'  + wpApi.setting.v2;

      let optionsAPI = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      let resp = await fetch(newURL, optionsAPI);
      if (resp.ok) {
        this.setState({ _loading: false })
        return resp.json();
        
      }
    } catch (error) {
      console.log("Error ", error)
      this.setState({ _loading: false })
      return null;
    }
  }
  _onPressLinkDemo = async () => {
    let _isNotEmpty = this._validateFields("empty");
    if (!_isNotEmpty) {
      this.setState({ _loading: true})
      let res = await this._onValidateUrl();
      console.log("res",res)
      if (!res || res.code) {
        return Helpers.showToastDuration({}, Languages[Config.lang].VALIDATE_URL, "danger");
      } else {
        Config.host = this._inputs['hostUrl'].wrappedInstance._lastNativeText;
        this._onFetchData();
      }
    }
  }

  _validateFields = (type) => {
    if (type === "empty") {
      let { _errorHostUrl, _errorConsumerKey, _errorConsumerSecret } = this.state;
      _errorHostUrl = this._inputs['hostUrl'].wrappedInstance._lastNativeText === "" ? "HOST_URL_NOT_EMPTY" : "";
      this.setState({ _errorHostUrl, _errorConsumerKey, _errorConsumerSecret });
      if(_errorHostUrl !== "" ){
        return _errorHostUrl === "", _errorConsumerKey === "", _errorConsumerSecret === "";
      } else {
        return null
      }
      
    }
  }

  _onFetchData = () => {
    ActionSheet.show(
      {
        options: [
          { text: Languages[Config.lang].YES, icon: "refresh", iconColor: Colors.PRIMARY_COLOR },
          { text: Languages[Config.lang].CANCEL, icon: "close", iconColor: Colors.RED_COLOR }
        ],
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: Languages[Config.lang].TITLE_MESSAGE_CHANGE_DEMO + this._inputs['hostUrl'].wrappedInstance._lastNativeText + " demo?"
      },
      buttonIndex => {
        if (buttonIndex === DESTRUCTIVE_INDEX) {
          let tmpHostSocket = this._inputs['hostUrl'].wrappedInstance._lastNativeText;
          tmpHostSocket = tmpHostSocket.substring(tmpHostSocket.indexOf("://"));
          this._onSubmit({
            id: this._inputs['hostUrl'].wrappedInstance._lastNativeText,
            title: this._inputs['hostUrl'].wrappedInstance._lastNativeText,
            images: Config.img_broken,
            hostUrl: this._inputs['hostUrl'].wrappedInstance._lastNativeText,
          });
        }
      }
    )
  }

  _onSubmit = async (item) => {
    this.setState({ _loading: true });
    Config.host = item.hostUrl;


    let asDemoCustom = await Helpers.getDataStorage(Key.AS_DATA_DEMO_API_CUSTOM);
    if (asDemoCustom && asDemoCustom !== "") {
      asDemoCustom = JSON.parse(asDemoCustom);
      if (asDemoCustom.length > 0) {
        let find = asDemoCustom.findIndex(f => f.hostUrl === item.hostUrl);
        if (find !== -1) find = item;
      } else {
        asDemoCustom.push(item);
      }
    } else {
      asDemoCustom = [];
      asDemoCustom.push(item);
    }
    await Helpers.setDataStorage(Key.AS_DATA_DEMO_API_CUSTOM, JSON.stringify(asDemoCustom));
    await Helpers.setDataStorage(Key.AS_DATA_DEMO_API_CHOOSE, JSON.stringify(item));
    await Helpers.removeMultiKeyStorage([
      Key.ASYNC_STORAGE_BOOKMARK, Key.ASYNC_STORAGE_NUMBER_TO_RATING, Key.ASYNC_STORAGE_RATING, 
      Key.ASYNC_STORAGE_SETTINGS_V2, Key.AS_NEWS_BOOKMARK,
    ]);

    this.props.bookmarkActions.removerBookMark();
    this.props.settingActions.removeAllSetting();
    this.props.categoryActions.removeAllCategory();
    this.props.sideMenuActions.removeSideMenu();

    this.setState({ _loading: false });
    RNRestart.Restart();
  }

  /* LIFE CYCLE */

  /* RENDER */
  render() {
    return (
      <ViewLinkDemo
        state={this.state}
        props={this.props}
        inputs={this._inputs}
        onFunction={{
          onPressBack: this._onPressBack,
          onFocusNextField: this._onFocusNextField,
          onPressLinkDemo: this._onPressLinkDemo
        }}
      />
    )
  }

}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    bookmarkActions: bindActionCreators(bookmarkActions, dispatch),
    categoryActions: bindActionCreators(categoryActions, dispatch),
    settingActions: bindActionCreators(settingActions, dispatch),
    sideMenuActions: bindActionCreators(sideMenuActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkDemo);