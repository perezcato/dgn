/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
**/
/* COMMON */
import { Device, Config } from '~/config';
import { commonStyles, commonFonts } from '~/utils/styles';
import { Colors } from '~/utils/colors';

export default styles = {
  con_no_data: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  txt_no_data: { color: 'black', fontSize: Device.fS(14), fontFamily: Device.fontSlabRegular },
  /** ITEM */
  con_list_item: { paddingVertical: 5 },
  con_row_item: [commonStyles.row_align_center, {
    flex: 1, height: Device.sW("20%"), marginVertical: Config.layout_offset.vertical, backgroundColor: Colors.BACKGROUND_ITEM_COLOR, borderRadius: 10, paddingHorizontal: 15
  }],
  con_item_header: { flex: 1, height: Device.sW("20%"), marginVertical: 5, },
  con_row_item_left: [commonStyles.row_align_center, commonStyles.row_justify_start, { flex: .7 }],
  con_row_item_right: [commonStyles.row_align_center, commonStyles.row_justify_end, { flex: .3 }],
  con_count_product: [commonStyles.center, { height: 25, width: 25, borderRadius: Device.bR(25), backgroundColor: Colors.BORDER_LARGE_COLOR, marginRight: 10 }],

  img_item_header: { width: "100%", height: "100%", borderRadius: 10, },
  img_item: {
    width: Device.sW("7%"),
    height: Device.sW("7%"),
    borderRadius: Device.bR(Device.sW("1%")),
    borderWidth: 1,
    borderColor: Colors.BACKGROUND_ITEM_COLOR
  },

  txt_title_item: [commonFonts.x_small, { flex: 1, paddingLeft: 10 }],
  txt_count_product: [commonFonts.xxx_small, { color: Colors.PLACEHOLDER_COLOR }]
}
