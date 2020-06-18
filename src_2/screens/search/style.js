/**
 * @Description: Style header of all Screens
 * @Created by ZiniTeam
 * @Date create: 20/12/2018
 */
import { Device, isIphoneX } from '../../config';
import { Colors } from '~/utils/colors';


export default searchStyles = {

    container: { flex: 1, backgroundColor: Colors.cloBackgroundOfApp },

    //HEADER
    s_header_container: { height: Device.h_scale('10%'), backgroundColor: Colors.cloHeader, paddingTop: isIphoneX() ? 30 : 18 },
    s_header_content: { flexDirection: 'row', paddingVertical: 4, height: Device.headerHeight, justifyContent: 'center', alignItems: 'center' },
    s_header_inpuBlock: { position: 'relative', flex: 1, flexDirection: 'row', alignItems: 'center' },
    s_header_input: { backgroundColor: 'white', width: '100%', height: 40, borderRadius: 7, color: Colors.cloText, fontSize: Device.fS(13), fontFamily: Device.fontSlabRegular },
    s_header_icSearch: { position: 'absolute', left: 10, width: 16, height: '100%', alignItems: 'center', justifyContent: 'center' },
    s_header_btnClear: { position: 'absolute', right: 10, width: 16, height: '100%', alignItems: 'center', justifyContent: 'center' },
    s_header_cancelButton: { marginRight: 15, height: '100%', justifyContent: 'center', alignItems: 'center' },
    s_header_txtCancel: { color: 'black', fontSize: Device.fS(13), fontFamily: Device.fontSlabRegular },

    //NO RESULT
    s_noResult: { alignItems: 'center', justifyContent: 'center', width: Device.w_scale('56%'), marginTop: Device.w_scale('24%') },
    s_noResult_text: { marginTop: Device.w_scale('4%'), alignItems: 'center' },
    s_noResult_text_nsrs: { color: Colors.cloText, fontSize: Device.fS(20), fontFamily: Device.fontSlabRegular },
    s_noResult_text_nof: { color: 'rgba(0,0,0, 0.7)', fontSize: Device.fS(13), fontFamily: Device.fontSlabRegular, textAlign: 'center', marginTop: Device.w_scale('4%') },
}
