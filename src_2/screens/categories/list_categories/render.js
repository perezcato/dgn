/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
**/
/* LIBRARY */
import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Container } from "native-base";
import Icon from 'react-native-fontawesome-pro';
/* COMPONENTS */
import CHeader from '~/components/CHeader';
import CText from '~/components/CText';
import CLoading from '~/components/CLoading';
/* STYLES */
import styles from './style';
import { Languages, Config, Device } from '~/config';
import { Colors } from '~/utils/colors';
import CImage from '~/components/CImage';

const ViewListEmpty = () => {
  return (
    <View style={styles.con_no_data}>
      <Text style={styles.txt_no_data}>{'No Categories'}</Text>
    </View>
  )
}
const renderListCate = (item, index, onFunction) => {
  let source = "";
  if (item.thumbnail) {
    source = { uri: item.thumbnail.sizes.thumbnail }
  }
  return (
    <TouchableOpacity style={styles.con_row_item} key={index} activeOpacity={.5} onPress={() => onFunction.onPressItem(item)} >
      <View style={styles.con_row_item_left}>
        <CImage
          style={styles.img_item}
          src={source}
        />
        <CText style={styles.txt_title_item} numberOfLines={3}>{Config.html5Entities.decode(item.name)}</CText>
      </View>

      <View style={styles.con_row_item_right}>
        <Icon name={"chevron-right"} size={Device.fS(20)} color={Colors.BLACK_COLOR} type={"light"} />
      </View>
    </TouchableOpacity>
  )
}

export const ViewListCategories = ({
  state = null,
  onFunction = {
    onPressItem: () => { }
  }
}) => {
  return (
    <Container>
      <CHeader title={Languages[Config.lang].CATEGORIES} />
      {state._loading ?
        <CLoading />
        :
        <FlatList contentContainerStyle={{ paddingHorizontal: Config.layout_offset.left, paddingVertical: Config.layout_offset.vertical }}
          data={state._categories}
          renderItem={({ item, index }) => renderListCate(item, index, onFunction)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={ViewListEmpty}
        />
      }
    </Container>
  )
}
