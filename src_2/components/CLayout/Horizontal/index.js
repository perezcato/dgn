// /**
//  ** Name: 
//  ** Author: 
//  ** CreateAt: 
//  ** Description: 
// **/
// /* LIBRARY */
// import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { Body, CardItem, Picker } from 'native-base';
// import { Html5Entities } from 'html-entities';
// import Icon from 'react-native-fontawesome-pro';
// import HTML from 'react-native-render-html';
// /** COMPONENTS */
// import CText from '~/components/CText';
// import CImage from '~/components/CImage';
// import { CRateStar } from '~/components/CRateStar';
// /* COMMON */
// import { Configs, Assets, Devices, Keys } from '~/config';
// import { commonStyles } from '~/utils/styles';
// import { Colors } from '~/utils/colors';
// import Currency from '~/utils/currency';
// import Helpers from '~/utils/helpers';
// /* STYLES */
// import styles from './style';

// const htmlEntities = new Html5Entities();
// const regex = /(<([^>]+)>)/ig;
// const regex2 = /\n/g;

// const RenderEmptyList = () => {
//   return (
//     <View style={commonStyles.full_center}>
//       <CText style={commonStyles.txt_no_data} i18nKey={'no_data'} />
//     </View>
//   )
// }

// const renderSeparator = () => <View style={styles.con_separator} />

// export class RenderItem extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       _refresh: false,
//       _dataOptions: props.data.variations || [],
//       _selected: (props.data.variations && props.data.variations.length > 0) ? props.data.variations[0] : null,
//       _idxDataInCart: -1
//     }
//   }

//   /** FUNCTIONS */
//   _onPressOption = (value) => {
//     if (value.id !== this.state._selected.id) {
//       this.setState({ _selected: value });
//     }
//   }

//   _onPressMinusAmount = (idxInCart) => {
//     if (this.props.cart.carts[idxInCart].numberOfService > 1) {
//       let { cart } = this.props;
//       cart.carts[idxInCart].numberOfService -= 1;
//       this.props.cart.cartActions.updateCart(cart.carts);
//       Helpers.setDataStorage(Keys.AS_DATA_CART, JSON.stringify(cart.carts));
//       this.setState({ _refresh: !this.state._refresh });
//     } else {
//       this.setState({ _idxDataInCart: -1, _refresh: !this.state._refresh }, () => {
//         let { cart } = this.props;
//         cart.carts.splice(idxInCart, 1);
//         this.props.cart.cartActions.updateCart(cart.carts);
//         Helpers.setDataStorage(Keys.AS_DATA_CART, JSON.stringify(cart.carts));
//         this.props.onRefreshPage();
//       });
//     }
//   }

//   _onPressPlusAmount = (idxInCart) => {
//     let { cart } = this.props;
//     cart.carts[idxInCart].numberOfService += 1;
//     this.props.cart.cartActions.updateCart(cart.carts);
//     Helpers.setDataStorage(Keys.AS_DATA_CART, JSON.stringify(cart.carts));
//     this.setState({ _refresh: !this.state._refresh });
//   }

//   _onPressAddCart = (data, selected) => {
//     this.props.onPressAddCart(data, selected);
//     this.setState({
//       _idxDataInCart: this.props.cart.carts.length - 1,
//       _refresh: !this.state._refresh
//     });
//   }

//   componentDidMount() {
//     let { _selected, _idxDataInCart } = this.state;
//     let { cart } = this.props;
//     _idxDataInCart = cart.carts.findIndex(f => f.id === this.props.data.id);
//     if (_idxDataInCart !== -1) {
//       if (cart.carts[_idxDataInCart].variation && _selected && cart.carts[_idxDataInCart].variation.id !== _selected.id) {
//         _idxDataInCart = -1;
//       }
//     }
//     this.setState({ _idxDataInCart });
//   }

