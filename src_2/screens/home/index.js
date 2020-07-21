/**
 * @Description: News screen
 * @Created by ZiniTeam
 * @Date create: 06/11/2018
 */
/** LIBRARY */
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Rate, { AndroidMarket } from 'react-native-rate';
import { Drawer } from 'native-base';
/** COMMON */
import { Config, Device, Languages } from '~/config';
import Services from '~/services';
import Helpers from '~/utils/helpers';
/** COMPONENTS */
import CHeader from '~/components/CHeader';
import NewsScreen from '~/screens/news';
import CategoriesScreen from '~/screens/categories';
import CRate from '~/components/CRate';
import { Colors } from '~/utils/colors';
import CDrawer from '~/components/CDrawer';
/** STYLE */
import styles from '~/screens/news/style';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _isTabCategories: false,
      _rating: false,
      index: 0,
      routes: [
        {
          index: 0,
          id: 'home',
          key: 'home',
          title: Languages[Config.lang].HOME,
          tabColor: Colors.cloTab[0].tab
        }
      ]
    };
    this.arr = [];
  }

  _getDataFromServer = async () => {
    let { routes } = this.state,
      i;
    let respListCategories = await Services.Categories.getAllCategories();
    if (respListCategories && respListCategories.length > 0) {
      for (i = 0; i < respListCategories.length; i++) {
        let tmp = respListCategories[i];
        tmp.index = i + 1;
        tmp.key = respListCategories[i].name;
        tmp.title = respListCategories[i].name;
        if (respListCategories[i].color) {
          tmp.tabColor = respListCategories[i].color;
        } else {
          if (i > Colors.cloTab.length - 1) {
            tmp.tabColor = Colors.cloTab[i - 10 + 1].tab;
          } else {
            tmp.tabColor = Colors.cloTab[i + 1].tab;
          }
        }
        if (respListCategories[i].is_home_tab) {
          routes.push(tmp);
        }
      }
    }
    console.log("route", routes);
    this.setState({
      routes,
      _loading: false
    });
  };

  _onIndexChange = index => {
    this.setState({ index });
    if (this.arr.length >= index) {
      this.svRef.scrollTo({
        x: this.arr[index],
        y: 0,
        animated: true
      });
    }
  };

  _onPressTabItem = ({ route, preventDefault }) => {
    this.setState({ index: route.index });
  };

  _onPressMenu = () => {
    this.props.navigation.toggleDrawer();
  };

  /** OTHER SCREENS */
  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'home':
        return <NewsScreen isHome={true} navigation={this.props.navigation} />;

      default:
        return (
          <CategoriesScreen
            isHome={true}
            navigation={this.props.navigation}
            idByTabItem={route.id}
          />
        );
    }
  };

  _renderTabbar = props => {
    let { routes, index } = this.state;
    return (
      // <View style={[styles.tabBar, { borderBottomColor: routes[index].tabColor }]}>
      <View />
    );
  };

  _renderTextTabbar = (index, route) => {
    return (
      <Text
        style={[
          styles.txtTabName,
          this.state.index === index && { fontWeight: 'bold' },
          { color: '#fff' },
        ]}
        numberOfLines={1}
      >
        {route.title}
      </Text>
    );
  };

  _renderLazyPlaceholder = () => {
    return null;
  };

  _onToggleModalRating = () => {
    this.setState({ _rating: !this.state._rating });
  };

  _onPressStartRating = () => {
    this._onToggleModalRating();
    let options = {
      AppleAppID: Config.ratingAppleAppID,
      GooglePackageName: Config.ratingGooglePackageName,
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      inAppDelay: 1.0
    };
    Rate.rate(options, async success => {
      if (success) {
        await Helpers.setAsyStrRating('true');
      }
    });
  };

  _checkAlreadyRatingApp = async () => {
    let _isAlreadyRate = await Helpers.getAsyStrRating();
    if (_isAlreadyRate) {
      _isAlreadyRate = JSON.parse(_isAlreadyRate);
      if (!_isAlreadyRate) {
        let _numberShowRate = await Helpers.getAsyStrNumberToRating();
        if (_numberShowRate) {
          _numberShowRate = JSON.parse(_numberShowRate);
          if (Number(_numberShowRate) >= Config.numberToShowRate) {
            await Helpers.setAsyStrNumberToRating('1');
            this._onToggleModalRating();
          } else {
            _numberShowRate = Number(_numberShowRate);
            _numberShowRate += 1;
            await Helpers.setAsyStrNumberToRating(
              JSON.stringify(_numberShowRate)
            );
          }
        }
      }
    } else {
      await Helpers.setAsyStrRating('false');
      await Helpers.setAsyStrNumberToRating('1');
    }
  };

  _closeDrawer = () => {
    console.log("close Drawer");
    this._drawer && this._drawer._root.close();
  };

  _openDrawer = () => {
    console.log("open Drawer");
    this._drawer && this._drawer._root.open();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._getDataFromServer();
    this._checkAlreadyRatingApp();
  }

  /** RENDER */
  render() {
    let { _loading, _rating } = this.state;
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        content={
          <CDrawer
            navigation={this.props.navigation}
            onClose={this._closeDrawer}
          />
        }
        onClose={this._closeDrawer}
      >
        <View style={styles.container}>
          <CHeader
            title={'Daily Guide Network'}
            onMenu={this._openDrawer}
            onClose={this._closeDrawer}
          />
          <View style={styles.container}>
            {!_loading && (
              <TabView
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabbar}
                onIndexChange={this._onIndexChange}
                initialLayout={{ width: Device.width }}
                lazy={true}
                renderLazyPlaceholder={this._renderLazyPlaceholder}
                tabBarPosition={'top'}
                swipeEnabled={false}
              />
            )}
          </View>

          {_loading && <View style={styles.con_loading} />}

          {/*<CRate
            visible={_rating}
            onRequestClose={this._onToggleModalRating}
            onOK={this._onPressStartRating}
          />*/}
        </View>
      </Drawer>
    );
  }
}

export default HomeScreen;
