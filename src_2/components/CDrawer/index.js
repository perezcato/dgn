/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/** LIBRARY */
import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image, FlatList, ClippingRectangle } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { useNavigation, CommonActions } from '@react-navigation/native';
import Icon from 'react-native-fontawesome-pro';
/** COMMON */
import { Device, String, Config, Languages } from '~/config';
/** STYLES */
import sideMenuStyle from './style';
/** API */
import Services from '../../services'
/** REDUX ACTIONS */
import * as sideMenuActions from '../../redux/actions/side_menu';
import { Colors } from '~/utils/colors';

class CDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _loading: true
    }
    this.itemDrawer = {
      topSections: [
        {
          id: 'home',
          name: Languages[Config.lang].NEWS,
          navName: 'home',
          iconName: 'newspaper'
        },
        {
          id: 'video',
          name: Languages[Config.lang].VIDEOS,
          navName: 'video',
          iconName: 'video'
        },
        {
          id: 'gallery',
          name: Languages[Config.lang].GALLERY,
          navName: 'gallery',
          iconName: 'image'
        },
        {
          id: 'bookmark',
          name: Languages[Config.lang].BOOKMARK,
          navName: 'bookmark',
          iconName: 'bookmark'
        },
        // {
        //   id: 'demo',
        //   name: Languages[Config.lang].DEMO,
        //   navName: 'demo',
        //   iconName: 'sparkles'
        // },
      ]
    }

    this.general = Config.settingV2 && Config.settingV2.general;

    this._categories = [];
    this._logo = null;
    this._logoPosition = 0;     // 0: left --- 1: right
    this._init = {
      CONTACT_US: Languages[Config.lang].CONTACT_US,
      POLICY: Languages[Config.lang].PRIVATE_POLICY,
      TERM_OF_USE: Languages[Config.lang].TERM_OF_USE,
      SEARCH: Languages[Config.lang].SEARCH,
      DEMO: Languages[Config.lang].DEMO
    };
  }
  /** FUNCTIONS */
  _getCategories = async () => {
    let resp = await Services.Categories.getAllCategories()
    if (resp) {
      return resp;
    }
  }

  _navigateToCategory = (id, name, isGoSub) => {
    console.log('id, name', id, name)
    console.log('this.props.sideMenu', this.props.sideMenu)
    if (this.props.sideMenu.id === id) {
      this.props.onClose();
    } else {
      this.props.onClose();
      //wait for end animation
      let _routeName = (!isNaN(id) ? 'category' : id);
      if (_routeName === 'search') {
        let prevRouteObj = Object.assign({}, this.props.sideMenu);
        this.props.navigation.navigate(_routeName, {
          prevRouteObj
        });
        this.props.sideMenuActions.changeSideMenu({
          name: name,
          id: id
        })
      } else {
        this.props.sideMenuActions.changeSideMenu({
          name: name,
          id: id
        })
        if (!isGoSub) {
          this.props.navigation.navigate(_routeName);
        } else {
          this.props.navigation.navigate('subCategories', {
            categoryId: id,
            categoryName: name,
          });
        }
      }

    }
  }

  _navigateToPage = (id, name) => {
    if (this.props.sideMenu.id === id) {
      this.props.onClose();
    } else {
      this.props.onClose();
      //wait for end animation
      this.props.sideMenuActions.changeSideMenu({
        name: name,
        id: id
      });
      this.props.navigation.navigate((id === 'contact' ? id : id === 'demo' ? id : 'page'));
    }
  }


  _renderFooter = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this._logoPosition == 0 ?
          <Image
            style={sideMenuStyle.img_icon}
            source={this._logo ? { uri: this._logo } : Config.ico_logo_default}
            resizeMode={'contain'}
          />
          : null
        }
        <View style={{ marginLeft: 25 }}>
          <Text style={[sideMenuStyle.navItemFooter, { color: Colors.cloBody }]}>{(this.general && this.general.app_name) ? this.general.app_name : ''}</Text>
          <Text style={[sideMenuStyle.navItemFooter, { color: Colors.cloBody }]}>{'Version'} {(this.general && this.general.app_version) ? this.general.app_version : ''}</Text>
        </View>
        {this._logoPosition == 1 ?
          <Image
            style={sideMenuStyle.img_icon}
            source={this._logo ? { uri: this._logo } : Config.ico_logo_default}
            resizeMode={'contain'}
          />
          : null
        }
      </View>
    )
  }
  /** LIFE CYCLE */
  componentDidMount = async () => {
    //get profile from api
    let categories = await this._getCategories();
    if (categories) {
      //set profile data
      this._categories = categories;
      //set logo + position logo for footer side menu
      if (this.general) {
        if (this.general.app_logo) {
          this._logo = this.general.app_logo.sizes.medium;
        }

        if (this.general.log_position) {
          this._logoPosition = Number(this.general.log_position);
        }
      }

      //ready to render
      this.setState({ _loading: false });
    }
  }
  /** RENDER */
  render() {
    return (
      <View style={sideMenuStyle.container}>
        <TouchableOpacity style={[sideMenuStyle.contentTop, { backgroundColor: Colors.cloBMActive }]}
          onPress={() => this._navigateToCategory('search', 'Search', false)}>
          <View style={{ width: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: Config.layout_offset.left }}>
            <Icon name={'search'} size={20} color={Colors.cloBody} type={'light'} />
          </View>
          <View style={{ width: '85%', justifyContent: 'center' }}>
            <Text style={{ fontSize: Device.fS(17), fontFamily: Device.fontSlabBold }}>{this._init.SEARCH}</Text>
          </View>
        </TouchableOpacity>

        <ScrollView>
          {this.general.menu_categories.post &&
          <View>
            <View style={sideMenuStyle.container_sectionHeadingStyle}>
              <Text style={[sideMenuStyle.sectionHeadingStyle, { marginLeft: Config.layout_offset.left, color: Colors.cloHeadline },]}>
                {String.txtDrawerSection_2.toUpperCase()}
              </Text>
            </View>
            {this._categories.length > 0 &&
              <View >
                <FlatList
                  data={this._categories}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={sideMenuStyle.container_navItemStyle}
                        onPress={() => this._navigateToCategory(item.id, item.name, true)}
                      >
                        <Icon containerStyle={[sideMenuStyle.container_iconnav, { paddingHorizontal: Config.layout_offset.left }]} name={item.acf ? item.acf.class_name : 'newspaper'}
                          size={20} color={Colors.cloBody} type={'light'} />
                        <Text style={[sideMenuStyle.navItemStyle, { color: Colors.cloBody }]} >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            }
          </View>
          }
          <View>
            <View style={sideMenuStyle.container_sectionHeadingStyle}>
              <Text style={[sideMenuStyle.sectionHeadingStyle, { marginLeft: Config.layout_offset.left, color: Colors.cloHeadline }]}>
                {String.txtDrawerSection_1.toUpperCase()}
              </Text>
            </View>
            <View >
              <FlatList
                data={this.itemDrawer.topSections}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={sideMenuStyle.container_navItemStyle}
                      onPress={() => this._navigateToCategory(item.id, item.name, false)}
                    >
                      <Icon containerStyle={[sideMenuStyle.container_iconnav, { paddingHorizontal: Config.layout_offset.left }]} name={item.iconName} size={20} color={Colors.cloBody} />
                      <Text style={[sideMenuStyle.navItemStyle, { color: Colors.cloBody }]} >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
          <View>
            <View style={sideMenuStyle.container_sectionHeadingStyle}>
              <Text style={[sideMenuStyle.sectionHeadingStyle, { marginLeft: Config.layout_offset.left, color: Colors.cloHeadline }]}>
                {String.txtDrawerSection_3.toUpperCase()}
              </Text>
            </View>
            <View >
              <TouchableOpacity style={sideMenuStyle.container_navItemStyle} onPress={() => this._navigateToPage('contact', this._init.CONTACT_US)}>
                <Icon containerStyle={[sideMenuStyle.container_iconnav, { paddingHorizontal: Config.layout_offset.left }]} name={'phone'} size={20} color={Colors.cloBody} type={'light'} />
                <Text style={[sideMenuStyle.navItemStyle, { color: Colors.cloBody }]} >
                  {this._init.CONTACT_US}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={sideMenuStyle.container_navItemStyle} onPress={() => this._navigateToPage(this.general.privacy_page ? this.general.privacy_page : -1, this._init.POLICY)}>
                <Icon containerStyle={[sideMenuStyle.container_iconnav, { paddingHorizontal: Config.layout_offset.left }]} name={'user-lock'} size={20} color={Colors.cloBody} type={'light'} />
                <Text style={[sideMenuStyle.navItemStyle, { color: Colors.cloBody }]} >
                  {this._init.POLICY}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={sideMenuStyle.container_navItemStyle} onPress={() => this._navigateToPage(this.general.term_condition_page ? this.general.term_condition_page : -1, this._init.TERM_OF_USE)}>
                <Icon containerStyle={[sideMenuStyle.container_iconnav, { paddingHorizontal: Config.layout_offset.left }]} name={'clipboard-list'} size={20} color={Colors.cloBody} type={'light'} />
                <Text style={[sideMenuStyle.navItemStyle, { color: Colors.cloBody }]} >
                  {this._init.TERM_OF_USE}
                </Text>
              </TouchableOpacity>
              { this.general.is_show_demo_app &&
                <TouchableOpacity style={sideMenuStyle.container_navItemStyle} onPress={() => this._navigateToCategory('demo',Languages[Config.lang].DEMO, false)}>
                  <Icon containerStyle={[sideMenuStyle.container_iconnav, { paddingHorizontal: Config.layout_offset.left }]} name={'sparkles'} size={20} color={Colors.cloBody} type={'light'} />
                  <Text style={[sideMenuStyle.navItemStyle, { color: Colors.cloBody }]} >
                    {this._init.DEMO}
                  </Text>
                </TouchableOpacity>
              }
            </View>
          </View>

          <View style={sideMenuStyle.container_footer}>
            {this._renderFooter()}
          </View>

        </ScrollView>
      </View>
    );
  }
}
CDrawer.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    sideMenu: state.sideMenu,
    setting: state.setting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sideMenuActions: bindActionCreators(sideMenuActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  function (props) {
    const navigation = useNavigation();
    return <CDrawer {...props} navigation={navigation} />;
  }
);