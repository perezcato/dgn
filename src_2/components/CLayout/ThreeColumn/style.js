/**
 * @Description: style Two Column layout 
 * @Created by ZiniTeam
 * @Date create: 14/11/2018
 */
import { Device } from '~/config';

export default {
  container: { flex: 1, paddingTop: 15 },

  item_wrapper: { width: '31%', height: Device.w_scale('20%'), marginBottom: 10, marginRight: 10 },

  title_wrapper: { flexDirection: 'row', marginLeft: 15 },
  title: { marginLeft: 10, fontSize: Device.fS(17), fontFamily: Device.fontBold, color: 'black' },

}
