/**
 * @Description: Bookmark screen
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
/** LIBRARY */
import React from 'react';
import { View, Text, Alert } from 'react-native';
/** COMMON */
import { Device, Key, Config, Languages } from '~/config';
import Helpers from '~/utils/helpers';
import Services from '~/services';
/** COMPONENTS */
import CHeader from '~/components/CHeader';
import { ImageLeft } from '~/components/CLayout';
import CLoading from '~/components/CLoading';
/** STYLE */
import styles from './style';
import { Drawer } from 'native-base';
import CDrawer from '~/components/CDrawer';

/** DECLARE CLASS */
class BookmarkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _deleteID: null,
      _dataBookMark: [],
      _dataBookMarkIds: []
    }
  }

  /* Functions */
  _onDeleteItem = async id => {
    let { _dataBookMarkIds, _dataBookMark } = this.state;
    console.log(_dataBookMarkIds)
    if (_dataBookMarkIds && _dataBookMarkIds.length > 0) {
      let pos = _dataBookMarkIds.indexOf(id);
      if (pos != -1) {
        _dataBookMarkIds.splice(pos, 1);
        pos = _dataBookMark.findIndex(f => f.id === id);
        if (pos != -1) {
          _dataBookMark.splice(pos, 1);
        }
      }
    }
    await Helpers.setAsyncStorageBookmark(JSON.stringify(_dataBookMarkIds));
    this.setState({ _dataBookMarkIds, _dataBookMark })
  }

  _onPressMenu = () => {
    this.props.navigation.toggleDrawer();
  }

  _onPressClearAll = () => {
    Alert.alert(
      '',
      Languages[Config.lang].QUESTION_DELETE_ALL,
      [
        { text: Languages[Config.lang].NO, onPress: () => console.log('Do nothing'), style: 'cancel' },
        {
          text: Languages[Config.lang].YES, onPress: async () => {
            await Helpers.removeAsyncStorageBookmark();
            this.setState({ _dataBookMarkIds: [], _dataBookMark: [] });
          }
        }
      ],
      { cancelable: true }
    )
  }
  _getAsyncStorage = async () => {
    let { _dataBookMarkIds, _dataBookMark } = this.state;
    //GET DATA FROM STORAGE
    _dataBookMarkIds = await Helpers.getAsyncStorageBookmark(Key.ASYNC_STORAGE_BOOKMARK);
    if (_dataBookMarkIds && _dataBookMarkIds.length > 0) {
      //GET DATA BY ARRAY ID STORAGE
      let arrListPostBM = [], i, resultPost = null;
      for (i = 0; i < _dataBookMarkIds.length; i++) {
        resultPost = await Services.Posts.getPostByID(_dataBookMarkIds[i]);
        if (resultPost) arrListPostBM.push(resultPost);
      }

      if (arrListPostBM.length > 0) {
        //PREPARE LIST POST
        _dataBookMark = Helpers.prepareListPost(arrListPostBM);
      }
    }
    this.setState({ _dataBookMarkIds, _dataBookMark, _loading: false });
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({ _loading: true });
      this._getAsyncStorage();
    });
  }
  render() {
    let { _loading, _dataBookMark } = this.state;
    let lenData = _dataBookMark.length;

    return (
      <View style={styles.container}>
        <CHeader title={'Bookmark'} />
        {_loading ? <CLoading /> :
          <View style={styles.container_content_2}>
            {lenData > 0 &&
              <ImageLeft parentFlatList={this}
                onDeleteItem={this._onDeleteItem}
                data={_dataBookMark}
              />
            }
            {lenData == 0 &&
              <Text style={{ color: 'black', fontSize: Device.fS(15), fontFamily: Device.fontSlabRegular }}>
                No bookmarks saved
              </Text>
            }
          </View>
        }
      </View>
    )
  }
}

export default BookmarkScreen;
