/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Container, Content, Thumbnail, Input, Item } from 'native-base';
import moment from 'moment';
/** COMMON */
import { Languages, Config } from '~/config';
/** COMPONENTS */
import CHeader from '~/components/CHeader';
import CLoading from '~/components/CLoading';
import CText from '~/components/CText';
/** STYLES */
import styles from './style';
import CImage from '~/components/CImage';
import HTML from 'react-native-render-html';
import { Colors } from '~/utils/colors';
import { commonFonts } from '~/utils/styles';
import Helpers from '~/utils/helpers';
import Icon from 'react-native-fontawesome-pro';


const renderItem = (item, index) => {
  const openReply = item.reply ? item.reply : ''
  let dateFormat = Config.settingV2.general.date_format;
  let timeFormat = Config.settingV2.general.time_format;
  return (
    <View>
      <View style={styles.con_comment_item}>
        <CImage
          src={{ uri: item.author_avatar_urls["24"] }}
          style={styles.con_comment_avt}
        />
        <View style={styles.con_comment_content}>
          <View style={styles.con_comment_header}>
            <CText style={[styles.txt_author, { color: Colors.cloBody }]}>{item.author_name}</CText>
            <CText style={[styles.txt_time, { color: Colors.cloBodyMeta }]}>{moment(item.date).fromNow()}</CText>
          </View>
          <View style={styles.con_comment_body}>
            <HTML html={item.content.rendered}
              tagsStyles={{ p: { fontSize: commonFonts.xx_small.fontSize, color: Colors.cloBody } }}
            />
          </View>
          <View style={styles.con_comment_footer}>
            <TouchableOpacity>
              <CText style={[styles.txt_reply, { color: Colors.cloBodyMeta }]} i18nKey={"REPLY"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {openReply.length > 0 ? renderItemComment(item.reply) : null}
    </View>
  )
}

const renderItemComment = (item) => {
  return (
    <View style={styles.con_comment_item_child}>
      <CImage
        src={{ uri: item[0].author_avatar_urls["24"] }}
        style={styles.con_comment_avt}
      />
      <View style={styles.con_comment_content}>
        <View style={styles.con_comment_header}>
          <CText style={[styles.txt_author, { color: Colors.cloBody }]}>{item[0].author_name}</CText>
          <CText style={[styles.txt_time, { color: Colors.cloBodyMeta }]}>{moment(item[0].date).fromNow()}</CText>
        </View>
        <View style={styles.con_comment_body}>
          <HTML html={item[0].content.rendered}
            tagsStyles={{ p: { fontSize: commonFonts.xx_small.fontSize, color: Colors.cloBody } }}
          />
        </View>
        <View style={styles.con_comment_footer}>
          <TouchableOpacity>
            <CText style={[styles.txt_reply, { color: Colors.cloBodyMeta }]} i18nKey={"REPLY"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


export const ViewComment = ({
  state = null,
  props = null,
  onFunction = {
    onChangeText: () => { },
    onCreateComment: () => { },
    onDeleteComment: () => { },
  }
}) => {
  return (
    <Container>
      <CHeader title={Languages[Config.lang].COMMENT} hasBtnBack={true} />
      {state._loading ?
        <CLoading />
        :
        <View style={[styles.content, { margin: Config.layout_offset.left }]}>
          <FlatList
            data={state._newData}
            renderItem={({ item, index }) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
          <Item>
            <Input
              placeholder={Languages[Config.lang].WRITE_COMMENT}
              placeholderTextColor={Colors.cloBodyMeta}
              value={state._comment}
              onChangeText={onFunction.onChangeText}
              style={[styles.txt_input, { color: Colors.cloBody }]}
            />
            <TouchableOpacity onPress={onFunction.onCreateComment}>
              <Icon name="paper-plane" size={25} color={Colors.cloBMActive} />
            </TouchableOpacity>
          </Item>
        </View>
      }
    </Container>
  )
}