/**
 * @Description: style Image Left layout 
 * @Created by ZiniTeam
 * @Date create: 14/11/2018
 */
/** COMMON */
import { Device } from '~/config';
import { Colors } from '~/utils/colors';

export default {

  container: { flex: 1, width: '100%' },
  con_hidden: {
    flex: 1,
    height: Device.w_scale('28%'),
    width: Device.width,
    alignItems: 'flex-end'
  },
  con_item: { flex: 1, backgroundColor: 'white', width: Device.width, height: Device.w_scale('28%'), paddingHorizontal: 15 },

  fl_item: { flex: 1, width: '100%', paddingTop: 10 },

  /* POST ITEM */
  linear_gardiant: { height: '100%', width: '100%', borderRadius: 7 },
  container_post_icon: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', padding: 7 },
  container_post_item: { flex: 1, flexDirection: 'row', width: Device.width, marginBottom: 15 },
  container_post_touch: { position: 'absolute', top: 5, right: 5, alignItems: 'center', justifyContent: 'center', height: Device.h_scale('5%'), width: Device.w_scale('7%') },

  img_post_item: { width: '100%', borderRadius: 7 },

  txt_post_item_title: { color: Colors.cloTitlePost, fontSize: Device.fS(13), fontFamily: Device.fontSlabBold, width: Device.w_scale('57.6%'), marginTop: 5, lineHeight: 17 },
  txt_post_item_des: { color: Colors.cloText, fontSize: Device.fS(11), fontFamily: Device.fontSlabLight, width: Device.w_scale('57.6%'), marginTop: 5, lineHeight: 17 },
  txt_post_item_time: { color: Colors.cloTimeSend, fontSize: Device.fS(9), fontFamily: Device.fontSlabLight, width: Device.w_scale('57.6%'), marginTop: 5 },
  txt_post_item_icon: { color: 'white', fontSize: Device.fS(11), fontFamily: Device.fontSlabRegular, marginLeft: 5 },

  /* LAZY LIST */
  container_lazy_list: { height: '100%', width: 60, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' },
  txt_lazy_list: { color: 'white', fontSize: Device.fS(13), fontFamily: Device.fontSlabBold, marginTop: 10 },
  il_content: { paddingHorizontal: 15 },
}