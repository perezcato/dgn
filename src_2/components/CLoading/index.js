/**
 * @Description: Loading layout
 * @Created by ZiniTeam
 * @Date create: 14/11/2018
 */
import React from 'react';
import {
  View
} from 'react-native';

import loadingStyle from './style';
import { Device } from '~/config';
import CInnerLoading from '~/components/CInnerLoading';


class CLoading extends React.PureComponent {
  render() {
    let { style } = this.props;
    return (
      <View style={[loadingStyle.container, style]}>
        <CInnerLoading style={{ position: 'absolute', height: Device.w_scale('29.33%') }} />
      </View>
    )
  }
}

export default CLoading;
