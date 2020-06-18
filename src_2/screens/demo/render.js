/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import {
  Container, Header, Left, Body, Title, Right,
} from "native-base";
import Icon from 'react-native-fontawesome-pro';
/* COMPONENTS */
import CText from '~/components/CText';
import CImage from '~/components/CImage';
import CLoading from '~/components/CLoading';
/* COMMON */
import { Device, Config, Languages } from '~/config';
import { Colors } from '~/utils/colors';
import { commonStyles } from '~/utils/styles';
/* STYLES */
import styles from './style'
import CHeader from '~/components/CHeader';

const renderItem = (item, state, onPress) => {

  return (
    <TouchableOpacity style={[styles.con_item, {width: (Device.sW("50%") - (Config.layout_offset.left + Config.layout_offset.left/2))}]}
      onPress={() => { state._activeId === item.id ? null : onPress(item) }}
      activeOpacity={.5}
    >
      <CImage
        style={[styles.img_item, {height: (Device.sW("50%") - (Config.layout_offset.left + Config.layout_offset.left/2)) }]}
        src={item.images}
      />
      <View style={styles.con_item_content}>
        {item.id === state._activeId &&
          <Icon name={"check-circle"} size={Device.fS(20)} type={"solid"} color={Colors.cloBMActive} />
        }
        <CText style={[styles.txt_title, item.id === state._activeId && { color: Colors.cloBMActive }]} numberOfLines={2} >{item.title}</CText>
      </View>
    </TouchableOpacity>
  )
}

export const ViewDemo = ({
  state = null,
  props = null,
  onFunction = {
    onPressBack: () => { },
    onPressItem: () => { },
    onOpenDrawer: () => { },
    onCloseDrawer: () => { }
  }
}) => {
  return (
    <Container>
      <CHeader title={Languages[Config.lang].DEMO} onMenu={onFunction.onOpenDrawer} onClose={onFunction.onCloseDrawer} />
      
      <FlatList contentContainerStyle={{ margin: Config.layout_offset.left }}
        data={state._data}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => renderItem(item, state, onFunction.onPressItem)}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />

      {
        state._loading &&
        <View style={styles.con_bg_loading}>
          <CLoading />
        </View>
      }
    </Container >
  )
}