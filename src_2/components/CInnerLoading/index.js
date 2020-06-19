/**
 * @Description: Loading layout
 * @Created by ZiniTeam
 * @Date create: 14/11/2018
 */
import React from 'react';
import { View, Image } from 'react-native';
import {ActivityIndicator} from 'react-native';
/** COMMON */
import { Config, Device } from '~/config';

class CInnerLoading extends React.PureComponent {
  render() {
    let _style = this.props.style;

    return (
      <View style={[{ height: Device.height, width: Device.width, alignItems: 'center', justifyContent: 'center' }, _style ? _style : {}]}>
        <ActivityIndicator size={'large'} color={'#940a0a'} />
      </View>
    )
  }
}

export default CInnerLoading;