//   /** RENDER */
//   render() {
//     let { _dataOptions, _selected } = this.state;
//     let {
//       data, isNews, isService, isCategory, leftThumb, blogMetaField, onPress, cart
//     } = this.props;
//     let time = '', price = 0, currencyPosition = Configs.currencyPosition, symbol = Helpers.symbolCurrency(),
//       source = Assets.image_failed, title = htmlEntities.decode(data.name), excerpt = "", author = "",
//       categories = "", percentSale = 0, scaleImage = 1, inBookmark = false;

//     if (isService) {
//       if (data.on_sale && data.sale_price !== "") {
//         percentSale = Helpers.parsePercentSale(data.regular_price, data.sale_price);
//         price = Helpers.formatNumber(_selected ? Number(_selected.regular_price) : data.regular_price);
//       } else price = Helpers.formatNumber(_selected ? Number(_selected.price) : data.price);

//       if (data.images && data.images.length > 0) {
//         source = { uri: data.images[0].sizes.woocommerce_thumbnail };
//         scaleImage = data.images[0].sizes["woocommerce_thumbnail-width"] / data.images[0].sizes["woocommerce_thumbnail-height"]
//       }
//     }

//     if (isNews) {
//       title = htmlEntities.decode(data.title.rendered);
//       author = data.author.author_name;
//       excerpt = data.excerpt.rendered.replace(regex, '');
//       excerpt = excerpt.replace(regex2, '');
//       excerpt = htmlEntities.decode(excerpt);
//       time = Configs.parseTimestamp(data.date);
//       source = Assets.image_slider_failed;
//       if (data.featured_media && typeof data.featured_media !== 'number') {
//         source = { uri: data.featured_media.sizes.thumbnail };
//         scaleImage = data.featured_media.sizes["thumbnail-width"] / data.featured_media.sizes["thumbnail-height"];
//       }
//       let tmpCate = [];
//       if (blogMetaField.categories && data.categories && data.categories.length > 0) {
//         for (let std of data.categories) tmpCate.push(std.name);
//       }
//       categories = tmpCate.join();

//       inBookmark = Configs.bookmarks.includes(data.id);
//     }
//     let size = Devices.sImage("horizontal", scaleImage);

//     return (
//       <View>
//         {leftThumb ?
//           <View style={[styles.con_store, isService ? { marginVertical: 10 } : { marginTop: 10 }]}>
//             <TouchableOpacity activeOpacity={.5} onPress={() => onPress(data)}>
//               <CImage
//                 style={[styles.img_store, { width: size.width, height: size.height }]}
//                 source={source}
//                 renderContent={
//                   isNews && inBookmark &&
//                   <View style={styles.con_content_image}>
//                     <View style={styles.con_bookmark}>
//                       <Icon name={'bookmark'} color={Colors.PRIMARY_COLOR} sizes={Devices.fS(20)} type={'solid'} />
//                     </View>
//                   </View>
//                 }
//               />
//             </TouchableOpacity>

//             <CardItem style={[styles.con_info_store, { paddingLeft: 10 }]}>
//               <Body style={styles.con_body_store}>
//                 <View>
//                   <View style={commonStyles.row_align_start}>
//                     <View style={[styles.con_title_store, isNews && inBookmark && { width: Devices.sW('53%') }]}>
//                       {isNews && <CText style={styles.txt_title_new} numberOfLines={2}>{title}</CText>}
//                       {isService && <CText style={styles.txt_title_service} numberOfLines={2}>{title}</CText>}
//                       {isCategory && <CText style={styles.txt_title_category} numberOfLines={2}>{data.name}</CText>}
//                       {isService && !isNews && data.reviews_allowed && <CRateStar containerStyle={{ marginTop: 0 }} averageRating={Number(data.average_rating)} ratingCount={data.rating_count} />}
//                       {isService &&
//                         <View style={styles.con_content_price}>
//                           <CText>{' | '}</CText>
//                           {currencyPosition === Currency.left &&
//                             <CText style={[styles.txt_price_item, percentSale !== 0 && { color: Colors.PLACEHOLDER_COLOR }]}>{symbol}</CText>
//                           }
//                           <CText style={[styles.txt_price_item, percentSale !== 0 && styles.txt_regular_price]}>{price}</CText>
//                           {currencyPosition === Currency.right &&
//                             <CText style={[styles.txt_price_item, percentSale !== 0 && { color: Colors.PLACEHOLDER_COLOR }]}>{symbol}</CText>
//                           }
//                           {percentSale !== 0 &&
//                             <View style={[styles.con_content_price_2, { paddingLeft: 10 }]}>
//                               {currencyPosition === Currency.left &&
//                                 <CText style={styles.txt_content_price_sale}>{symbol}</CText>
//                               }
//                               <CText style={styles.txt_content_price_sale}>{Helpers.formatNumber(data.sale_price)}</CText>
//                               {currencyPosition === Currency.right &&
//                                 <CText style={styles.txt_content_price_sale}>{symbol}</CText>
//                               }
//                             </View>
//                           }
//                         </View>
//                       }
//                     </View>
//                   </View>

