/**
 * @Description: Styles Slider Entry
 * @Created by ZiniTeam
 * @Date create: 11/01/2019
 */

/** LIBRARY */
import { StyleSheet, Dimensions, Platform } from 'react-native';

/** COMMON */
import { Device } from '~/config';

/** INIT */
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
	const value = (percentage * viewportWidth) / 100;
	return Math.round(value);
}

const slideHeight = viewportHeight * 0.40;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 10;

export default StyleSheet.create({
	slider: {
		marginTop: 15,
		overflow: 'visible' // for custom animations
	},
	sliderContentContainer: {
		paddingVertical: 10 // for custom animation
	},
	slideInnerContainer: {
		width: itemWidth,
		height: slideHeight,
		paddingHorizontal: itemHorizontalMargin,
		// paddingBottom: 18 // needed for shadow
	},
	shadow: {
		position: 'absolute',
		top: 0,
		left: itemHorizontalMargin,
		right: itemHorizontalMargin,
		bottom: 18,
		shadowColor: 'black',
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		borderRadius: entryBorderRadius
	},
	imageContainer: {
		flex: 1,
		marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
		backgroundColor: 'white',
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
		borderBottomLeftRadius: entryBorderRadius,
		borderBottomRightRadius: entryBorderRadius
	},
	imageContainerEven: {
		backgroundColor: 'black'
	},
	image: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'cover',
		borderRadius: IS_IOS ? entryBorderRadius : 0,
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
		borderBottomLeftRadius: entryBorderRadius,
		borderBottomRightRadius: entryBorderRadius
	},
	// image's border radius is buggy on iOS; let's hack it!
	radiusMask: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: entryBorderRadius,
		backgroundColor: 'white'
	},
	radiusMaskEven: {
		backgroundColor: 'black'
	},
	textContainer: {
		justifyContent: 'center',
		paddingTop: 15 - entryBorderRadius,
		paddingBottom: 15,
		backgroundColor: 'white',
	},
	textContainerEven: {
		backgroundColor: 'black'
	},
	title: {
		color: 'black',
		fontSize: Device.fS(13),
		fontFamily: Device.fontSlabBold,
		letterSpacing: 0.5
	},
	titleEven: {
		color: 'white'
	},
	subtitle: {
		marginTop: 6,
		color: '#888888',
		fontSize: Device.fS(12),
		fontFamily: Device.fontSlabRegular
	},
	subtitleEven: {
		color: 'rgba(255, 255, 255, 0.7)'
	}
});
