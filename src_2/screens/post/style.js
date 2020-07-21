/**
 * @Description: Style Post screen
 * @Created by ZiniTeam
 * @Date create: 20/11/2018
 */
import { Device } from '~/config';
import { Colors } from '~/utils/colors';
import { commonStyles, commonFonts } from '~/utils/styles';

export default {
  container: { flex: 1, backgroundColor: Colors.cloBackgroundOfApp },
  video_size: { width: '100%', height: '100%' },
  video_box: { width: '100%', height: Device.w_scale('55.73%'), marginVertical: 15 },
  p_timeAuthor: { flexDirection: 'row', marginTop: Device.w_scale('1.33%') },
  txt_title: { color: Colors.cloTitlePost, fontSize: Device.fS(24), fontFamily: Device.fontSlabBold },
  txt_short_des: { color: Colors.cloExcPost, fontSize: Device.fS(14), fontFamily: Device.fontSlabBold },
  txt_time_author: { color: Colors.cloTimePost, fontSize: Device.fS(12), fontFamily: Device.fontSlabRegular },

  container_side_swipe_item: { position: 'absolute', bottom: 0, padding: 10, width: Device.width },
  txt_side_swipe_item_page: { color: 'white', fontSize: Device.fS(12), fontFamily: Device.fontSlabBold },

  // POST: GALLERY IMAGEITEM
  p_imageItem: { width: Device.w_scale('32.8%'), height: Device.w_scale('32.8%'), backgroundColor: '#ebebeb', marginRight: Device.w_scale('0.8%'), marginBottom: Device.w_scale('0.8%') },
  p_imageThumbList: { width: '100%', height: '100%' },

  //RELATED
  relatedPosts: { marginBottom: 5, borderTopColor: '#f2f2f2', borderTopWidth: 10 },
  title_wrapper: { flexDirection: 'row', borderLeftColor: 'black', borderLeftWidth: 3, marginTop: 15, marginBottom: 5 },
  title: { marginLeft: 10, fontSize: Device.fS(15), fontFamily: Device.fontSlabBold, color: 'black' },

  //BUTTON
  con_btn: { marginTop: 20, backgroundColor: Colors.cloBMActive, borderRadius: 5 },

  txt_btn: commonStyles.txt_title_button,

  txt_title_video: [commonFonts.xxx_small, { textAlign: 'center', color: Colors.cloBodyMeta }],
  txt_p_tag: {fontSize: Device.fS(12), fontFamily: Device.fontSlabRegular, color: Colors.cloBody},
  txt_h4: {fontSize: Device.fS(16), fontFamily: Device.fontSlabBold, color: Colors.cloHeadline},
  txt_h2: {fontSize: Device.fS(24), fontFamily: Device.fontSlabBold, color: Colors.cloHeadline, marginTop: 20, marginBottom: 20},
}