//                   {isNews &&
//                     <View style={styles.con_news_info}>
//                       <View style={styles.con_news_time}>
//                         {(blogMetaField.categories && data.categories && data.categories.length > 0) &&
//                           <View style={[styles.con_news_time, { flex: 1 }]}>
//                             <CText style={styles.txt_news_time} i18nKey={"categories"} />
//                             <CText style={[styles.txt_news_time, { flex: 1 }]}>{`: ${categories}`}</CText>
//                           </View>
//                         }
//                       </View>
//                       <View style={styles.con_news_time}>
//                         <CText style={styles.txt_news_time}>{time.time} </CText>
//                         {time.type !== 'days' && <CText style={styles.txt_news_time} i18nKey={time.type} />}
//                         {(blogMetaField.author && author && author !== "") && <CText style={styles.txt_news_time} i18nKey={"by"} />}
//                         {(blogMetaField.author && author && author !== "") && <CText style={styles.txt_author}>{author}</CText>}
//                       </View>
//                     </View>
//                   }
//                   {(isService &&
//                     _dataOptions.length > 0) ?
//                     <View style={styles.con_variations}>
//                       <CText style={commonStyles.txt_body_meta_item}>{`${_dataOptions[0].attributes[0].name}: `}</CText>
//                       <View style={styles.con_picker_variations}>
//                         <Picker
//                           mode={"dropdown"}
//                           iosIcon={<Icon containerStyle={{ paddingHorizontal: 10 }} name="chevron-down" size={Devices.fS(15)} color={Colors.BLACK_COLOR} type={"light"} />}
//                           selectedValue={_selected ? _selected : null}
//                           onValueChange={(value) => this._onPressOption(value)}
//                           textStyle={commonStyles.txt_base_item}
//                           itemTextStyle={commonStyles.txt_base_item}
//                           headerTitleStyle={commonStyles.txt_title_header}
//                           headerBackButtonTextStyle={[commonStyles.txt_base_item, { color: Colors.PRIMARY_COLOR }]}
//                         >
//                           {_dataOptions.map((item, index) => (
//                             <Picker.Item label={item.attributes[0].option} value={item} key={item.id} />
//                           ))}
//                         </Picker>
//                       </View>
//                     </View> :
//                     <HTML
//                       html={data.short_description}
//                       tagsStyles={{ p: { color: commonStyles.txt_body_meta_item.color, fontFamily: commonStyles.txt_body_meta_item.fontFamily, fontSize: commonStyles.txt_body_meta_item.fontSize } }}
//                     />
//                   }
//                 </View>

