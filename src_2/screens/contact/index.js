/**
 * @Description: Contact Screen
 * @Created by ZiniTeam
 * @Date create: 02/01/2019
 */
/** LIBRARY */
import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
/** COMMON */
import { Config } from '~/config';
/** LIBRARY */
import CHeader from '~/components/CHeader';
import CDrawer from '~/components/CDrawer';
/** LIBRARY */
import styles from './style';

class ContactScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_isReady: false
		}
		this._contactData = {};
		this.INIT = [{
			IC_NAME: 'phone',
			TITLE: 'Contact',
			onPress: this._onPressCall
		}, {
			IC_NAME: 'envelope',
			TITLE: 'E-mail',
			onPress: this._onPressfeedback
		}, {
			IC_NAME: 'map-marker-alt',
			TITLE: 'Address',
			onPress: this._onPressAddr
		}
		]
		this._logo = null;
	}

	/** FUNCTIONS */
  _closeDrawer = () => {
    this._drawer && this._drawer._root.close()
  }

  _openDrawer = () => {
    this._drawer && this._drawer._root.open()
	}

	/** RENDER */
	render() {
		let { setting } = this.props;
		console.log(this.props.setting)
		return (
			<Drawer
				ref={ref => this._drawer = ref}
        content={<CDrawer navigation={this.props.navigation} onClose={this._closeDrawer} onClose={this._closeDrawer} />}
        onClose={this._closeDrawer}
			>
				<View style={styles.container}>
					<CHeader title={'Contact'} onMenu={this._openDrawer} />

					<View style={styles.content}>
						<View style={styles.logo_box}>
							<Image
								style={styles.logo}
								source={this._logo ? { uri: this._logo } : Config.ico_logo_default}
								resizeMode={'contain'}
							/>
						</View>
						<View style={styles.info}>
							{
								this.INIT.map((item, index) => {
									// console.log(item)
									return (
										<TouchableOpacity key={index} style={styles.info_item} onPress={item.onPress ? item.onPress : null}>
											<Icon containerStyle={styles.iconItem} name={item.IC_NAME} size={20} color={'black'} type={'light'} />
											<View style={{ flex: 1 }}>
												<Text style={styles.text_info}>{item.info}</Text>
											</View>
										</TouchableOpacity>
									)
								})
							}
						</View>
					</View>
				</View>
			</Drawer>
		)
	}
	/**
	 * Life Cycle
	 */
	componentDidMount() {
		this._prepareContactData();
	}
	/**
	 * Function
	 */
	_prepareContactData() {
		if (this.props.setting) {
			let { setting } = this.props;
			//set logo
			if (setting.general) {
				if (setting.general.app_logo) {
					//this._logo = setting.general.app_logo.sizes.thumbnail;
					this.logo = '';
				}
			}
			// set info basic app
			this._contactData = {
				info_app_name: setting.general.app_name,
				info_app_version: setting.general.app_version
			}
			this.INIT[0].info = setting.general.contact;
			this.INIT[1].info = setting.general.email;
			this.INIT[2].info = setting.general.address;
			this.setState({ _isReady: true });
		}
	}
	/**
	 * EVENT
	*/
	_onPressMenu = () => {
		this.props.navigation.toggleDrawer();
	}
	_onPressfeedback = () => {
		Linking.openURL('mailto:' + this.INIT[1].info).catch(error => console.log('Error send mail'));
	}
	_onPressCall = () => {
		Linking.openURL('tel:' + this.INIT[0].info).catch(error => console.log('Error call'));
	}
	_onPressAddr = () => {
		Linking.openURL('https://goo.gl/maps/sa9bVTHnody')
	}

}

const mapStateToProps = (state) => {
	return {
		setting: state.setting.settingsV2
	}
}

export default connect(mapStateToProps, null)(ContactScreen);
