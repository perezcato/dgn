import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Config, Languages } from "~/config";
import postStyle from "~/screens/post/style";
import { Drawer } from "native-base";
import CDrawer from "~/components/CDrawer";
import styles from "~/screens/contact/style";
import CHeader from "~/components/CHeader";
/** LIBRARY */
import { connect } from 'react-redux';
/** COMMON */

/*const AboutUs = (props) => {
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
          Daily Guide Network, opposite Nima Police Station, Stephen Amartey Close, Nima Residential.
          You means the individual accessing or using the Website, or a company, or any legal entity on behalf of
          which such individual is accessing or using the Website, as applicable.
          Cookies means small files that are placed on Your computer, mobile device or any other device by a website,
          containing details of your browsing history on that website among its many uses.
          Application refers to Daily Guide Network app/ website (https://dailyguidenetwork.com/)
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
};

export default AboutUs;*/

class AboutUs extends React.Component {
  /** FUNCTIONS */
  _closeDrawer = () => {
    this._drawer && this._drawer._root.close();
  };

  _openDrawer = () => {
    this._drawer && this._drawer._root.open();
  };

  /** RENDER */
  render() {
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        content={
          <CDrawer
            navigation={this.props.navigation}
            onClose={this._closeDrawer}
          />
        }
        onClose={this._closeDrawer}
      >
        <View style={styles.container}>
          <CHeader
            title={Languages[Config.lang].ABOUT_US}
            onMenu={this._openDrawer}
            onClose={this._closeDrawer}
          />
          <ScrollView
            style={{
              flex: 1,
              padding: 15,
            }}
          >
            <Text
              style={{
                ...postStyle.txt_h2
              }}
            >
              {Languages[Config.lang].ABOUT_US}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                ...postStyle.txt_p_tag,
                marginTop: 5
              }}
            >
              The Daily Guide Network App is the official App for Daily Guide
              Newspaper. When you want to know what’s the latest news in Ghana,
              tap into the newsgathering power of DGN. With correspondents and
              bureaus reporting from across Ghana, no other news source even
              comes close. News contents are syndicated from
              www.dailyguidenetwork.com
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                ...postStyle.txt_p_tag,
                marginTop: 10
              }}
            >
              We are well-noted to be listener-focused
              with innovative on-air programs as you listen to guide radio live
              comprehensive news. Over the years, DGN has become known as a
              strong advocate for consumer issues, including road safety,
              sanitation, education, good health care, security and many more
            </Text>
          </ScrollView>
          {/*<View style={styles.content}>
            <View style={styles.logo_box}>
              <Image
                style={styles.logo}
                source={
                  this._logo ? { uri: this._logo } : Config.ico_logo_default
                }
                resizeMode={'contain'}
              />
            </View>
            <View style={styles.info}>
              {this.INIT.map((item, index) => {
                // console.log(item)
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.info_item}
                    onPress={item.onPress ? item.onPress : null}
                  >
                    <Icon
                      containerStyle={styles.iconItem}
                      name={item.IC_NAME}
                      size={20}
                      color={'black'}
                      type={'light'}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.text_info}>{item.info}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>*/}
        </View>
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    sideMenu: state.sideMenu
  };
};

export default connect(
  mapStateToProps,
  null
)(AboutUs);
