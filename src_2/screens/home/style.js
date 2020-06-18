/**
 * @Description: Style News screen
 * @Created by ZiniTeam
 * @Date create: 06/11/2018
 */
import { Platform } from 'react-native';
import { Device, Color } from "../../config";

export default newsStyle = {
  container: { flex: 1, backgroundColor: '#f2f2f2' },

  img_side_swipe_item: { height: '100%', width: '100%' },
  txt_side_swipe_item_title: { width: Device.width, color: 'white', fontSize: Device.fS(19), fontFamily: Device.fontSlabBold },
  txt_side_swipe_item_time: { width: Device.width, color: 'white', fontSize: Device.fS(9), fontFamily: Device.fontSlabRegular, marginBottom: Device.w_scale('1%') },
  n_pagagination: { position: 'absolute', bottom: Device.w_scale('3.2%') },

  content: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}