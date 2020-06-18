/**
 * @Description: Post screen
 * @Created by ZiniTeam
 * @Date create: 10/01/2019
 */
/** LIBRARY */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Drawer } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
/** COMMON **/
import { Device } from '~/config';
import Services from '~/services';
import Helpers from '~/utils/helpers';
/** COMPONENTS **/
import CHeader from '~/components/CHeader';
import CLoading from '~/components/CLoading';
import Item from '~/components/CItem';
import CScrollView from '~/components/CScrollView';
import CDrawer from '~/components/CDrawer';
/** STYLES **/
import videoStyle from './style';

class VideoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _isLoadMore: false,
      _page: 1,
      _noMoreData: false
    }
    this._dataVideos = [];
  }

  /** FUNCTIONS */
  _getDataFromServer = async () => {
    let result = await Services.Posts.getPostByFormat('video', 1);
    if (result) {
      this._dataVideos = Helpers.prepareListPost(result);
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
        this._dataVideos = [...this._dataVideos, ...listPost];
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
    let { _loading } = this.state;

    return (
      <Drawer
        ref={ref => this._drawer = ref}
        content={<CDrawer navigation={this.props.navigation} onClose={this._closeDrawer} />}
        onClose={this._closeDrawer}
      >
        <View style={videoStyle.container}>
          <CHeader title={'Video'} onMenu={this._openDrawer} onClose={this._closeDrawer} />

          {_loading ?
            <CLoading />
            :
            <CScrollView loadMore={this._loadMoreData}>
              <View style={{ width: '100%', height: '100%', marginTop: 15 }}>
                {this._dataVideos.length > 0 &&
                  <FlatList
                    data={this._dataVideos}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ width: '100%', height: (Device.width * 9 / 16 + 47), marginBottom: 15 }}>
                          <Item data={item} flatImage={false} layoutCard={true} borderRadius stretchImage={false} />
                        </View>
                      )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                }
                {this._dataVideos.length === 0 &&
                  <View style={{ height: '100%', width: '100%', alignItems: 'center', marginTop: Device.h_scale('20%') }}>
                    <Text style={{ color: 'black', fontSize: Device.fS(14), fontFamily: Device.fontSlabRegular }}>{'No Data'}</Text>
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

export default function (props) {
  const navigation = useNavigation();

  return <VideoScreen {...props} navigation={navigation} />;
}