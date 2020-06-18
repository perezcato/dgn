/**
 ** FileName: 
 ** FileAuthor: 
 ** FileCreateAt: 
 ** FileDescription: 
**/
/* LIBRARY */
import React from 'react';
import { View, FlatList, ScrollView, RefreshControl, Animated } from 'react-native';
/** COMMON */
import { Config, Device } from '~/config';
/** COMPONENTS */
import CLoading from '~/components/CLoading';
import CInnerLoading from '~/components/CInnerLoading';
import CHeader from '~/components/CHeader';
import Item from '~/components/CItem';
import { TwoColumn } from '~/components/CLayout';
/** STYLES */
import styles from './style';
import CText from '~/components/CText';
import { color } from 'react-native-reanimated';
import { Colors } from '~/utils/colors';

const ViewFooterList = (loadmore) => {
  if (loadmore) {
    return (
      <View style={styles.con_loadmore}>
        <CInnerLoading />
      </View>
    )
  }
  return null;
}

export const ViewAuthor = ({
  state = null,
  setting = {
    style: Config.layout.left_thumb,
    title: true,
    excerpt: true
  },
  onPress = {
    postsOfAuthor: () => { }
  },
  onRefresh = () => { },
  onLoadmore = () => { },
  onCloseToBottom = () => { }
}) => {
  return (
    <View style={styles.con}>
      <CHeader title={(setting.title && state._dataAuthor) ? state._dataAuthor.name : ''} hasTitle={true} hasBtnBack={true} />
      {state._loading &&
        <CLoading />
      }

      {!state._loading && setting.excerpt && state._dataAuthor && state._dataAuthor.description != '' &&
        <CText style={[styles.txt_excerpt,{ color: Colors.cloBodyMeta }]}>
          {state._dataAuthor.description}
        </CText>
      }

      {!state._loading && setting.style !== Config.layout.grid_thumb &&
        <FlatList contentContainerStyle={{marginVertical: Config.layout_offset.vertical}}
          style={styles.con}
          data={state._dataPostsOfAuthor}
          renderItem={({ item, index }) => {
            if (setting.style === Config.layout.left_thumb) {
              return (
                <View style={[styles.con_item_list, {marginVertical: Config.layout_offset.vertical}]}>
                  <Item data={item}
                    layoutLeft={true}
                    layoutLeft={true} hasExcerpt={true}
                    onPress={() => onPress.postsOfAuthor(item)} />
                </View>
              )
            }

            if (setting.style === Config.layout.right_thumb) {
              return (
                <View style={[styles.con_item_list, {marginVertical: Config.layout_offset.vertical}]}>
                  <Item data={item}
                    layoutRight={true}
                    hasExcerpt={true}
                    onPress={() => onPress.postsOfAuthor(item)} />
                </View>
              )
            }

            if (setting.style === Config.layout.card_thumb) {
              return (
                <View style={{ width: '100%', height: (Device.width * 9 / 16 + 47), marginVertical: Config.layout_offset.vertical}}>
                  <Item data={item}
                    stretchImage={false}
                    layoutCard={true}
                    onPress={() => onPress.postsOfAuthor(item)} />
                </View>
              )
            }

            return null;
          }}
          refreshing={state._refreshing}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.05}
          onEndReached={onLoadmore}
          ListFooterComponent={() => ViewFooterList(state._loadmore)}
          keyExtractor={(item, index) => index.toString()}
        />
      }

      {!state._loading && setting.style === Config.layout.grid_thumb &&
        <ScrollView contentContainerStyle={{marginVertical: Config.layout_offset.vertical}}
          style={styles.con}
          refreshControl={<RefreshControl refreshing={state._refreshing} onRefresh={onRefresh} />}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: state._scrollY } } }],
            {
              listener: event => {
                if (onCloseToBottom(event.nativeEvent)) {
                  onLoadmore()
                }
              }
            }
          )}
          onMomentumScrollEnd={({ nativeEvent }) => {
            if (onCloseToBottom(nativeEvent)) {
              onLoadmore()
            }
          }}
        >
          <TwoColumn style={{ flex: 1, backgroundColor: 'white', marginVertical: Config.layout_offset.vertical }}
            hasTitle={false}
            data={state._dataPostsOfAuthor}
          />
        </ScrollView>
      }
    </View >
  )
}