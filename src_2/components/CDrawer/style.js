/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */

/**
 * @Description: Style Side Menu
 * @Created by ZiniTeam
 * @Date create: 07/11/2018
 */
import { Device, isIphoneX } from '../../config';
import { Colors } from '~/utils/colors';

export default styles = {
  container: { flex: 1, backgroundColor: Colors.cloBackgroundOfApp },
  contentTop: { flexDirection: 'row', height: Device.h_scale('10%'), backgroundColor: Colors.cloHeader, paddingTop: isIphoneX() ? 30 : 15 },
  container_sectionHeadingStyle: { justifyContent: 'center', height: Device.h_scale('7.19%'), backgroundColor: '#F2F2F2', borderBottomWidth: 0.5, borderBottomColor: '#979797' },
  container_navItemStyle: { flexDirection: 'row', alignItems: 'center', height: Device.h_scale('7.19%'), borderBottomWidth: 0.5, borderBottomColor: '#979797' },
  container_iconnav: { paddingHorizontal: 10 },
  container_footer: { flexDirection: 'row', padding: 20, justifyContent: 'flex-start' },

  sectionHeadingStyle: { color: 'black', fontSize: Device.fS(17), fontFamily: Device.fontBold, marginLeft: 10 },
  navItemStyle: { color: 'black', fontSize: Device.fS(15), fontFamily: Device.fontSlabBold },
  navItemFooter: { color: 'black', fontSize: Device.fS(13), fontFamily: Device.fontSlabLight },

  img_icon: { height: Device.w_scale('9.6%'), width: Device.w_scale('9.6%') }
}