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
  con_bg_loading: [commonStyles.full_center, { backgroundColor: 'rgba(0,0,0,.8)', position: 'absolute', top: 0, left: 0, width: Device.width, height: Device.height }],


  /** ITEM */
  con_item: {
    width: Device.sW("44%"),
    marginBottom: 10
  },
  con_item_content: [commonStyles.row_align_center, commonStyles.row_justify_center, { paddingHorizontal: 10, flex: 1, paddingVertical: 5 }],

  txt_title: [commonFonts.x_small, { paddingLeft: 10 }],

  img_item: { height: Device.sW("44%"), width: "100%", borderRadius: 5, backgroundColor: Colors.BORDER_COLOR, borderColor: Colors.BORDER_COLOR, borderWidth: 1 }
}