//                 {isService &&
//                   <View style={styles.con_button_add}>
//                     {(data.stock_status === Configs.stockStatus.IN_STOCK && this.state._idxDataInCart !== -1) ?
//                       <View style={styles.con_amount_item}>
//                         <TouchableOpacity style={[styles.con_amount_right, { backgroundColor: Colors.PRIMARY_COLOR }]} activeOpacity={.5} onPress={() => this._onPressMinusAmount(this.state._idxDataInCart)}>
//                           <Icon
//                             name={"minus"}
//                             size={Devices.fS(20)}
//                             color={Colors.WHITE_COLOR}
//                             type={"light"}
//                           />
//                         </TouchableOpacity>
//                         <View style={[styles.con_input_amount, { borderColor: Colors.PRIMARY_COLOR }]}>
//                           <CText style={styles.txt_amount_item}>{cart.carts[this.state._idxDataInCart] ? cart.carts[this.state._idxDataInCart].numberOfService : 1}</CText>
//                         </View>
//                         <TouchableOpacity style={[styles.con_amount_right, { backgroundColor: Colors.PRIMARY_COLOR }]} activeOpacity={.5} onPress={() => this._onPressPlusAmount(this.state._idxDataInCart)}>
//                           <Icon
//                             name={"plus"}
//                             size={Devices.fS(20)}
//                             color={Colors.WHITE_COLOR}
//                             type={"light"}
//                           />
//                         </TouchableOpacity>
//                       </View> : <View style={styles.con_amount_item}></View>
//                     }

//                     {(data.stock_status === Configs.stockStatus.IN_STOCK && this.state._idxDataInCart === -1) ?
//                       <TouchableOpacity activeOpacity={.5} onPress={() => this._onPressAddCart(data, _selected ? _selected : null)}>
//                         <View style={[styles.con_btn_add, { backgroundColor: Colors.BACKGROUND_PRIMARY_COLOR }]} >
//                           <CText style={styles.txt_btn} i18nKey={'add'} upperCase />
//                         </View>
//                       </TouchableOpacity>
//                       :
//                       data.stock_status === Configs.stockStatus.OUT_OF_STOCK ?
//                         <CText style={styles.txt_out_of_stock} i18nKey={"out_of_stock"} />
//                         :
//                         null
//                     }
//                   </View>
//                 }
//               </Body>
//             </CardItem>
//           </View>
//           :
//           <View style={[styles.con_store, isService ? { marginVertical: 10 } : { marginTop: 10 }]}>
//             <CardItem style={[styles.con_info_store, { paddingRight: 10 }]}>
//               <Body style={styles.con_body_store}>
//                 <View>
//                   <View style={[styles.con_title_store, isNews && inBookmark && { width: Devices.sW('53%') }]}>
//                     {isNews && <CText style={styles.txt_title_new} numberOfLines={2}>{title}</CText>}
//                     {isCategory && <CText style={styles.txt_title_category} numberOfLines={2}>{data.name}</CText>}
//                     {isService && <CText style={styles.txt_title_service} numberOfLines={2}>{title}</CText>}
//                     {isService && !isNews && data.reviews_allowed && <CRateStar containerStyle={{ marginTop: 0 }} averageRating={Number(data.average_rating)} ratingCount={data.rating_count} />}
//                     {isService &&
//                       <View style={styles.con_content_price}>
//                         <CText style={styles.txt_price_item}>{' | '}</CText>
//                         {currencyPosition === Currency.left &&
//                           <CText style={[styles.txt_price_item, percentSale !== 0 && { color: Colors.PLACEHOLDER_COLOR }]}>{symbol}</CText>
//                         }
//                         <CText style={[styles.txt_price_item, percentSale !== 0 && styles.txt_regular_price]}>{price}</CText>
//                         {currencyPosition === Currency.right &&
//                           <CText style={[styles.txt_price_item, percentSale !== 0 && { color: Colors.PLACEHOLDER_COLOR }]}>{symbol}</CText>
//                         }
//                         {percentSale !== 0 &&
//                           <View style={[styles.con_content_price_2, { paddingRight: 10 }]}>
//                             {currencyPosition === Currency.left &&
//                               <CText style={styles.txt_content_price_sale}>{symbol}</CText>
//                             }
//                             <CText style={styles.txt_content_price_sale}>{Helpers.formatNumber(data.sale_price)}</CText>
//                             {currencyPosition === Currency.right &&
//                               <CText style={styles.txt_content_price_sale}>{symbol}</CText>
//                             }
//                           </View>
//                         }
//                       </View>
//                     }
//                   </View>

