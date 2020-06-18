/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* COMMON */
import { commonStyles, commonFonts } from '~/utils/styles';
import { Colors } from '~/utils/colors';
import { Device } from '~/config';

export default styles = {
  con: commonStyles.container,
  con_content: [commonStyles.container, commonStyles.row_justify_center],

  /** HEADER */
  con_header: { backgroundColor: Colors.WHITE_COLOR },
  con_header_center: [commonStyles.column_align_center],
  con_title: commonStyles.full_center,

  /** INPUT */
  con_form: { marginLeft: 0 },
  con_input: [commonStyles.row_align_center, commonStyles.row_justify_start, { height: Device.sW("13%"), }],
  // con_label: { marginLeft: Device.OS === 'android' ? -12 : -15 },
  con_btn: { marginTop: 20, backgroundColor: Colors.cloBMActive, borderRadius: 5 },

  txt_label: commonFonts.xx_small,
  txt_input: [commonFonts.xx_small, { fontFamily: Device.fontSlabBold, }],
  txt_fetch_success: [commonFonts.xx_small, { fontFamily: Device.fontSlabRegular, color: Colors.GREEN_COLOR, marginLeft: 10 }],
  txt_fetch_failed: [commonFonts.xx_small, { fontFamily: Device.fontSlabBold, color: Colors.RED_COLOR, marginLeft: 10 }],
  txt_error: [commonFonts.xx_small, { color: Colors.RED_COLOR }],
  txt_btn: commonStyles.txt_title_button,

  spi_loading: { marginRight: 10 }
}