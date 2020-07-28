
/* LIBRARY */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, ActivityIndicator, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
/* CONPONENT */
import AppContainer from './Root';
/* NAVIGATION */
import NavigationService from './NavigationService';
import firebase from 'react-native-firebase';
import Helpers from '~/utils/helpers';
/** COMMON */
import { Config, Key, Device, Assets } from '~/config';
import { commonStyles, commonFonts } from '~/utils/styles';
import { Colors } from '~/utils/colors';
import * as settingActions from '~/redux/actions/settings';
/** SERVICE */
import Services from '~/services';
/** INIT */
const Analytics = firebase.analytics();

class AppNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _loading: true
        }
        this._initRoute = "intro";
        Analytics.setAnalyticsCollectionEnabled(true);
    }

    /** FUNCTIONS */
    _checkPermission = async () => {
        let enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            if (Platform.OS === 'ios') {
                this._registerTokenFCM();
            } else this._getToken();
        }
        else this._requestPermission();
    }

    _requestPermission = async () => {
        try {
            await firebase.messaging().requestPermission();
            this._getToken();
        } catch (error) {
            console.log('Permission rejected');
        }
    }

    _getToken = async () => {
        let fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // Register token
            this._registerTokenFCM(fcmToken);
        } else this._requestPermission();
    }

    _registerTokenFCM = async (fcmToken = null) => {
        let token = '', os = '';
        if (!fcmToken) {
            await firebase.messaging().ios.registerForRemoteNotifications();
            token = await firebase.messaging().ios.getAPNSToken();
            if (token) {
                os = "iOS";
                let params = { os, token };
                await Services.FCMToken.register(params);
            }
        } else {
            token = fcmToken;
            os = "Android";
            let params = { os, token };
            await Services.FCMToken.register(params);
        }
    }

    /***************************/

    /** GET SETTINGS */
    _getSettings = async () => {
        let settingsV2 = await Services.Settings.getSettingV2();
        if (settingsV2) await Helpers.setAsyncStorageSettingsV2(JSON.stringify(settingsV2));
        else settingsV2 = await Helpers.getAsyncStorageSettingsV2();

        // let settings = await Services.Settings.getSetting();

        // if (settings) await Helpers.setAsyncStorageSettings(JSON.stringify(settings));
        // else settings = await Helpers.getAsyncStorageSettings();

        //Thanh Vo Added
        let homeSettings = await Services.Settings.getHomeSettings();
        console.log('homeSettings', homeSettings);

        let setting = {
            // settings,
            settingsV2,
            homeSettings
        }

        // if (settings) {
        //     console.log('outside')
        //     let appIntro = await Helpers.getDataStorage(Key.AS_APP_INTRO);
        //     if (appIntro && appIntro !== "") {
        //         // Do nothing
        //     } else {
        //         console.log('intro')
        //         this._initRoute = "Intro";
        //     }
        // }

        this._prepareSetting(setting);
    }

    _prepareSetting = async (setting) => {
        // Config.setting = setting.settings;
        Config.settingV2 = setting.settingsV2;
        Config.homeSettings = setting.homeSettings;

        if (setting.settingsV2.general.sizes) {
            if (setting.settingsV2.general.app_logo) { Config.ico_logo = setting.settingsV2.general.app_logo.sizes.medium }
            else { Config.ico_logo = Config.img_logo }
            if (setting.settingsV2.general.language) Config.lang = setting.settingsV2.general.language;

            if (setting.settingsV2.general.layout_width) {
                Config.layout_offset.left = (Device.width - Device.w_scale(setting.settingsV2.general.layout_width + '%')) / 2
                Config.layout_offset.right = (Device.width - Device.w_scale(setting.settingsV2.general.layout_width + '%')) / 2
            }
        }

        /** COLOR */
        if (setting.settingsV2 && setting.settingsV2.color) {
            Colors.cloBMActive = setting.settingsV2.color.bg_primary_color;
            Colors.cloHeadline = setting.settingsV2.color.text_headline_color;
            Colors.cloHeaderText = setting.settingsV2.color.text_header_color;
            Colors.cloBody = setting.settingsV2.color.text_body_color;
            Colors.cloBodyMeta = setting.settingsV2.color.text_body_meta_color;
            commonStyles.txt_title_button.color = setting.settingsV2.color.text_headline_color;
        }

        /** FONT */
        if (setting.settingsV2 && setting.settingsV2.typography) {
            commonStyles.txt_title_button.fontSize = setting.settingsV2.typography.font_headline_size
        }

        this.props.settingActions.fetchSettingsSuccess(setting);
        if (Config.settingV2) {
            this.setState({
                _loading: false
            })
            SplashScreen.hide();
        }

    }

    /** GET HOST API */
    _getHostApi = async () => {
        let api = await Helpers.getDataStorage(Key.AS_DATA_DEMO_API_CHOOSE);
        if (api && api !== "") {
            api = JSON.parse(api);
            Config.host = api.hostUrl
        } else {
            api = Config;
        }
    }
    /************************/

    /** LIFE CYCLE */
    componentdidupdate() {

    }

    async componentDidMount() {
        await this._getHostApi();
        // this._checkPermission();
        this._getSettings();
        // After having done stuff (such as async tasks) hide the splash screen
        this.createNotificationListeners();
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async createNotificationListeners() {

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            firebase.notifications().removeAllDeliveredNotifications();
        }

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            firebase.notifications().removeAllDeliveredNotifications();
        });



        const channel = new firebase.notifications.Android.Channel(
            'zapes-channel',
            'Zapes Channel',
            firebase.notifications.Android.Importance.Max
        ).setDescription('Zapes Channel');

        // Create the channel
        firebase.notifications().android.createChannel(channel);
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            // Process your notification as required
            notification
                .setSound('default')

                .android.setChannelId('zapes-channel')
                .android.setSmallIcon('ic_launcher')
                .android.setLargeIcon('ic_launcher')
                .android.setPriority(firebase.notifications.Android.Priority.High)
                .android.setBadgeIconType(firebase.notifications.Android.BadgeIconType.None)
                .android.setDefaults(firebase.notifications.Android.Defaults.All)

                .ios.setBadge(notification.ios.badge);

            firebase.notifications()
                .displayNotification(notification);

        });

        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {

        });
    }

    /** RENDER */
    render() {
        return (
            <View style={commonStyles.container}>
                {!this.state._loading &&
                    <AppContainer
                        ref={nav => {
                            this.navigator = nav;
                            NavigationService.setTopLevelNavigator(nav);
                        }}
                        uriPrefix="/app"
                        screenProps={this.props}
                        initRoute={this._initRoute}
                    />
                }
            </View>
        )
    }
}

const styles = {
    con_bg_loading: [commonStyles.full_center],

    img_logo: { height: Device.sH('100%'), width: Device.sW('100%') },

    con_loading: [commonStyles.center, { position: "absolute", bottom: Device.sH("20%"), right: 0, left: 0 }],
}

const mapStateToProps = state => {
    return {
        setting: state.setting
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        settingActions: bindActionCreators(settingActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
