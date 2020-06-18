/** COMMON */
import { Device } from '~/config';
import { Colors } from '~/utils/colors';

export default {
  con_bg: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.5)' },
  con_modal: { width: Device.w_scale('70%'), backgroundColor: 'rgba(255,255,255,.95)', borderRadius: 10 },
  con_content: { alignItems: 'center', justifyContent: 'center', padding: 10 },
  con_img: {
    height: Device.w_scale('25%'), width: Device.w_scale('25%'), elevation: 5, shadowColor: Colors.borderColor,
    shadowOffset: { height: 2, width: 2 }, shadowOpacity: .3, shadowRadius: 3
  },
  con_btn: {
    height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderTopColor: Colors.borderColor, borderTopWidth: 0.3
  },
  con_btn_left: {
    flex: .49, alignItems: 'center', justifyContent: 'center', padding: 5, borderLeftColor: Colors.borderColor,
    borderLeftWidth: 0.3
  },
  con_btn_right: {
    flex: .49, alignItems: 'center', justifyContent: 'center', padding: 5, borderRightColor: Colors.borderColor,
    borderRightWidth: 0.3
  },

  img: { height: '100%', width: '100%' },

  txt_name_app: { color: 'black', fontFamily: Device.fontBold, fontSize: Device.fS(17), marginTop: 10 },
  txt_des: { color: 'black', fontFamily: Device.fontRegular, fontSize: Device.fS(15), marginVertical: 5 },
  txt_btn_left: { color: Colors.primaryApp, fontFamily: Device.fontRegular, fontSize: Device.fS(15) },
  txt_btn_right: { color: Colors.primaryApp, fontFamily: Device.fontBold, fontSize: Device.fS(15) },
}