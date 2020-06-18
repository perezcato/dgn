/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { TabView } from 'react-native-tab-view';
/* COMPONENTS */
import CImage from '~/components/CImage';
import CText from '~/components/CText';
import CLoading from '~/components/CLoading';
/* COMMON */
import { Config, Device } from '~/config';
/* STYLES */
import styles from './style';

import { Colors } from '~/utils/colors';


const RenderLazyTab = () => <CLoading />

const ViewSubCategoryItem = (index, item, onPress) => {
  let source = "";
  if (item.thumbnail) {
    source = { uri: item.thumbnail.sizes.thumbnail }
  }
  return (
    <TouchableOpacity style={styles.con_row_item} key={index} activeOpacity={.5} onPress={() => onPress(item.id, item.name)} >
      <View style={styles.con_row_item_left}>
        <CImage
          style={styles.img_item}
          src={source}
        />
        <CText style={styles.txt_title_item} numberOfLines={3}>{Config.html5Entities.decode(item.name)}</CText>
      </View>

      <View style={styles.con_row_item_right}>
        <View style={styles.con_count_product}>
          <CText style={styles.txt_count_product}>{item.count}</CText>
        </View>
        <Icon name={"chevron-right"} size={Device.fS(20)} color={Colors.BLACK_COLOR} type={"light"} />
      </View>
    </TouchableOpacity>
  )
}
export const ViewSubCategories = ({
  state = null,
  category = {
    parent: {
      id: '',
      name: ''
    }
  },
  onFunction = {
    onBack: () => { },
    onPressItem: () => { },
    onRenderTabbar: () => { },
    onRenderScene: () => { },
    onChangeTabIndex: () => { },
  }
}) => {
  return (
    <TabView
      initialLayout={styles.con_tab}
      navigationState={state}
      renderScene={onFunction.onRenderScene}
      renderTabBar={onFunction.onRenderTabbar}
      onIndexChange={onFunction.onChangeTabIndex}
      lazy={true}
      lazyPreloadDistance={0}
      renderLazyPlaceholder={RenderLazyTab}
      tabBarPosition={'top'}
      removeClippedSubviews={Device.OS === 'android'}
      swipeEnabled={false}
    />
    // <FlatList style={styles.con}
    //   contentContainerStyle={styles.con_content_list, { paddingHorizontal: Config.layout_offset.left }}
    //   data={state._dataSubCategories}
    //   renderItem={({ item, index }) => ViewSubCategoryItem(index, item, onFunction.onPressItem)}
    //   keyExtractor={(item, index) => index.toString()}
    // />
  )
}