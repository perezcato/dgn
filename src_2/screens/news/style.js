/**
 * @Description: Style News screen
 * @Created by ZiniTeam
 * @Date create: 06/11/2018
 */
import { Device, Config } from "~/config";
import { Colors } from "~/utils/colors";

export default homeStyle = {
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  con_loading: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: Device.height, width: Device.width, backgroundColor: 'rgba(0,0,0,.5)' },
  con_tow_col: { flex: 1, marginTop: 10, paddingTop: 10, backgroundColor: Colors.cloBackgroundOfApp },
  con_tow_col_2: { flex: 1, paddingTop: 10, backgroundColor: 'white' },
  con_item_card: { width: '100%', height: (Device.width * 9 / 16 + 47), marginTop: Config.layout_offset.left },
  con_three_col: { flex: 1, marginTop: 10, paddingTop: 10, backgroundColor: Colors.cloBackgroundOfApp },
  con_left_right: { width: '100%', height: Device.w_scale('27.5%'), marginVertical: Config.layout_offset.left, paddingHorizontal: Config.layout_offset.left },
  con_video: { flex: 1, backgroundColor: 'white' },
  con_card_left_right: { flex: 1, marginTop: 10, paddingVertical: 10, backgroundColor: Colors.cloBackgroundOfApp },
  con_card_left_right_item: { width: '100%', marginLeft: Config.layout_offset.left, borderWidth: 0, borderLeftColor: 'black', borderLeftWidth: 3 },
  tabBar: { height: Device.w_scale('10%'), justifyContent: 'center', flexDirection: 'row' },
  tabItem: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  txtTabName: { color: 'black', fontSize: Device.fS(15), fontFamily: Device.fontSlabRegular },
  txt_title: { marginLeft: 10, fontSize: Device.fS(15), fontFamily: Device.fontSlabBold, color: 'black' },
  img_side_swipe_item: { height: '100%', width: '100%' },
  txt_side_swipe_item_title: { width: Device.width, color: 'white', fontSize: Device.fS(19), fontFamily: Device.fontSlabBold },
  txt_side_swipe_item_time: { width: Device.width, color: 'white', fontSize: Device.fS(9), fontFamily: Device.fontSlabRegular, marginBottom: Device.w_scale('1%') },
  n_pagagination: { position: 'absolute', bottom: Device.w_scale('3.2%') },
  custom_content: { marginTop: 10, marginBottom: 10, paddingHorizontal: 10 },
}