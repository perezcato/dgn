import React,{useRef} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View,ScrollView} from 'react-native';
import { WebView } from 'react-native-webview';
import {Config, Device, Languages} from "~/config";
import postStyle from "~/screens/post/style";
import {Body, Header, Left, Right, Title} from "native-base";
import Icon from "react-native-fontawesome-pro";
import ico_bars from "../../../assets/icons/ico_bars.png";
import {commonStyles} from "~/utils/styles";
import headerStyle from "~/components/CHeader/style";
import CLoading from "~/components/CLoading";


const AboutUs = (props) => {
  const webView = useRef(null);
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Header hasSegment style={{
        backgroundColor: '#940a0a',
        height: Device.h_scale('10%')
      }} transparent iosBarStyle={'light-content'}
              androidStatusBarColor={'#940a0a'} translucent={false}>
        <Left>
          <Icon name={ Config.ico_back} size={25} color={'#fff'} type={'light'} onPress={() => {
            props.navigation.navigate('home')
          }} />
        </Left>
        <Body style={commonStyles.column_align_center}>
          <Title>
            <Text style={headerStyle.txt_title} ellipsizeMode={"tail"} numberOfLines={1}>
              {'About Us'}
            </Text>
          </Title>
        </Body>
        <Right>
          {'post' === 'bookmark'&&
          <TouchableOpacity>
            <Text>{Languages[Config.lang].CLEAR_ALL}</Text>
          </TouchableOpacity>
          }
        </Right>
      </Header>
      <ScrollView style={
        {
          flex: 1,
          paddingLeft: 15,
          paddingRight: 15
        }
      }>

      </ScrollView>
    </SafeAreaView>
  )
};

export default AboutUs;
