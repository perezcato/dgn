/**
 * @Description: Post screen
 * @Created by ZiniTeam
 * @Date create: 09/01/2019
 */

/** LIBRARY */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from 'react-native-firebase';

/** COMMON **/
import { Config, Device } from '~/config';
import Helpers from '~/utils/helpers';
import Services from '~/services';

/** COMPONENTS **/
import CLoading from '~/components/CLoading';
import CInnerLoading from '~/components/CInnerLoading';
import { TwoColumn } from '~/components/CLayout';
import Item from '~/components/CItem';
import CHeader from '~/components/CHeader';
import CScrollView from '~/components/CScrollView';

/** STYLES **/
import tagStyle from './style';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

/** DECLARE CLASS */
class TagScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			_loading: false,
			_isLoadMore: false,
			_isResult: false,
			_page: 1,
			_noMoreData: false,
		}
		this._typeShowNewsItem = Config.default_layout_category;
		this._postResult = null;
		this._infoTag = {};
		this._idTag = this.props.route.params.id;
		this._nameTag = this.props.route.params.name;
		this._ads = Config.settingV2.ads;
	}

	render() {
		let { _loading, _isResult, _noMoreData } = this.state;
		//config
		let tag_style = Config.settingV2.blog.blog_layout;
		let adBefore = this._ads.is_show_blog_ads_header;
		let adBeforeId = this._ads.blog_ads_header_id;
		let adAfter = this._ads.is_show_blog_ads_footer;
		let adAfterId = this._ads.blog_ads_footer_id;

		return (
			<View style={tagStyle.container}>
				{/* Header */}
				<CHeader hasBtnBack={true} hasTitle={true} title={'#' + this._nameTag} />
				{_loading ?
					<CLoading />
					:
					<View style={{ flex: 1 }}>
						{_isResult && this._postResult ?
							// Scroll View
							<CScrollView loadMore={this._loadMoreData}>
								<View style={{ height: '100%' }}>
									{adBefore &&
										<Banner
											size={"SMART_BANNER"}
											request={request.build()}
											unitId={adBeforeId.trim()}
											onAdLoaded={() => {
												console.log('Advert loaded');
											}}
										/>
									}
									{/* GRID LAYOUT */}
									{this._postResult && Config.layout.grid_thumb === tag_style &&
										<TwoColumn
											style={{ flex: 1 }}
											hasTitle={false}
											data={this._postResult}
										/>
									}
									{/* CARD LAYOUT */}
									{Config.layout.card_thumb === tag_style &&
										this._postResult.length > 0 &&
										<FlatList
											data={this._postResult}
											renderItem={({ item, index }) => {
												return (
													<View style={{ width: '100%', height: Device.w_scale('60%'), marginTop: 15 }}>
														<Item data={item} stretchImage={false} layoutCard={true} />
													</View>
												)
											}}
											keyExtractor={(item, index) => index.toString()}
										/>

									}
									{/* LEFT - RIGHT LAYOUT */}
									{(Config.layout.left_thumb === tag_style ||
										Config.layout.right_thumb === tag_style) &&
										this._postResult.length > 0 &&
										<FlatList
											data={this._postResult}
											renderItem={({ item, index }) => {
												return (
													<View style={{ width: '100%', height: Device.w_scale('27.5%'), marginVertical: Config.layout_offset.left, paddingHorizontal: Config.layout_offset.left, marginTop: (index === 0 ? Config.layout_offset.left : 0) }}>
														{Config.layout.left_thumb === tag_style &&
															<Item data={item} layoutLeft={true} hasExcerpt={true} />
														}
														{Config.layout.right_thumb === tag_style &&
															<Item data={item} layoutRight={true} hasExcerpt={true} />
														}
													</View>
												)
											}}
											keyExtractor={(item, index) => index.toString()}
										/>
									}
									{!_loading && !_noMoreData && this._postResult && this._postResult && this._postResult.length >= 10 &&
										<CInnerLoading style={{ height: 32 }} />
									}
									{adAfter &&
										<Banner
											size={"SMART_BANNER"}
											request={request.build()}
											unitId={adAfterId.trim()}
											onAdLoaded={() => {
												console.log('Advert loaded');
											}}
										/>
									}
								</View>
							</CScrollView> :
							<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Config.layout_offset.left }}>
								<Text>Chưa có bài post nào</Text>
							</View>
						}
					</View>
				}
			</View>
		);
	}

	/**
	* Life Cycle
	*/
	componentDidMount() {
		this._getDataFromServer();
	}

	/**
	* Function
	*/
	_getDataFromServer = async () => {
		//loading
		this.setState({
			_loading: true,
		});
		//GET POST BY TAG ID
		let result = await Services.Posts.getPostByTagID(this._idTag, 1);
		if (result) {
			// console.log("RESULT SEARCH: ", result)
			this._postResult = Helpers.prepareListPost(result);
			this.setState({
				_loading: false,
				_isResult: true,
				_noMoreData: false,
				_page: 1,
			});
			if (result.length < 6) {
				this.setState({
					_noMoreData: true,
				});
			}
		}
		// console.log("POST RESULT: ", this._postResult.arrItems)
	}

	_loadMoreData = async () => {
		let listPost = [];
		if (!this.state._noMoreData) {
			listPost = await Services.Posts.getPostByTagID(8, this.state._page + 1);
		}
		// console.log('--- _loadMoreData ---');
		// console.log(listPost);
		// console.log('--- o0o ---');
		if (listPost.length > 0) {
			listPost = Helpers.prepareListPost(listPost);
			// console.log('POST RESULT BEFORE UPDATE: ', this._postResult.arrItems);
			// console.log('LISTPOST RESULT UPDATE: ', listPost.arrItems);
			this._postResult = this._postResult.concat(listPost);
			// console.log('POST RESULT AFTER UPDATE: ', this._postResult.arrItems)
			this.setState({
				_page: this.state._page + 1,
			})
		} else {
			this.setState({
				_noMoreData: true,
			})
		}
	}
}

export default TagScreen;
