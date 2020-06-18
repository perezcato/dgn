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
import { ActionSheet, Drawer } from 'native-base';
/* COMPONENTS */
import { ViewDemo } from './render';
import CDrawer from '~/components/CDrawer';
/** COMMON */
import { Colors } from '~/utils/colors';
import { DemoApi } from '~/utils/demo';
import { Config, Languages, Key } from '~/config';
import Helpers from '~/utils/helpers';
import * as bookmarkActions from '~/redux/actions/bookmark';
import * as sideMenuActions from '~/redux/actions/side_menu';
import * as settingActions from '~/redux/actions/settings';
import * as categoryActions from '~/redux/actions/category';

var CANCEL_INDEX = 1;
var DESTRUCTIVE_INDEX = 0;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: false,
      _data: DemoApi,
      _activeId: 1,
    }
  }

  /* FUNCTIONS */
  _onPressBack = () => {
    this.props.navigation.goBack()
  }

  _onPressItem = (item) => {
    ActionSheet.show(
      {
        options: [
          { text: Languages[Config.lang].YES, icon: "refresh", iconColor: Colors.PRIMARY_COLOR },
          { text: Languages[Config.lang].CANCEL, icon: "close", iconColor: Colors.RED_COLOR }
        ],
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: Languages[Config.lang].TITLE_MESSAGE_CHANGE_DEMO + item.title + " demo?"
      },
      buttonIndex => {
        if (buttonIndex === DESTRUCTIVE_INDEX) this._onSubmit(item);
      }
    )
  }

  _onSubmit = async (item) => {
    this.setState({ _activeId: item.id, _loading: true });

    Config.host = item.hostUrl;

    await Helpers .setDataStorage(Key.AS_DATA_DEMO_API_CHOOSE, JSON.stringify(item));
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

  _closeDrawer = () => {
    this._drawer && this._drawer._root.close()
  }

  _openDrawer = () => {
      this._drawer && this._drawer._root.open()
  }
  /* LIFE CYCLE */
  async componentDidMount() {
    let { _data, _activeId } = this.state;
    let asDemoCustom = await Helpers.getDataStorage(Key.AS_DATA_DEMO_API_CUSTOM);
    if (asDemoCustom && asDemoCustom !== "") {
      asDemoCustom = JSON.parse(asDemoCustom);
      if (asDemoCustom.length > 0) {
        _data = [..._data, ...asDemoCustom]
      }
    }

    let asApi = await Helpers.getDataStorage(Key.AS_DATA_DEMO_API_CHOOSE);
    if (asApi && asApi !== "") {
      asApi = JSON.parse(asApi);
      _activeId = asApi.id;
    }

    this.setState({ _activeId, _data });
  }

  /* RENDER */
  render() {
    return (
      <Drawer
        ref={ref => this._drawer = ref}
        content={<CDrawer navigation={this.props.navigation} onClose={this._closeDrawer} />}
        onClose={this._closeDrawer}
      >
        <ViewDemo
          state={this.state}
          props={this.props}
          onFunction={{
            onPressBack: this._onPressBack,
            onPressItem: this._onPressItem,
            onOpenDrawer: this._openDrawer,
            onCloseDrawer: this._closeDrawer
          }}
        />
      </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Demo);