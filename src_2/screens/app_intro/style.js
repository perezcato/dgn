/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* COMMON */
import { commonStyles, commonFonts } from '~/utils/styles';
import { Device } from '~/config';
import { Colors } from '~/utils/colors';

export default styles = {
  con: commonStyles.container,
  // con_content: [commonStyles.container, commonStyles.row_justify_center],

  /** */
  con_item: { flex: 1, },
  con_content: [commonStyles.column_justify_between, { position: "absolute", width: Device.width, height: Device.height }],
  con_group_txt: [commonStyles.column_justify_center, commonStyles.column_align_center,
  { position: "absolute", width: Device.width, bottom: Device.sW('40%'), }
  ],
  con_group_btn: { paddingBottom: 10, position: "absolute", bottom: Device.sW('10%'), width: Device.width },
  con_skip: { position: "absolute", top: 40 },
  con_slider_layer: { position: 'absolute', width: '100%', height: '100%', backgroundColor: Colors.BLACK_COLOR, opacity: .29 },
  con_dot_active: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.cloBMActive,
    marginHorizontal: 5,
    alignSelf: "center"
  },
  con_dot_unactive: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: Colors.BORDER_COLOR,
    marginHorizontal: 5,
    alignSelf: "center"
  },
  con_dot: [commonStyles.center, { position: "absolute", left: 0, right: 0, bottom: 20 }],

  txt_title_item: [commonFonts.xx_large, { color: Colors.WHITE_COLOR, fontFamily: Device.fontSlabRegular, textAlign: "center", paddingVertical: 20 }],
  txt_content_item: [ commonFonts.x_small, { fontFamily: Device.fontSlabRegular, color: Colors.WHITE_COLOR, textAlign: "center" }],
  txt_skip: [commonFonts.x_small, { fontFamily: Device.fontSlabRegular, color: Colors.WHITE_COLOR, textAlign: "center", paddingVertical: 5 }],

  img_intro: { width: "100%", height: "100%" },
  /** BUTTON */
  con_btn: { backgroundColor: Colors.cloBMActive, borderRadius: 5, marginVertical: 5, width: "100%" },
  con_btn_back: { backgroundColor: Colors.WHITE_COLOR, borderRadius: 5, borderWidth: 1, borderColor: Colors.cloBMActive, marginVertical: 5 },

  txt_btn_back: [commonStyles.txt_title_button, { color: Colors.cloBMActive }],
  txt_btn: [commonStyles.txt_title_button,],
}