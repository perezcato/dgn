/**
 * @Description: Style Contact form screen
 * @Created by ZiniTeam
 */
import { Device } from "../../config";
import { Colors } from "~/utils/colors";


export default contactFormStyle = {
    container: { flex: 1, backgroundColor: 'white' },
    header_container: { height: Device.h_scale('7%') + 40, backgroundColor: Colors.cloHeader, paddingTop: Device.w_scale('1.5%'), },
    header_statusBar: { height: 40 },
    header_content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5},
    title_page: { color: 'black', fontSize: Device.fS(16), fontFamily: Device.fontSlabBold },
    btn_send: { color: 'black', fontFamily: Device.fontSlabBold },
    content: { marginBottom: 10 },
    item_row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ebebeb', paddingVertical: 5, position: 'relative' },
    txt_label: { color: '#cccccc', position: 'absolute', top: 2, left: 10, zIndex: 1000 },
    input_form: { paddingHorizontal: 10, margin: 0, width: '100%', paddingVertical: 10 },
    
}