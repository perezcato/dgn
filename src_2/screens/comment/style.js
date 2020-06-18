/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */

import { commonStyles, commonFonts } from "~/utils/styles";
import { Device } from "~/config";

export default styles = {
  content: [commonStyles.container],
  // COMMENT ITEM
  con_comment_item: [commonStyles.row_justify_between, commonStyles.row_align_start, {
    paddingVertical: 5
  }],
  con_comment_item_child: [commonStyles.row_justify_between, commonStyles.row_align_start, {
    paddingVertical: 5, paddingLeft: 35
  }],
  con_comment_avt: { height: 25, width: 25, marginTop: 5, marginRight: 10, borderRadius: 2 },
  con_comment_content: [commonStyles.column_justify_between, commonStyles.column_align_start, {
    flex: 1
  }],
  con_comment_header: [commonStyles.row_justify_start, commonStyles.row_align_center],
  con_comment_body: [{ paddingVertical: 5 }],
  con_comment_footer: [commonStyles.row_align_center, commonStyles.row_justify_start, {

  }],

  txt_author: [commonFonts.x_small, { fontFamily: Device.fontSlabBold }],
  txt_time: [commonFonts.xxx_small, { paddingLeft: 10 }],
  txt_reply: [commonFonts.xxx_small,],
  txt_input: [commonFonts.xx_small, { fontFamily: Device.fontSlabRegular }]
}