//                   {isNews &&
//                     <View style={styles.con_news_info}>
//                       <CText style={styles.txt_news_description} numberOfLines={2}>{excerpt}</CText>
//                       <View style={styles.con_news_time}>
//                         <CText style={styles.txt_news_time}>{time.time} </CText>
//                         {time.type !== 'days' && <CText style={styles.txt_news_time} i18nKey={time.type} />}
//                         {(blogMetaField.author && author && author !== "") && <CText style={styles.txt_author} i18nKey={"by"} />}
//                         {blogMetaField.author && <CText style={styles.txt_author}>{author}</CText>}
//                       </View>
//                       <View style={styles.con_news_time}>
//                         {(blogMetaField.categories && data.categories && data.categories.length > 0) &&
//                           <View style={[styles.con_news_time, { flex: 1 }]}>
//                             <CText style={styles.txt_news_time} i18nKey={"categories"} />
//                             <CText style={[styles.txt_news_time, { flex: 1 }]}>{`: ${categories}`}</CText>
//                           </View>
//                         }
//                       </View>

//                     </View>
//                   }

//                   {(isService &&
//                     _dataOptions.length > 0) ?
//                     <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 10 }}>
//                       <CText style={commonStyles.txt_body_meta_item}>{`${_dataOptions[0].attributes[0].name}: `}</CText>
//                       <View style={{ borderWidth: .5, borderColor: Colors.PLACEHOLDER_COLOR, flex: 1, borderRadius: 5, height: Devices.sW('8%'), justifyContent: "center", }}>
//                         <Picker
//                           mode={"dropdown"}
//                           iosIcon={<Icon containerStyle={{ paddingHorizontal: 10 }} name="chevron-down" size={Devices.fS(15)} color={Colors.BLACK_COLOR} type={"light"} />}
//                           selectedValue={_selected ? _selected : null}
//                           onValueChange={(value) => this._onPressOption(value)}
//                           textStyle={commonStyles.txt_base_item}
//                           itemTextStyle={commonStyles.txt_base_item}
//                           headerTitleStyle={commonStyles.txt_title_header}
//                           headerBackButtonTextStyle={[commonStyles.txt_base_item, { color: Colors.PRIMARY_COLOR }]}
//                         >
//                           {_dataOptions.map((item, index) => (
//                             <Picker.Item label={item.attributes[0].option} value={item} key={item.id} />
//                           ))}
//                         </Picker>
//                       </View>
//                     </View> :
//                     <HTML
//                       html={data.short_description}
//                       tagsStyles={{ p: { color: commonStyles.txt_body_meta_item.color, fontFamily: commonStyles.txt_body_meta_item.fontFamily, fontSize: commonStyles.txt_body_meta_item.fontSize } }}
//                     />
//                   }
//                 </View>

//                 {isService &&
//                   <View style={styles.con_button_add}>
//                     {(data.stock_status === Configs.stockStatus.IN_STOCK && this.state._idxDataInCart !== -1) ?
//                       <View style={styles.con_amount_item}>
//                         <TouchableOpacity style={[styles.con_amount_right, { backgroundColor: Colors.PRIMARY_COLOR }]} activeOpacity={.5} onPress={() => this._onPressMinusAmount(this.state._idxDataInCart)}>
//                           <Icon
//                             name={"minus"}
//                             size={Devices.fS(20)}
//                             color={Colors.WHITE_COLOR}
//                             type={"light"}
//                           />
//                         </TouchableOpacity>
//                         <View style={[styles.con_input_amount, { borderColor: Colors.PRIMARY_COLOR }]}>
//                           <CText style={styles.txt_amount_item}>{cart.carts[this.state._idxDataInCart] ? cart.carts[this.state._idxDataInCart].numberOfService : 1}</CText>
//                         </View>
//                         <TouchableOpacity style={[styles.con_amount_right, { backgroundColor: Colors.PRIMARY_COLOR }]} activeOpacity={.5} onPress={() => this._onPressPlusAmount(this.state._idxDataInCart)}>
//                           <Icon
//                             name={"plus"}
//                             size={Devices.fS(20)}
//                             color={Colors.WHITE_COLOR}
//                             type={"light"}
//                           />
//                         </TouchableOpacity>
//                       </View> : <View style={styles.con_amount_item}></View>
//                     }

