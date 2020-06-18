import { Device } from "../../config";
import { Colors } from "~/utils/colors";
export default {
    container: { flex: 1, backgroundColor: Colors.cloBackgroundOfApp },
    glr_content: { padding: Device.w_scale('2.66%')},
    glr_content_list: { paddingBottom: Device.w_scale('20%')},
    glr_item: { width: Device.w_scale('45.74%'), marginRight: Device.w_scale('2.933%'), marginBottom: Device.w_scale('3.2%')},
    glr_image: { width: '100%', height: Device.w_scale('29.33%'), borderRadius: Device.w_scale('1.4%') },
    glr_title: { color: '#1b3751', fontSize: Device.fS(13), fontFamily: Device.fontSlabBold, marginTop: Device.w_scale('2.4%') },
    glr_time: { color: Colors.cloTimePost, fontSize: Device.fS(10), fontFamily: Device.fontSlabRegular, marginTop: Device.w_scale('1%') },
    glr_count_img: { position: 'absolute', bottom: Device.w_scale('1.33%'), left: Device.w_scale('1.6%'), zIndex: 1000, flexDirection: 'row' },
    glr_totalImage: { color: 'white', marginLeft: Device.w_scale('1%') },

    
}