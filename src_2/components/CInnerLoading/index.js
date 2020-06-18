/**
 * @Description: Loading layout
 * @Created by ZiniTeam
 * @Date create: 14/11/2018
 */
import React from 'react';
import { View, Image } from 'react-native';
/** COMMON */
import { Config, Device } from '~/config';

class CInnerLoading extends React.PureComponent {
  render() {
    let _style = this.props.style;

    return (
      <View style={[{ height: Device.height, width: Device.width, alignItems: 'center', justifyContent: 'center' }, _style ? _style : {}]}>
        <Image
          style={{ height: Device.w_scale('5%'), width: Device.w_scale('10%') }}
          resizeMode={'cover'}
          source={Config.ico_loading}
        />
      </View>
    )
  }
}

export default CInnerLoading;