//                     {(data.stock_status === Configs.stockStatus.IN_STOCK && this.state._idxDataInCart === -1) ?
//                       <TouchableOpacity activeOpacity={.5} onPress={() => this._onPressAddCart(data, _selected ? _selected : null)}>
//                         <View style={[styles.con_btn_add, { backgroundColor: Colors.BACKGROUND_PRIMARY_COLOR }]} >
//                           <CText style={styles.txt_btn} i18nKey={'add'} upperCase />
//                         </View>
//                       </TouchableOpacity>
//                       :
//                       data.stock_status === Configs.stockStatus.OUT_OF_STOCK ?
//                         <CText style={styles.txt_out_of_stock} i18nKey={"out_of_stock"} />
//                         :
//                         null
//                     }
//                   </View>
//                 }
//               </Body>
//             </CardItem>

//             <TouchableOpacity activeOpacity={.5} onPress={() => onPress(data)}>
//               <CImage
//                 style={[styles.img_store, { width: size.width, height: size.height }]}
//                 source={source}
//                 renderContent={
//                   isNews && inBookmark &&
//                   <View style={styles.con_content_image}>
//                     <View style={styles.con_bookmark}>
//                       <Icon name={'bookmark'} color={Colors.PRIMARY_COLOR} sizes={Devices.fS(20)} type={'solid'} />
//                     </View>
//                   </View>
//                 }
//               />
//             </TouchableOpacity>
//           </View>
//         }
//       </View>
//     )
//   }
// }

// export default Horizontal = ({
//   contentStyle = {},
//   refreshing = false,
//   data = [],
//   render = {
//     header: () => null,
//     footer: () => null,
//     item: () => null,
//     empty: RenderEmptyList
//   },
//   onFunction = {
//     onPressItem: () => { },
//     onPressAddCart: () => { },
//     onRefreshPage: () => { }
//   },
//   paging = {
//     onRefresh: () => null,
//     onLoadMore: () => null
//   },
//   isNews = false,
//   isService = false,
//   isCategory = false,
//   leftThumb = false,
//   cart = {
//     carts: [],
//     cartActions: null
//   }
// }) => {
//   return (
//     <FlatList
//       style={styles.con_list_store}
//       contentContainerStyle={[commonStyles.flex_grow, contentStyle]}
//       data={data}
//       renderItem={({ item, index }) =>
//         <RenderItem data={item} isNews={isNews} isService={isService}
//           isCategory={isCategory} leftThumb={leftThumb}
//           blogMetaField={Configs.settingLocal.blog.blog_meta_fields}
//           cart={cart}
//           onPress={onFunction.onPressItem}
//           onPressAddCart={onFunction.onPressAddCart}
//           onRefreshPage={onFunction.onRefreshPage} />
//       }
//       keyExtractor={(item, index) => item.id + index.toString()}
//       extraData={data}
//       showsVerticalScrollIndicator={false}
//       showsHorizontalScrollIndicator={false}
//       removeClippedSubviews={Devices.OS === 'android'}
//       initialNumToRender={10}
//       ListHeaderComponent={render.header}
//       ListFooterComponent={render.footer}
//       ListEmptyComponent={render.empty}
//       ItemSeparatorComponent={isService && data.length > 0 && renderSeparator}
//       refreshing={refreshing}
//       onRefresh={() => paging.onRefresh(data.id && data.id)}
//       onEndReachedThreshold={0.1}
//       onEndReached={() => paging.onLoadMore(data.id && data.id)}
//     />
//   )
// }