/**
 * @Description: Custom Component Connection 
 * @Created by ZiniTeam
 * @Date create: 10/01/2019
 */
/** LIBRARY */
import React from 'react';
import { Text, Animated } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
/** COMMON */
import { Device, Languages, Config } from '~/config';
/** REDUX ACTIONS */
import * as checkConnectionActions from '~/redux/actions/connection';

const barHeight = 60 * Device.s;

/** CLASSES */
class CConnection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _connected: true
    }
    this.animatedValue = new Animated.Value(0);
    this._init = {
      LANG_CONNECT_FAILED: Languages[Config.lang].CONNECTION_FAILED
    }
  }

  /** FUNCTIONS */
  _animate = () => {
    this.setState({ _connected: false });
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 300
      }
    ).start(() => {
      if (this.props.status) {
        this._reverseAnimate()
      }
    });
  }

  _reverseAnimate = () => {
    this.setState({ _connected: true });
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 300
      }
    ).start();
  }

  _handleNetInfo = (isConnected) => {
    isConnected ? this._reverseAnimate() : this._animate()
    isConnected ?
      this.props.checkConnectionActions.updateNetStatus(true) :
      this.props.checkConnectionActions.updateNetStatus(false)
  }

  /** LIFE CYCLE */
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleNetInfo);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleNetInfo);
  }

  /** RENDER */
  render() {
    let { _connected } = this.state;

    if (!_connected) {
      return (
        <Animated.View
          style={[{
            position: 'absolute',
            top: 0,
            left: 0,
            height: Device.height,
            width: Device.width,
            backgroundColor: 'rgba(255,255,255,.7)',
            opacity: this.animatedValue
          }]}
        >
          <Text style={styles.note}>
            {this._init.LANG_CONNECT_FAILED}
          </Text>
        </Animated.View>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.connection.connection
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkConnectionActions: bindActionCreators(checkConnectionActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CConnection)

const styles = {
  note: {
    fontSize: 18 * Device.s,
    fontFamily: Device.fontSlabBold,
    textAlign: 'center',
    marginTop: 20,
    color: "red"
  }
};
