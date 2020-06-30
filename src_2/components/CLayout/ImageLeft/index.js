/**
 * @Description: Image Left layout
 * @Created by ZiniTeam
 * @Date create: 14/11/2018
 */
/** LIBRARY */
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
/** COMMON */
import { Device, Languages, Config } from '~/config';
/** STYLES */
import styles from './style';
/** COMPONENT */
import Item from '~/components/CItem';

class ImageLeft extends React.Component {
  constructor(props) {
    super(props);
  }

  /** FUNCTIONS */
  _onPressDelete = (data, rowMap) => {
    Alert.alert(
      '',
      Languages[Config.lang].QUESTION_DELETE,
      [
        { text: Languages[Config.lang].NO, onPress: () => rowMap[data.item.key].closeRow(), style: 'cancel' },
        { text: Languages[Config.lang].YES, onPress: () => this._onPressDeleteOK(data, rowMap) }
      ],
      { cancelable: false }
    )
  }
  _onPressDeleteOK = (data, rowMap) => {
    rowMap[data.index].closeRow();
    this.props.onDeleteItem(data.item.id);
  }

  /** RENDER */
  render() {
    let { data, parentFlatList } = this.props;

    return (
      <SwipeListView
        useFlatList
        data={data}
        renderItem={({ item, index }) => (
          <View style={[styles.con_item, { paddingVertical: Config.layout_offset.left / 2, paddingHorizontal: Config.layout_offset.left }]}>
            <Item data={item} layoutLeft={true} hasExcerpt={true} />
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.con_hidden}>
            <TouchableOpacity style={styles.container_lazy_list} onPress={() => this._onPressDelete(data, rowMap)}>
              <Icon name={'trash-alt'} color={'white'} size={25} type={'light'} />
              <Text style={styles.txt_lazy_list}>{Languages[Config.lang].DELETE}</Text>
            </TouchableOpacity>
          </View>
        )}
        extraData={parentFlatList.state}
        keyExtractor={(item, index) => index.toString()}
        rightOpenValue={-65}
        useNativeDriver
        disableRightSwipe
        closeOnRowBeginSwipe
        closeOnRowOpen
        closeOnRowPress
        closeOnScroll
      />
    )
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <ImageLeft {...props} navigation={navigation} />;
}
