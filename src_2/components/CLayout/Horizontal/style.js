// /**
//  ** Name: 
//  ** Author: 
//  ** CreateAt: 
//  ** Description: 
// **/
// /* COMMON */
// import { Devices } from '~/config';
// import { commonStyles, commonFonts } from '~/utils/styles';
// import { Colors } from '~/utils/colors';
// import { layoutWidth } from '~/utils/layout_width';

// export default styles = {
//   con_separator: { height: 1, width: "100%", backgroundColor: Colors.BORDER_COLOR, marginVertical: 10 },

//   con_list_store: [commonStyles.container],
//   con_store: [commonStyles.row_align_center, { borderRadius: 5 }],
//   con_title_store: [commonStyles.row_justify_between, commonStyles.row_align_start],
//   con_address_store: [commonStyles.column_align_start, { marginTop: 3 }],
//   con_info_store: [commonStyles.column_align_start, { flex: 1, paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0 }],
//   con_review_store: [commonStyles.row_align_center, { marginTop: 5 }],
//   con_body_store: [commonStyles.column_justify_between, { paddingTop: 0, paddingBottom: 0 }],
//   con_cart_service_selected: [commonStyles.row],
//   con_news_info: [commonStyles.column_align_start],
//   con_news_time: [commonStyles.row_align_start],
//   con_content_price: [commonStyles.row_align_center, {}],
//   con_star_item: { paddingRight: 2 },
//   con_star: {},
//   con_content_price_2: [commonStyles.row_align_center, commonStyles.row_justify_end],
//   con_content_image: { flex: 1 },
//   con_bookmark: { position: 'absolute', top: 10, right: 10 },
//   con_btn_delete_bm: [commonStyles.column_align_center, { height: 30, width: 30 }],
//   con_amount_item: [commonStyles.row_align_center, commonStyles.row_justify_end],
//   con_amount_right: [{ borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: Colors.PRIMARY_COLOR }],
//   con_input_amount: [commonStyles.center, { paddingVertical: 5, borderWidth: 1, borderColor: Colors.PRIMARY_COLOR, borderRadius: 5, marginHorizontal: 10, width: Devices.sW('10%') }],
//   con_amount: [commonStyles.column_justify_end],
//   con_button_add: [commonStyles.row_align_end, commonStyles.row_justify_between, { width: '100%', paddingVertical: 10 }],
//   con_btn_add: [{ borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 }],
//   con_content_short_des: { marginBottom: 10 },
//   con_variations: [commonStyles.row_align_center, commonStyles.row_justify_start, { marginTop: 10 }],
//   con_picker_variations: { borderWidth: .5, borderColor: Colors.PLACEHOLDER_COLOR, flex: 1, borderRadius: 5, height: Devices.sW('8%'), justifyContent: "center" },

//   txt_btn: [commonStyles.txt_title_button, { color: Colors.WHITE_COLOR }],
//   txt_amount_item: [commonFonts.xx_small, { paddingVertical: 2 }],
//   txt_amount_title: [commonStyles.txt_title_item],
//   txt_title_new: [commonStyles.txt_title_item, { flex: 1 }],
//   txt_news_description: [commonStyles.txt_body_meta_item, { marginTop: 3 }],
//   txt_news_time: [commonStyles.txt_body_meta_item, { marginTop: 3, }],
//   txt_title_category: [commonStyles.txt_title_item, { flex: 1 }],
//   txt_title_service: [commonStyles.txt_title_item, { flex: 1 }],
//   txt_content_price_sale: [commonStyles.txt_base_price, { color: Colors.SALE_COLOR }],
//   txt_price_item: [commonStyles.txt_base_price],
//   txt_unit_item: [commonStyles.txt_base_price],
//   txt_rating_count: [commonStyles.txt_body_meta_item],
//   txt_author: [commonStyles.txt_body_meta_item, { marginTop: 3 }],
//   txt_regular_price: { color: Colors.PLACEHOLDER_COLOR, textDecorationLine: 'line-through' },
//   txt_out_of_stock: [commonStyles.txt_base_item, { color: Colors.RED_COLOR }],
//   txt_on_back_order: [commonStyles.txt_base_item, { color: Colors.YELLOW_COLOR }],

//   img_store: { height: Devices.sW('35%'), width: Devices.sW('45%'), borderRadius: 5 },

//   /** PICKER */
//   con_group_picker: [commonStyles.row_align_center],
//   con_picker: [commonStyles.column_justify_center, { borderWidth: .5, flex: 1, borderRadius: 5, height: 40 }],

//   txt_title_picker: [commonStyles.txt_title_item, { paddingRight: 10 }],
// }