/**
 ** FileName: 
 ** FileAuthor: 
 ** FileCreateAt: 
 ** FileDescription: 
**/
/* LIBRARY */
import { StyleSheet } from 'react-native';
/** COMMON */
import { Config, Device } from '../../config';
import { Colors } from '~/utils/colors';

export default styles = StyleSheet.create({
  con: { flex: 1, backgroundColor: 'white' },
  con_content_list: { paddingHorizontal: 15 },
  con_item_list: { width: '100%', height: Device.w_scale('28%')},
  con_loadmore: { height: 30, width: '100%', alignItems: 'center', justifyContent: 'center' },

  txt_excerpt: {
    color: Colors.cloExcPost, fontSize: Device.fS(14), fontFamily: Device.fontSlabBold,
    paddingBottom: 15, paddingHorizontal: Config.layout_offset.left
  }
})