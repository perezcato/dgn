/** LIBRARY */
import React from 'react';
import { Text, View, Image, Modal, TouchableOpacity } from 'react-native';
/** COMMON */
import icApp from '~/../assets/icon.png';
/** STYLE */
import styles from './style';

class CRate extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  /** RENDER */
  render() {
    let { visible, onRequestClose, onOK } = this.props;

    return (
      <Modal
        visible={visible}
        animationType={'fade'}
        onRequestClose={onRequestClose}
        transparent
      >
        <TouchableOpacity style={styles.con_bg} onPress={onRequestClose} activeOpacity={1}>
          <View style={styles.con_modal}>
            <View style={styles.con_content}>
              <View style={styles.con_img}>
                <Image
                  style={styles.img}
                  source={icApp}
                  resizeMode={'contain'}
                />
              </View>

              <Text style={styles.txt_name_app}>{'DGN'}</Text>

              <Text style={styles.txt_des}>{'Rating for application?'}</Text>
            </View>

            <View style={styles.con_btn}>
              <TouchableOpacity style={styles.con_btn_left} onPress={onRequestClose}>
                <Text style={styles.txt_btn_left}>{'Remind me later'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.con_btn_right} onPress={onOK}>
                <Text style={styles.txt_btn_right}>{'Agree'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

export default CRate;