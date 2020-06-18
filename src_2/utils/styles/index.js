/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/** COMMON */
import { Colors } from '../colors';
import { Device } from '~/config';

export const commonStyles = {
  container: { flex: 1, backgroundColor: Colors.cloBackgroundOfApp },
  full_center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  center: { alignItems: 'center', justifyContent: 'center' },
  flex_grow: { flexGrow: 1 },
  flex_wrap: { flexWrap: 'wrap' },

  row: { flexDirection: 'row' },
  row_align_center: { flexDirection: 'row', alignItems: 'center' },
  row_align_start: { flexDirection: 'row', alignItems: 'flex-start' },
  row_align_end: { flexDirection: 'row', alignItems: 'flex-end' },
  row_justify_center: { flexDirection: 'row', justifyContent: 'center' },
  row_justify_start: { flexDirection: 'row', justifyContent: 'flex-start' },
  row_justify_end: { flexDirection: 'row', justifyContent: 'flex-end' },
  row_justify_between: { flexDirection: 'row', justifyContent: 'space-between' },
  row_justify_around: { flexDirection: 'row', justifyContent: 'space-around' },

  column: { flexDirection: 'column' },
  column_align_center: { flexDirection: 'column', alignItems: 'center' },
  column_align_start: { flexDirection: 'column', alignItems: 'flex-start' },
  column_align_end: { flexDirection: 'column', alignItems: 'flex-end' },
  column_justify_center: { flexDirection: 'column', justifyContent: 'center' },
  column_justify_start: { flexDirection: 'column', justifyContent: 'flex-start' },
  column_justify_end: { flexDirection: 'column', justifyContent: 'flex-end' },
  column_justify_between: { flexDirection: 'column', justifyContent: 'space-between' },
  column_justify_around: { flexDirection: 'column', justifyContent: 'space-around' },

  shadow: {
    shadowColor: "rgba(0,0,0,.3)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: .3,
    shadowRadius: 4,
    elevation: 4
  },

  con_header: { backgroundColor: Colors.cloHeader },

  // txt_no_data: { fontSize: Device.fS(16), fontFamily: Device.zsHeadlineMedium, color: Colors.PLACEHOLDER_COLOR, },
  // txt_title_group_drawer: { fontSize: Device.fS(22), fontFamily: Device.zsHeadlineSemiBold, color: Colors.TEXT_COLOR, },
  // txt_title_header: { fontSize: Device.fS(16), fontFamily: Device.zsHeadlineSemiBold, color: Colors.WHITE_COLOR, },
  txt_title_button: { fontSize: Device.fS(16), fontFamily: Device.fontSlabBold, color: Colors.cloHeadline, },

  // txt_title_item: { fontSize: Device.fS(14), fontFamily: Device.zsHeadlineMedium, color: Colors.TEXT_COLOR, },
  // txt_base_item: { fontSize: Device.fS(12), fontFamily: Device.zsHeadlineRegular, color: Colors.PLACEHOLDER_COLOR, },
  // txt_body_meta_item: { fontSize: Device.fS(14), fontFamily: Device.zsHeadlineRegular, color: Colors.PLACEHOLDER_COLOR, },

  // txt_title_group: { fontSize: Device.fS(16), fontFamily: Device.zsHeadlineSemiBold, color: Colors.TEXT_COLOR, },

  // txt_badge: { fontSize: Device.fS(10), fontFamily: Device.zsHeadlineSemiBold, color: Colors.WHITE_COLOR, padding: 0, },

  // txt_validate_error: { fontSize: Device.fS(12), fontFamily: Device.zsHeadlineRegular, color: Colors.RED_COLOR, marginTop: 2, }
}

export const commonFonts = {
  super_x_small: { fontSize: Device.fS(8), fontFamily: Device.fontRegular, color: Colors.cloText, },
  super_small: { fontSize: Device.fS(10), fontFamily: Device.fontRegular, color: Colors.cloText, },
  xxx_small: { fontSize: Device.fS(12), fontFamily: Device.fontRegular, color: Colors.cloText, },
  xx_small: { fontSize: Device.fS(14), fontFamily: Device.fontRegular, color: Colors.cloText, },
  x_small: { fontSize: Device.fS(16), fontFamily: Device.fontRegular, color: Colors.cloText, },
  small: { fontSize: Device.fS(18), fontFamily: Device.fontRegular, color: Colors.cloText, },
  medium: { fontSize: Device.fS(20), fontFamily: Device.fontRegular, color: Colors.cloText, },
  large: { fontSize: Device.fS(22), fontFamily: Device.fontRegular, color: Colors.cloText, },
  x_large: { fontSize: Device.fS(24), fontFamily: Device.fontRegular, color: Colors.cloText, },
  xx_large: { fontSize: Device.fS(26), fontFamily: Device.fontRegular, color: Colors.cloText, },
  xxx_large: { fontSize: Device.fS(28), fontFamily: Device.fontRegular, color: Colors.cloText, },
  super_large: { fontSize: Device.fS(30), fontFamily: Device.fontRegular, color: Colors.cloText, },
  super_x_large: { fontSize: Device.fS(32), fontFamily: Device.fontRegular, color: Colors.cloText, },
}