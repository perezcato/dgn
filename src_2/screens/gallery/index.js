/**
 * @Description: Post screen
 * @Created by ZiniTeam
 * @Date create: 10/01/2019
 */
/** LIBRARY */
import React from 'react';
import {Text, View} from 'react-native';
/** COMMON **/
import {Device} from '~/config';
import Services from '~/services';
import Helpers from '~/utils/helpers';
import {Colors} from '~/utils/colors';
/** COMPONENTS **/
import CHeader from '~/components/CHeader';
import CLoading from '~/components/CLoading';
import {TwoColumn} from '~/components/CLayout';
import CScrollView from '~/components/CScrollView';
/** STYLES **/
import styles from './styles';
import {Drawer} from 'native-base';
import CDrawer from '~/components/CDrawer';

class GalleryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _isLoadMore: false,
      _page: 1,
      _noMoreData: false
    };
    this._init = {
      icNameGroup: 'level-down-alt',
      icCloGroup: 'black',
      icNamePost: 'bookmark',
      icCloPostActive: Colors.cloBMActive,
      icCloPostUnActive: 'white',
      icActiveDotColor: 'white',
    };
    this._dataGallerys = [];
  }

  /** FUNCTIONS */
  _getDataFromServer = async () => {
    let result = await Services.Posts.getPostByFormat('gallery', 1);
    if (result && result.length > 0) {
      this._dataGallerys = Helpers.prepareListPost(result);
      this.setState({
        _loading: false,
        _noMoreData: false,
        _page: 1,
      });
      if (result.length < 6) {
        this.setState({
          _noMoreData: true,
        });
      }
    } else {
      this.setState({
        _loading: false,
        _noMoreData: true,
        _page: 1
      });
    }
  }

  _loadMoreData = async () => {
    if (!this.state._noMoreData) {
      let listPost = await Services.Posts.getPostByFormat('video', this.state._page + 1);
      if (listPost && listPost.length > 0) {
        listPost = Helpers.prepareListPost(listPost);
        this._dataGallerys = [...this._dataGallerys, ...listPost];
        this.setState({
          _page: this.state._page + 1,
        })
      } else {
        this.setState({
          _noMoreData: true,
        })
      }
    }
  }

  _closeDrawer = () => {
    this._drawer && this._drawer._root.close()
  }

  _openDrawer = () => {
    this._drawer && this._drawer._root.open()
  }

  /** LIFE CYCLE */
  componentDidMount() {
    this._getDataFromServer();
  }

  /** RENDER */
  render() {
    let {_loading} = this.state;
    return (
      <Drawer
        ref={ref => this._drawer = ref}
        content={<CDrawer navigation={this.props.navigation} onClose={this._closeDrawer}/>}
        onClose={this._closeDrawer}
      >
        <View style={styles.container}>
          <CHeader title={'Gallery'} onMenu={this._openDrawer} onClose={this._closeDrawer}/>

          {_loading ?
            <CLoading/>
            :
            <CScrollView loadMore={this._loadMoreData}>
              <View style={{width: '100%', height: '100%'}}>
                {this._dataGallerys.length > 0 &&
                <TwoColumn style={{flex: 1}} hasTitle={false}
                           icNameOfTitle={this._init.icNameGroup}
                           icCloOfTitle={this._init.icCloGroup}
                           data={this._dataGallerys}
                />
                }
                {this._dataGallerys.length === 0 &&
                <View style={{height: '100%', width: '100%', alignItems: 'center', marginTop: Device.h_scale('20%')}}>
                  <Text style={{
                    color: 'black',
                    fontSize: Device.fS(14),
                    fontFamily: Device.fontSlabRegular,
										fontStyle: 'italic'
                  }}>{'No Pictures available'}</Text>
                </View>
                }
              </View>
            </CScrollView>
          }
        </View>
      </Drawer>
    );
  }
}


export default GalleryScreen;
