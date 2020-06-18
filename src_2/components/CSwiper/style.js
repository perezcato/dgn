import { Device } from '../../config';

export default {
  container_swiper: { flex: 1, height: Device.width * 9 / 14, width: Device.width },
  dotActive: {
    height: 6,
    width: 6,
    borderRadius: Device.getBorderRadius(6),
    backgroundColor: 'white',
    marginHorizontal: 5
  },
  dotUnactive: {
    height: 6,
    width: 6,
    borderRadius: Device.getBorderRadius(6),
    backgroundColor: 'grey',
    marginHorizontal: 5
  },

  /** SWIPER ITEM */
  i_con: { height: '100%', width: Device.width, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' },
  i_con_main: {
    height: Device.w_scale('50%'), width: Device.w_scale('100%'), backgroundColor: 'white', elevation: 7,
    shadowOffset: { width: 2, height: 2 }, shadowColor: 'black', shadowOpacity: .3
  },

  i_txt_title: { color: 'black', fontFamily: Device.fontRegular, fontSize: Device.fS(16), width: Device.w_scale('80%') - 50 },
  i_txt_time: { color: 'black', fontFamily: Device.fontRegular, fontSize: Device.fS(10), marginTop: 10, width: Device.w_scale('80%') - 50 },

  txt_no_item: { fontFamily: Device.fontRegular, fontSize: Device.fS(13), color: 'white', marginTop: 10 }
}