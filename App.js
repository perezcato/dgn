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


class App extends React.Component {
  constructor(props) {
    super(props);
    configureFontAwesomePro('light');
  }


  /** RENDER */
  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>

          <View style={commonStyles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.cloHeader} translucent={false} />

            <RootNavigator />

            <CConnection />
          </View>
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;
