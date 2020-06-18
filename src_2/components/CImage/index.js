/**
 * @Description: Hashtag of all Screens
 * @Created by ZiniTeam
 * @Date create: 09/01/2019
 */
/** LIBRARY */
import React from 'react';
import { Image } from "react-native";
/** COMMON */
import { Color, Config } from '../../config';

class CImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _src: null
    }
  }

  /** FUNCTIONS */
  _onError = () => {
    console.log('CImage - Load error')
    this.setState({ _src: Config.img_broken });
  }

  /** RENDER */
  render() {
    let { _src } = this.state;
    let { style, resizeMode, src } = this.props;

    return (
      <Image style={style}
        defaultSource={Config.img_broken}
        source={_src ? _src : src}
        resizeMode={resizeMode ? resizeMode : 'cover'}
        onError={this._onError}
      />
    )
  }
}

export default CImage;
