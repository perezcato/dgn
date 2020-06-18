/**
 * @Description: Category screen
 * @Created by ZiniTeam
 * @Date create: 06/11/2018
 */
/** LIBRARY */
import React from 'react';
import { View, Animated, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
/** COMMON */
import { Config, Device } from '~/config';
import Helpers from '~/utils/helpers';
import Services from '~/services';
import * as sideMenuActions from '~/redux/actions/side_menu';
import { Colors } from '~/utils/colors';
import Icon from 'react-native-fontawesome-pro';
/** COMPONENTS */
import CLoading from '~/components/CLoading';
import CHeader from '~/components/CHeader';
import { TwoColumn } from '~/components/CLayout';
import Item from '~/components/CItem';
import CScrollView from '~/components/CScrollView';
import CText from '~/components/CText'
/** STYLE */
import styles from './style';


const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');

/** DECLARE CLASS */
class CategoriesScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_loading: true,
			_refresh: false,
			_noMoreData: false,
			_category: null,
			_dataListPost: [],
			_categories: []
		}
		this._page = 1;
		this._categorySetting = Config.settingV2.blog;
		this._ads = Config.settingV2.ads;
		this.category_style = this._categorySetting.blog_layout !== "" ?
			this._categorySetting.blog_layout : Config.layout.left_thumb;
		this.category_show_title = this._categorySetting.blog_show_title;
		this.category_show_excerpt = this._categorySetting.blog_show_excerpt;
		this.adBefore = this._ads.is_show_blog_ads_header;
		this.adBeforeId = this._ads.blog_ads_header_id;
		this.adAfter = this._ads.is_show_blog_ads_footer;
		this.adAfterId = this._ads.blog_ads_footer_id;
		this.text_base_color = Colors.cloBody;
	}

	/** FUNCTIONS */

	_getDataFromServer = async () => {
		let { isHome, idByTabItem, sideMenu } = this.props;

		let { _dataListPost } = this.state;
		/** get cate by id */
		let category = await Services.Categories.getCateByID(isHome ? idByTabItem : sideMenu.id);
		/** get posts of category */
		let listPost = await Services.Posts.getPostsByCategory(isHome ? idByTabItem : sideMenu.id, this._page);

		let categories = await Services.Categories.getAllCategories();

		if (listPost) {
			_dataListPost = Helpers.prepareListPost(listPost);
		}

		this._page += 1;
		//ready to render
		this.setState({
			_category: category ? category : null,
			_dataListPost,
			_categories: categories ? categories : null,
			_loading: false
		});
	}


	_onRefresh = async () => {
		this.setState({ _refresh: true });
		let { isHome, idByTabItem, sideMenu } = this.props;
		let { _dataListPost } = this.state;
		let tmp = await Services.Posts.getPostsByCategory(isHome ? idByTabItem : sideMenu.id, 1);
		if (tmp && tmp.length > 0) {
			//set init data
			_dataListPost = [];

			_dataListPost = Helpers.prepareListPost(tmp);
		}
		this._page = 2;
		this.setState({ _dataListPost, _refresh: false });
	}

	_loadMoreData = async () => {
		if (!this.state._noMoreData) {
			let { isHome, idByTabItem, sideMenu } = this.props;
			let { _dataListPost } = this.state;
			let listPost = await Services.Posts.getPostsByCategory(isHome ? idByTabItem : sideMenu.id, this._page);

			if (listPost && listPost.length > 0) {
				listPost = Helpers.prepareListPost(listPost);
				_dataListPost = [..._dataListPost, ...listPost];
				this._page += 1;
				this.setState({ _dataListPost });
			} else {
				this.setState({ _noMoreData: true });
			}
		}
	}

	_onPressMenu = () => {
		this.props.navigation.toggleDrawer();
	}

	_onBack = () => {
		this.props.sideMenuActions.changeSideMenu({
			name: 'News',
			id: 'news'
		});
		this.props.navigation.goBack();
	}

	ViewListEmpty = () => {
		return (
			<View style={styles.con_no_data}>
				<Text style={styles.txt_no_data}>{'No Data'}</Text>
			</View>
		)
	}
	/** LIFE CYCLE */
	componentDidMount() {
		this._getDataFromServer();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!this.props.isHome) {
			if (prevProps.sideMenu.id != this.props.sideMenu.id) {
				this.setState({ _loading: true });
				this._page = 1;
				this._getDataFromServer();
			}
		}
	}

	/** RENDER */
	render() {
		let { _loading, _refresh, _dataListPost, _category, _categories } = this.state;
		let { isHome } = this.props;

		console.log('_dataListPost', _dataListPost)

		let _result = { arrItems: _dataListPost, title: '' }

		return (
			<View style={styles.container}>
				{!isHome &&
					<CHeader hasBtnBack hasTitle title={this.category_show_title ? this.props.sideMenu.name : ''} onBack={this._onBack} />
				}

				{this.category_show_excerpt && _category && _category.description != '' &&
					<Text style={[{ color: Colors.cloExcPost, fontSize: Device.fS(14), fontFamily: Device.fontSlabBold, paddingVertical: 10, paddingHorizontal: Config.layout_offset.left }, this.text_base_color != '' ? { color: this.text_base_color } : {}]}>
						{_category.description}
					</Text>
				}

				{_loading ? <CLoading />
					:
					<>
						{_dataListPost.length > 0 ?
							<CScrollView loadMore={this._loadMoreData} onRefresh={this._onRefresh} refreshing={_refresh}>
								{this.adBefore &&
									<Banner
										size={"SMART_BANNER"}
										request={request.build()}
										unitId={this.adBeforeId.trim()}
										onAdLoaded={() => {
											console.log('Advert loaded');
										}}
									/>
								}
								<View style={{ marginVertical: Config.layout_offset.vertical }}>
									{/* GRID LAYOUT */}
									{Config.layout.grid_thumb === this.category_style &&
										<TwoColumn style={{ flex: 1 }} data={_result} />
									}

									{/* CARD LAYOUT */}
									{Config.layout.card_thumb === this.category_style &&
										<FlatList
											data={_dataListPost}
											renderItem={({ item, index }) => {
												return (
													<View style={{ width: '100%', height: Device.w_scale('60%'), marginBottom: 15 }}>
														<Item data={item} stretchImage={false} layoutCard={true} />
													</View>
												)
											}}
										/>
									}

									{/* LEFT - RIGHT LAYOUT */}
									{(Config.layout.left_thumb === this.category_style || Config.layout.right_thumb === this.category_style) &&
										<FlatList
											data={_dataListPost}
											renderItem={({ item, index }) => {
												return (
													<View key={index} style={{ width: '100%', height: Device.w_scale('27.5%'), marginVertical: Config.layout_offset.left, paddingHorizontal: Config.layout_offset.left, marginTop: (index === 0 ? Config.layout_offset.left : 0) }}>
														{Config.layout.left_thumb === this.category_style &&
															<Item data={item} layoutLeft={true} hasExcerpt={true} />
														}
														{Config.layout.right_thumb === this.category_style &&
															<Item data={item} layoutRight={true} hasExcerpt={true} />
														}
													</View>
												)
											}}
											keyExtractor={(item, index) => index.toString()}
										/>
									}
								</View>

								{this.adAfter &&
									<Banner
										size={"SMART_BANNER"}
										request={request.build()}
										unitId={this.adAfterId.trim()}
										onAdLoaded={() => {
											console.log('Advert loaded');
										}}
									/>
								}
							</CScrollView>
							:
							this.ViewListEmpty()
						}
					</>
				}
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		sideMenu: state.sideMenu
	}
}

const mapDispatchToProps = dispatch => {
	return {
		sideMenuActions: bindActionCreators(sideMenuActions, dispatch)
	}
}

CategoriesScreen.defaultProps = {
	isHome: false
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);
