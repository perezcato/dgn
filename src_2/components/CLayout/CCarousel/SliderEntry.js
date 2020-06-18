/**
 * @Description: SliderEntry
 * @Created by ZiniTeam
 * @Date create: 11/01/2019
 */
/** LIBRARY */
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity, StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import Icon from 'react-native-fontawesome-pro';

/** STYLES */
import styles from './style_slider_entry';

/** COMMON */
import { Device, Config } from '~/config';
import Helpers from '~/utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '~/utils/colors';

/** INIT */
const INIT = {
	IC_IMAGE: 'images',
	IC_VIDEO: 'play-circle'
}

/** CLASSES */
class SliderEntry extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		hasIcon: PropTypes.bool,
		even: PropTypes.bool,
		parallax: PropTypes.bool,
		parallaxProps: PropTypes.object
	};

	get image() {
		const { data, parallax, parallaxProps, even } = this.props;

		return parallax ? (
			<ParallaxImage
				source={data && data.thumbnail ? { uri: data.thumbnail } : Config.img_broken }
				containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
				style={styles.image}
				parallaxFactor={0.2}
				showSpinner={true}
				spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
				{...parallaxProps}
			/>
		) : (
				<Image
					source={data && data.thumbnail ? { uri: data.thumbnail } : Config.img_broken }
					style={styles.image}
				/>
			);
	}

	render() {
		const { data: { title, time, orginData }, even, hasIcon } = this.props;

		const uppercaseTitle = title ? (
			<Text
				style={[styles.title, even ? styles.titleEven : {}]}
				numberOfLines={1}
			>
				{title}
			</Text>
		) : false;

		return (
			<TouchableOpacity
				activeOpacity={1}
				style={styles.slideInnerContainer}
				onPress={this._onPressItem}
			>
				{this.image}
				<LinearGradient style={{ position: 'absolute', top: 100, bottom: 55, right: styles.slideInnerContainer.paddingHorizontal, left: styles.slideInnerContainer.paddingHorizontal, zIndex: 100, borderBottomLeftRadius: styles.image.borderBottomLeftRadius, borderBottomRightRadius: styles.image.borderBottomLeftRadius }}
					colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,.9)']}>

				</LinearGradient>

				{hasIcon &&
					<Icon
						containerStyle={{ position: 'absolute', bottom: 65, left: Device.s * 18, zIndex: 101 }}
						name={orginData.format == 'video' ? INIT.IC_VIDEO : _typeOfPost == 'gallery' ? INIT.IC_IMAGE : ''}
						size={Device.s * 30}
						color={'white'}
						type={'solid'}
					/>
				}
				<View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
					{uppercaseTitle}
					<Text style={{ color: Colors.cloTimeSend, fontSize: Device.fS(9), fontFamily: Device.fontSlabLight, width: Device.w_scale('44%'), marginTop: 5 }} numberOfLines={1}>{Helpers.getLastPeriod(time, 'fullday')}</Text>
				</View>
			</TouchableOpacity >
		);
	}

	/**
	 * Functions
	 */
	_onPressItem = () => {
		this.props.navigation.navigate('post', {
			data: this.props.data
		});
	}
}

export default function (props) {
	const navigation = useNavigation();

	return <SliderEntry {...props} navigation={navigation} />;
}
