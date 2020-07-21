/** LIBRARY */
import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Dimensions } from 'react-native';
import { Drawer } from 'native-base';
/** COMMON **/
import { Config } from '~/config';
import Services from '~/services';
/** COMPONENTS **/
import HTML from 'react-native-render-html';
import CHeader from '~/components/CHeader';
import CLoading from '~/components/CLoading';
import CDrawer from '~/components/CDrawer';
/** STYLES **/
import PageStyle from './style';

/** DECLARE CLASS */
class PageScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _dataResp: null,
      _loading: true
    };
  }

  render() {
    let { _loading, _dataResp } = this.state;

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
        <View style={PageStyle.container}>
          <CHeader
            title={this.props.sideMenu.name}
            onMenu={this._openDrawer}
            onClose={this._closeDrawer}
          />
          {_loading ? (
            <CLoading />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                PageStyle.content_box,
                { paddingHorizontal: Config.layout_offset.left },
              ]}
            >
              {_dataResp && _dataResp.content && (
                <HTML
                  html={_dataResp.content.rendered}
                  imagesMaxWidth={Dimensions.get('window').width}
                />
              )}
            </ScrollView>
          )}
        </View>
      </Drawer>
    );
  }

  /**
   * Life Cycle
   **/
  componentDidMount() {
    this._getDataFromServer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.sideMenu.id !== prevProps.sideMenu.id) {
      this._getDataFromServer();
    }
  }

  /**
   * Functions
   **/

  _getDataFromServer = async () => {
    //loading
    this.setState({
      _loading: true,
    });
    //get posts of category
    let page = await Services.Pages.getPageByID(this.props.sideMenu.id);

    if (page && page.content) {
      this.setState({
        _dataResp: page,
        _loading: false
      });
    } else {
      this.setState({ _loading: false });
    }
  };

  // FUNCTION
  _closeDrawer = () => {
    this._drawer && this._drawer._root.close();
  };

  _openDrawer = () => {
    this._drawer && this._drawer._root.open();
  };
}

const mapStateToProps = state => {
  return {
    sideMenu: state.sideMenu
  };
};

export default connect(
  mapStateToProps,
  null
)(PageScreen);
