/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* COMMON */
import { Device } from '~/config';
import { commonFonts, commonStyles } from '~/utils/styles';
import { Colors } from '~/utils/colors';

export default styles = {
  con: { flex: 1, backgroundColor: 'white', marginTop: 5 },
  con_content_list: { flexGrow: 1 },
  con_item: { height: Device.w_scale('30%'), width: '100%', marginBottom: 10 },
  con_content_item: { height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center', borderRadius: 5 },
  con_no_data: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  txt_name_item: { color: 'white', fontSize: Device.fS(20), fontFamily: Device.fontRegular },
  txt_no_data: { color: 'black', fontSize: Device.fS(14), fontFamily: Device.fontSlabRegular },

  container: { flex: 1, flexDirection: 'column', backgroundColor: '#ffffff' },

  /** ITEM */
  con_list_item: { paddingVertical: 5 },
  con_row_item: [commonStyles.row_align_center, {
    flex: 1, height: Device.sW("20%"), marginVertical: 10, backgroundColor: Colors.BACKGROUND_ITEM_COLOR, borderRadius: 10, paddingHorizontal: 15
  }],
  con_item_header: { flex: 1, height: Device.sW("20%"), marginVertical: 5, },
  con_row_item_left: [commonStyles.row_align_center, commonStyles.row_justify_start, { flex: .7 }],
  con_row_item_right: [commonStyles.row_align_center, commonStyles.row_justify_end, { flex: .3 }],
  con_count_product: [commonStyles.center, { height: 25, width: 25, borderRadius: Device.bR(25), backgroundColor: Colors.BORDER_LARGE_COLOR, marginRight: 10 }],

  img_item_header: { width: "100%", height: "100%", borderRadius: 10, },
  img_item: {
    width: Device.sW("15%"), height: Device.sW("15%"), borderRadius: Device.bR(Device.sW("15%")), borderWidth: 1,
    borderColor: Colors.BACKGROUND_ITEM_COLOR
  },

  txt_title_item: [commonFonts.x_small, { flex: 1, paddingLeft: 10 }],
  txt_count_product: [commonFonts.xxx_small, { color: Colors.PLACEHOLDER_COLOR }],

  /**TABS */
  con_tab: { width: Device.width },
  con_tabbar: { paddingVertical: 5 },
  con_tabbar_item: [commonStyles.center, { padding: 10, marginRight: 10 }],
  con_tabbar_last_item: { marginRight: 0 },
  con_tabbar_active_item: { borderBottomColor: Colors.cloBMActive, borderBottomWidth: 4 },
  con_separator: { height: 1, backgroundColor: Colors.BORDER_COLOR },

  txt_tabbar: [commonFonts.x_small, { color: Colors.cloBodyMeta }],
  txt_header_tab: [commonFonts.x_small, { paddingHorizontal: 10 }],
}