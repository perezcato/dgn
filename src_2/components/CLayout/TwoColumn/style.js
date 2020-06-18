/**
 * @Description: style Two Column layout 
 * @Created by ZiniTeam
 * @Date create: 14/11/2018
 */
import { Device, Config } from '~/config';

export default {
  container: { flex: 1, flexDirection: 'row', alignItems: 'flex-start', paddingTop: 5 },

  columnLeft: { flex: 1, paddingLeft: 15, paddingRight: 7 },
  columnRight: { flex: 1, paddingLeft: 7, paddingRight: 15 },

  item_wrapper: { width: '49%', height: Device.w_scale('53%'), marginVertical: Config.layout_offset.vertical, justifyContent: "flex-start" },

  title_wrapper: { flexDirection: 'row', marginLeft: 15 },
  title: { marginLeft: 10, fontSize: Device.fS(17), fontFamily: Device.fontBold, color: 'black' },

}
