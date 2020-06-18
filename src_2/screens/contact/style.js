/**
 * @Description: Style Contact screen
 * @Created by ZiniTeam
 * @Date create: 06/11/2018
 */
import { Device } from "../../config";

export default contactStyle = {
    container: { flex: 1, backgroundColor: 'white' },
    content: {},
    logo_box: { width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 30 },
    logo: { width: Device.w_scale('53.33%'), height: Device.w_scale('28.93%') },
    info: { borderBottomWidth: 10, borderBottomColor: '#f2f2f2' },
    info_item: { paddingHorizontal: 10, paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#ebebeb', flexDirection: 'row' },
    iconItem: { marginRight: 10 },
    text_info: { fontFamily: Device.fontSlabBold },
}