/**
 * @Description: Post screen
 * @Created by ZiniTeam
 * @Date create: 20/11/2018
 */
/** LIBRARY */
import React from 'react';
import {
	View, Text, TouchableOpacity, ScrollView, Keyboard,
	ActivityIndicator, FlatList
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { useNavigation } from '@react-navigation/native';
/** COMMON **/
import { Config, Languages, Device } from '~/config';
import Helpers from '~/utils/helpers';
import Services from '~/services';
import { Colors } from '~/utils/colors';
/** COMPONENTS **/
import CLoading from '~/components/CLoading';
import CInnerLoading from '~/components/CInnerLoading';
import HashTagItem from '~/components/CHashtagItem';
import Item from '~/components/CItem';
import CInput from '~/components/CInput';
import CScrollView from '~/components/CScrollView';
/** REDUX ACTIONS */
import * as sideMenuActions from '~/redux/actions/side_menu';
/** STYLES **/
import styles from './style';
import TwoColumn from '~/components/CLayout/TwoColumn';


class SearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_loading: true,
			_loadingSearch: false,
			_isLoadMore: false,
			_isResult: false,
			_isShowClear: false,
			_page: 1,
			_noMoreData: false,
			_dataHashTag: []
		}
		this._typeShowNewsItem = Config.default_layout_category;
		this._postResult = [];
	}
	
	/** FUNCTIONS */
	_getDataFromServer = async () => {
		this.setState({ _loadingSearch: true });

		let result = await Services.Posts.getPostByKeySeach(this.nameInput.value, 1);
		if (result) {
			this._postResult = Helpers.prepareListPost(result);
			this.setState({
				_loadingSearch: false,
				_isResult: true,
				_noMoreData: false,
				_page: 1,
			});
		} else {
			this.setState({
				_loadingSearch: false,
				_isResult: false,
				_noMoreData: true,
				_page: 1,
			});
		}
	}

	_getListTags = async () => {
		let listTags = await Services.Tags.getList();
		if (listTags) {
			listTags = this._prepareListTag(listTags);
			this.setState({
				_dataHashTag: listTags,
				_loading: false
			})
		}
	}

	_prepareListTag = (list = []) => {
		let _list = [];
		if (list.length > 0) {
			list.map((item) => {
				let _tmpData = {
					id: item.id,
					name: item.name,
					orginData: item
				}
				_list.push(_tmpData);
			})
		}
		return _list;
	}

	_loadMoreData = async () => {
		let listPost = [];
		if (!this.state._noMoreData) {
			listPost = await Services.Posts.getPostByKeySeach(this.nameInput.value, this.state._page + 1);
		}
		if (listPost.length > 0) {
			listPost = Helpers.prepareListPost(listPost);
			this._postResult = this._postResult.concat(listPost);
			this.setState({
				_page: this.state._page + 1,
			})
		} else {
			this.setState({
				_noMoreData: true,
			})
		}
	}

	_handlerAfterChange = text => {
		if (text !== '') {
			if (!this.state._isShowClear) {
				this.setState({ _isShowClear: true });
			}
		} else {
			this.setState({ _isShowClear: false });
		}
	}

	_handlerSubmit = () => {
		Keyboard.dismiss();
		if (this.nameInput && this.nameInput.value === '') return;
		this._getDataFromServer();
	}

	_handlerClear = () => {
		this.nameInput.clear();
		this.setState({ _isShowClear: false });
	}

	_handlerCancel = () => {
		let _prevRouteObj = this.props.route.params.prevRouteObj
		console.log('_prevRouteObj', _prevRouteObj)
		this.props.sideMenuActions.changeSideMenu(_prevRouteObj);
		this.props.navigation.goBack();
	}

	/** LIFE CYCLE */
	componentDidMount() {
		this._getListTags()
	}

	/** RENDER */
	render() {
		let { _loading, _loadingSearch, _isResult, _isShowClear, _noMoreData, _dataHashTag } = this.state;
		let search_style = Config.settingV2.blog.blog_layout;

		return (
			<View style={styles.container}>
				<View style={styles.s_header_container}>
					<View style={styles.s_header_content}>
						<View style={[styles.s_header_inpuBlock, { marginLeft: Config.layout_offset.left }]}>
							<CInput
								placeholder={Languages[Config.lang].SEARCH}
								placeholderTextColor={Colors.cloSearchPlaceholder}
								style={[styles.s_header_input, { paddingLeft: 36 }]}
								ref={(input) => { this.nameInput = input; }}
								value={''}
								onSubmitEditing={this._handlerSubmit}
								afterChangeText={this._handlerAfterChange}
								enablesReturnKeyAutomatically={true}
								returnKeyType={'search'}
								autoFocus={true}
							/>
							<TouchableOpacity style={styles.s_header_icSearch} onPress={this._handlerSubmit} disabled={_loadingSearch}>
								{_loadingSearch ?
									<ActivityIndicator size={'small'} />
									:
									<Icon name={'search'} size={16} color={'#191919'} type={'light'} />
								}
							</TouchableOpacity>
							{_isShowClear &&
								<TouchableOpacity style={styles.s_header_btnClear} onPress={this._handlerClear}>
									<Icon name={'times-circle'} size={16} color={'#191919'} type={'light'} />
								</TouchableOpacity>
							}
						</View>

						<TouchableOpacity style={[styles.s_header_cancelButton, { marginLeft: 15, marginRight: Config.layout_offset.left }]}
							onPress={this._handlerCancel}>
							<Text style={styles.s_header_txtCancel}>{'Cancel'}</Text>
						</TouchableOpacity>
					</View>
				</View>

				{_loading ?
					<CLoading />
					:
					<View style={{ flex: 1 }}>
						{_isResult && this._postResult ?
							<CScrollView loadMore={this._loadMoreData}>
								<View style={{ height: '100%' }}>
									{this._postResult && Config.layout.grid_thumb === search_style &&
										<TwoColumn
											style={{ flex: 1 }}
											hasTitle={false}
											data={this._postResult}
										/>
									}

									{/* CARD LAYOUT */}
									{Config.layout.card_thumb === search_style &&
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
									{(Config.layout.left_thumb === search_style ||
										Config.layout.right_thumb === search_style) &&
										this._postResult.length > 0 &&
										<FlatList
											data={this._postResult}
											renderItem={({ item, index }) => {
												return (
													<View style={{ width: '100%', height: Device.w_scale('27.5%'), marginVertical: Config.layout_offset.left, paddingHorizontal: Config.layout_offset.left, marginTop: (index === 0 ? Config.layout_offset.left : 0) }}>
														{Config.layout.left_thumb === search_style &&
															<Item data={item} layoutLeft={true} hasExcerpt={true} />
														}
														{Config.layout.right_thumb === search_style &&
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
								</View>
							</CScrollView> :
							<ScrollView
								style={{ flex: 1 }}
								contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
								keyboardShouldPersistTaps={'handled'}>
								<View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
									{_dataHashTag.map((item, index) =>
										<View key={index} style={{ height: 30, marginTop: 10 }}>
											<HashTagItem
												index={index}
												style={{ backgroundColor: '#f2f2f2' }}
												id={item.id}
												name={item.name}
											/>
										</View>
									)}
								</View>

								<View style={styles.s_noResult}>
									<Icon name={'search'} size={130} color={'rgba(0,0,0, 0.5)'} type={'light'} />
									<View style={styles.s_noResult_text}>
										<Text style={styles.s_noResult_text_nsrs}>{'No search result'}</Text>
										<Text style={styles.s_noResult_text_nof}>{'No search results. Please revise your search and try again.'}</Text>
									</View>
								</View>
							</ScrollView>
						}
					</View>
				}

			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		sideMenu: state.sideMenu
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		sideMenuActions: bindActionCreators(sideMenuActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	function (props) {
		const navigation = useNavigation();

		return <SearchScreen {...props} navigation={navigation} />;
	}
); 
