/**
 * @Description: Config
 * @Created by ZiniTeam
 * @Date create: 07/11/2018
 */
/** LIBRARY */
import { Dimensions, PixelRatio } from 'react-native';
import { Html5Entities } from 'html-entities';
import moment from 'moment';
/** COMMON */
import en from '~/utils/languages/locales/en';
import vi from '~/utils/languages/locales/vi';
import es from '~/utils/languages/locales/es';
import pt from '~/utils/languages/locales/pt';
import ru from '~/utils/languages/locales/ru';
import fr from '~/utils/languages/locales/fr';

/** INIT */
const { width, height } = Dimensions.get("window");
const STANDARD_SIZE = { width: 375 }
const OS = Platform.OS;
const WIDTH_SCREEN = Dimensions.get('window').width;

const widthPercentageToDP = widthPercent => {
  let screenWidth = Dimensions.get('window').width;
  let elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

const heightPercentageToDP = heightPercent => {
  let screenHeight = Dimensions.get('window').height;
  let elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

const getFontSize = (size) => {
  return (parseInt(size) * Dimensions.get('window').width / STANDARD_SIZE.width);
}

/* PARSE BORDER RADIUS WITH SREEN SIZE */
const fS = size => {
  return (parseInt(size) * WIDTH_SCREEN / STANDARD_SIZE.width);
}

const bR = param => {
  if (OS === 'android') return param;
  else if (OS === 'ios') return param / 2;
}

/* PARSE WIDTH WITH SREEN SIZE */
const sW = widthPercent => {
  let screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  let elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};



/* PARSE HEIGHT WITH SREEN SIZE */
const sH = heightPercent => {
  let screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  let elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

/* PARSE PADDING HORIZONTAL WITH SREEN SIZE */
const pH = layoutWidth => {
  let screenWidth = Dimensions.get('window').width;
  let paddingPercent = (100 - layoutWidth) / 2;
  return PixelRatio.roundToNearestPixel(screenWidth * paddingPercent / 100);
}

/* PARSE BORDER RADIUS WITH SREEN SIZE */
const getBorderRadius = (height) => {
  if (Platform.OS == 'android') {
    return height;
  } else if (Platform.OS == 'ios') {
    return height / 2;
  }
}

export const Config = {
  /* URL API */
  host: 'https://news.aftown.com',
  // host: 'http://food.zapes.zinisoft.net',
  //host: 'https://smi.kg',
  /* LANG */
  lang: 'en',

  /* SETTINGS */
  setting: null,
  settingV2: null,
  homeSettings: [],
  ratingAppleAppID: '1486275953',
  ratingGooglePackageName: 'com.zapes',

  /** RATE */
  numberToShowRate: 10,

  /* LAYOUT */
  default_layout_category: 1,
  layout_offset: {
    left: 15,
    right: 15,
    vertical: 5
  },

  /* INIT ICON */
  ico_loading: require('../../assets/icons/ico_loading.gif'),
  ico_logo_default: require('../../assets/icon.png'),
  ico_logo: null,

  ico_back: 'chevron-left',
  ico_comment: 'comment-lines',
  ico_share: 'share-alt',
  ico_bookmark: 'bookmark',
  ico_play: 'play-circle',
  ico_pause: 'pause-circle',

  /** INIT IMAGE */
  img_broken: require('../../assets/images/image_failed.png'),
  img_bg: require('../../assets/images/dgn.png'),
  img_logo: require('../../assets/icon.png'),
  img_food: require('../../assets/images/food.jpg'),
  img_travel: require('../../assets/images/travel.jpg'),

  html5Entities: new Html5Entities(),
  layout: {
    left_thumb: "classic",
    right_thumb: "right_thumb",
    grid_thumb: "grid",
    card_thumb: "card"
  }
}

export const Animation = {
  bounce: 'bounce',
  flash: "flash",
  jello: "jello",
  pulse: "pulse",
  rotate: "rotate",
  rubberBand: "rubberBand",
  shake: "shake",
  swing: "swing",
  tada: "tada",
  wobble: "wobble",
  flipInY: "flipInY",
  flipInX: "flipInX",
  zoomIn: "zoomIn",
  fadeIn: "fadeIn",
  bounceIn: "bounceIn"
}

export const Device = {
  /* ORIGIN DEVICE SIZE */
  width: width,
  height: height,
  headerHeight: heightPercentageToDP('7%'),

  /* SCALE WITH DEVICE SIZE */
  w_scale: widthPercentageToDP,
  h_scale: heightPercentageToDP,
  fS: getFontSize,
  OS,
  getBorderRadius: getBorderRadius,
  s: Dimensions.get('window').width / STANDARD_SIZE.width,
  fS,
  bR,
  sH,
  pH,
  sW,

  /* FONTS */
  fontBold: 'Roboto-Bold',
  fontRegular: 'Roboto-Regular',
  fontLight: 'Roboto-Light',
  fontThin: 'Roboto-Thin',
  fontSlabBold: 'RobotoSlab-Bold',
  fontSlabRegular: 'RobotoSlab-Regular',
  fontSlabLight: 'RobotoSlab-Light',
  fontSlabThin: 'RobotoSlab-Thin',
  zsBodyLight: "SFCompactDisplay-Light",
  zsBodySemiBold: "SFCompactDisplay-Semibold",
  zsBodyMedium: "SFCompactDisplay-Medium"
}

export const String = {
  /* DRAWER */
  txtDrawerSection_1: 'Types',
  txtDrawerSection_2: 'Categories',
  txtDrawerSection_3: 'Other'
}

export const Key = {
  ASYNC_STORAGE_RATING: 'ASYNC_STORAGE_RATING',
  ASYNC_STORAGE_NUMBER_TO_RATING: 'ASYNC_STORAGE_NUMBER_TO_RATING',
  ASYNC_STORAGE_BOOKMARK: 'ASYNC_STORAGE_BOOKMARK',
  ASYNC_STORAGE_SETTINGS: 'ASYNC_STORAGE_SETTINGS',
  ASYNC_STORAGE_SETTINGS_V2: 'ASYNC_STORAGE_SETTINGS_V2',
  AS_DATA_USER: "AS_DATA_USER",
  AS_DATA_USER_APPLE: "AS_DATA_USER_APPLE",
  AS_DATA_JWT: "AS_DATA_JWT",
  AS_DATA_LANGUAGE: "AS_DATA_LANGUAGE",
  AS_DATA_SETTING_APP: "AS_DATA_SETTING_APP",
  AS_DATA_SETTING_WOO: "AS_DATA_SETTING_WOO",
  AS_DATA_SETTING_SHIPPING_ZONES: "AS_DATA_SETTING_SHIPPING_ZONES",
  AS_DATA_SETTING_PAYMENT: "AS_DATA_SETTING_PAYMENT",
  AS_DATA_SETTING_HOME: "AS_DATA_SETTING_HOME",
  AS_DATA_SETTING_CATE_PRODUCT: "AS_DATA_SETTING_CATE_PRODUCT",
  AS_DATA_SETTING_CATE_NEWS: "AS_DATA_SETTING_CATE_NEWS",
  AS_DATA_CART: "AS_DATA_CART",
  AS_DATA_HISTORY_SEARCH: "AS_DATA_HISTORY_SEARCH",
  AS_APP_INTRO: "AS_APP_INTRO",
  AS_APP_RATING: "AS_APP_RATING",
  AS_NUMBER_TO_RATING: "AS_NUMBER_TO_RATING",

  AS_DATA_DEMO_API_CUSTOM: "AS_DATA_DEMO_API_CUSTOM",
  AS_DATA_DEMO_API_CHOOSE: "AS_DATA_DEMO_API_CHOOSE",

  AS_NEWS_BOOKMARK: "AS_NEWS_BOOKMARK",

  KEY_HOME_LATEST_PRODUCT: 'zs_woo_latest_products',
  KEY_HOME_CATEGORIES: 'zs_woo_categories',
  KEY_HOME_COUPONS: 'zs_woo_coupons',
  KEY_HOME_FEATURED_POSTS: 'zs_featured_posts',
  KEY_HOME_LATEST_POSTS: 'zs_latest_posts',
  KEY_HOME_BANNERS: "zs_woo_banners",
  KEY_HOME_FEATURED_PRODUCT: 'zs_woo_featured_products',

  LOAD_MORE: "LOAD_MORE",
  REFRESH: "REFRESH",

  KEY_POST_VIDEO_YOUTUBE: 'KEY_POST_VIDEO_YOUTUBE',

  KEY_ALLOW_GUEST_CHECKOUT: "woocommerce_enable_guest_checkout",

}

export let ArrayBookmark = [];

export const Languages = Object.assign({},
  { en },
  { vi },
  { es },
  { pt },
  { ru },
  { fr }
);

export function isIphoneX() {
  const dim = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}
export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}
export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}
