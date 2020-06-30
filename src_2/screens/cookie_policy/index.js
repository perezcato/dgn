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


const CookieScreen = (props) => {
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
              {'Cookie Policy'}
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
        <Text style={{
          ...postStyle.txt_h4
        }}>
          For the purposes of this Cookies Policy:
        </Text>
        <Text style={{
          textAlign: 'justify',
          ...postStyle.txt_p_tag,
          marginTop: 5
        }}>
          Company (referred to as either "the Company", "We", "Us" or "Our" in this Cookies Policy) refers to
          Technation Ghana LLC, White Cross, Weija, Accra-Ghana .
          You means the individual accessing or using the Website, or a company, or any legal entity on behalf of
          which such individual is accessing or using the Website, as applicable.
          Cookies means small files that are placed on Your computer, mobile device or any other device by a website,
          containing details of your browsing history on that website among its many uses.
          Application refers to Daily Guide Network app/ website (https://dailyguidenetwork.com/)
        </Text>
        <Text style={{
          marginTop: 8,
          ...postStyle.txt_h4
        }}>
          Type of Cookies We Use
        </Text>
        <Text style={{
          ...postStyle.txt_p_tag,
          marginTop: 5,
          textAlign: 'justify'
        }}>
          Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or
          mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.

          We use both session and persistent Cookies for the purposes set out below:

          Necessary / Essential Cookies Type:  Session Cookies

          Administered by: Us

          Purpose: These Cookies are essential to provide You with services available through the Website and to enable
          You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts.
          Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies
          to provide You with those services.

          Functionality CookiesType: Persistent Cookies

          Administered by: Us

          Purpose: These Cookies allow us to remember choices You make when You use the Website/App, such as
          remembering your login details or language preference. The purpose of these Cookies is to provide You with a
          more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
        </Text>
        <Text style={{
          ...postStyle.txt_h4
        }}>
          Your Choices Regarding Cookies
        </Text>
        <Text style={{
          ...postStyle.txt_p_tag,
          marginTop: 5,
          textAlign: 'justify'
        }}>
          If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your
          browser and then delete the Cookies saved in your browser associated with this website. You may use this
          option for preventing the use of Cookies at any time.

          If You do not accept Our Cookies, You may experience some inconvenience in your use of the Application and
          some features may not function properly.

          If You'd like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the
          help pages of your web browser.

          For the Chrome web browser, please visit this page from Google: https://support.google.com/accounts/answer/32050
          For the Internet Explorer web browser, please visit this page from Microsoft: http://support.microsoft.com/kb/278835
          For the Firefox web browser, please visit this page from Mozilla: https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
          For the Safari web browser, please visit this page from Apple: https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
          For any other web browser, please visit your web browser's official web pages.
          More Information about Cookies

          You can learn more about cookies: All About Cookies.
        </Text>
        <Text style={{
          ...postStyle.txt_h4,
          marginTop: 5
        }}>
          Contact Us
        </Text>
        <Text style={{
          ...postStyle.txt_p_tag,
          marginTop: 5,
          textAlign: 'justify'
        }}>
          If you have any questions about this Cookies Policy, You can contact us:
          By phone number: (+233) 302 229 576
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
};

export default CookieScreen;
