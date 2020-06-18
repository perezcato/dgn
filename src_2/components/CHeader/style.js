/**
 * @Description: Style header of all Screens
 * @Created by ZiniTeam
 * @Date create: 12/11/2018
 */
import { Device, isIphoneX } from '~/config';
import { Colors } from '~/utils/colors'


export default headerStyle = {
  container: { height: isIphoneX() ? Device.h_scale('10%') : Device.h_scale('7%'), backgroundColor: Colors.cloHeader, paddingTop: isIphoneX() ? 20 : 0 },
  container_header: { height: isIphoneX() ? Device.h_scale('10%') : Device.h_scale('7%'), flexDirection: 'row', justifyContent: 'center' },
  container_left_header: { width: Device.h_scale('7%'), height: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, zIndex: 10 },
  container_right_header: { flexDirection: 'row', width: Device.h_scale('50%'), height: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, zIndex: 10 },
  container_center_header: { height: '100%', width: '70%', alignItems: 'center', justifyContent: 'center' },
  container_iconright_header: { width: Device.h_scale('7%'), height: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, zIndex: 10 },

  txt_title: {
    color: 'white',
    fontSize: Device.fS(14),
    fontFamily: Device.fontSlabBold,
  }
}
