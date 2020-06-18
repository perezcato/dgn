import { Device } from '../../config';
import { Colors } from '~/utils/colors';
export default {
  container: { flex: 1 },
  linear_gardiant: { flex: 1, borderRadius: 7 },
  container_icon: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', padding: 7, marginTop: -14, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 },

  img: { width: '100%', height: '100%', borderRadius: 7 },

  txt_title: { color: 'white', fontSize: Device.fS(15), fontFamily: Device.fontSlabBold, paddingTop: 10 },
  txt_description: { color: 'white', fontSize: Device.fS(12), fontFamily: Device.fontSlabLight, paddingBottom: 10 },
  txt_time: { color: 'white', fontSize: Device.fS(10), fontFamily: Device.fontSlabLight, width: Device.w_scale('44%') },
  txt_icon: { color: 'white', fontSize: Device.fS(11), fontFamily: Device.fontSlabRegular, marginLeft: 10 }
}
