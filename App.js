/**
 * @Description: App Main
 * @Created by ZiniTeam
 * @Date create: 14/01/2019
 */
/** LIBRARY */
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import 'rxjs';
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

import  PushNotification  from 'react-native-push-notification';

class App extends React.Component {
  constructor(props) {
    super(props);
    configureFontAwesomePro('light');

    /*push Notifications*/
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
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

      requestPermissions: true,
    });
  }
  /** RENDER */
  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <View style={commonStyles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#940a0a'} translucent={false} />
            <RootNavigator />
            <CConnection />
          </View>
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;
