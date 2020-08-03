/**
 * @Description: App Main
 * @Created by ZiniTeam
 * @Date create: 14/01/2019
 */
/** LIBRARY */
if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

import "rxjs";
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { configureFontAwesomePro } from "react-native-fontawesome-pro";
import { NavigationContainer } from '@react-navigation/native';

/** REDUX */
import store from '~/redux/store';
import { Colors } from '~/utils/colors';
import { commonStyles } from '~/utils/styles';
/** COMPONENT */
import RootNavigator from '~/navigator/RootNavigator';
import CConnection from '~/components/CConnection';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import firebase from 'react-native-firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    configureFontAwesomePro('light');

    const messaging = firebase.messaging();

    messaging
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          messaging
            .getToken()
            .then(token => {
              console.log(token);
            })
            .catch(error => {
              /* handle error */
            });
        } else {
          messaging
            .requestPermission()
            .then(() => {
              /* got permission */
            })
            .catch(error => {
              /* handle error */
            });
        }
      })
      .catch(error => {
        /* handle error */
      });

    firebase.notifications().onNotification(notification => {
      const { title, body } = notification;
      PushNotification.localNotification({
        title: title,
        message: body, // (required)
      });
    });

    /*push Notifications*/
    PushNotification.configure({
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function(notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      senderID: '88297451036',
      requestPermissions: true,
    });
  }

  /*componentDidMount(): void {
    PushNotificationIOS.presentLocalNotification({
      alertBody: "The message displayed in the notification alert",
      alertTitle: "The message displayed in the notification alert",
      alertAction: "view",
    });
  }*/

  /** RENDER */
  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <View style={commonStyles.container}>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor={'#940a0a'}
              translucent={false}
            />
            <RootNavigator />
            <CConnection />
          </View>
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;
