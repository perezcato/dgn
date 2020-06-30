
/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
**/
/* LIBRARY */
import React from 'react';
import { Root, Tab } from "native-base";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-fontawesome-pro';
/** COMPONENTS */
import CText from '~/components/CText';
/** SCREENS */
import RadioScreen from "~/screens/radio";
import HomeScreen from '~/screens/home'
import VideoScreen from '~/screens/video';
import IntroScreen from '~/screens/intro';
import BookmarkScreen from '~/screens/bookmark';
import PostScreen from '~/screens/post';
import GalleryScreen from '~/screens/gallery';
import SearchScreen from '~/screens/search';
import CategoriesScreen from '~/screens/categories';
import SubCategoriesScreen from '~/screens/categories/sub';
import TagScreen from '~/screens/tags'
import ContactScreen from '~/screens/contact';
import PageScreen from '~/screens/pages';
import ContactFormScreen from '~/screens/contact_form';
import AuthorScreen from '~/screens/author';
import ListCategoriesScreen from '~/screens/categories/list_categories';
import DemoScreen from '~/screens/demo';
import LinkDemoScreen from '~/screens/demo/link';
import CommentScreen from '~/screens/comment';
import AppIntroScreen from '~/screens/app_intro';
/** COMMON */
import { Colors } from '~/utils/colors';
import { commonFonts } from '~/utils/styles';
import CookieScreen from "~/screens/cookie_policy";
import AboutUs from "~/screens/about_us";


/** INIT NAVIGATOR OF APP */
const StackMain = createStackNavigator();
const TabMain = createBottomTabNavigator();

export class RootTab extends React.Component {

  /** RENDER */
  render() {
    return (
      <TabMain.Navigator
        initialRouteName={'home'}
        headerMode={'none'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'home';
            switch (route.name) {
              case 'listCategories':
                iconName = 'list-ul';
                break;
              case 'bookmark':
                iconName = 'bookmark';
                break;
            }
            return <Icon name={iconName} size={size} color={color} type={focused ? 'solid' : 'light'} />
          },
          tabBarLabel: ({ focused, color, size }) => {
            let title = 'HOME';
            switch (route.name) {
              case 'listCategories':
                title = 'CATEGORIES';
                break;
              case 'bookmark':
                title = 'BOOKMARK';
                break;
            }
            return <CText style={[commonFonts.super_small, focused && { color }]} i18nKey={title} />
          }
        })}
        tabBarOptions={{
          activeTintColor: Colors.cloHeadline,
          inactiveTintColor: Colors.PLACEHOLDER_COLOR,
        }}
      >
        <TabMain.Screen name="home" component={HomeScreen} />
        <TabMain.Screen name="listCategories" component={ListCategoriesScreen} />
        <TabMain.Screen name="bookmark" component={BookmarkScreen} />
      </TabMain.Navigator>
    )
  }
}

class RootMain extends React.Component {
  /** RENDER */
  render() {
    return (
      <Root>
        <StackMain.Navigator
          initialRouteName={this.props.initRoute}
          headerMode={'none'}>
          <StackMain.Screen name="intro" component={IntroScreen} />
          <StackMain.Screen name="RootTab" component={RootTab} />
          <StackMain.Screen name="post" component={PostScreen} />
          <StackMain.Screen name="video" component={VideoScreen} />
          <StackMain.Screen name="gallery" component={GalleryScreen} />
          <StackMain.Screen name="search" component={SearchScreen} />
          <StackMain.Screen name="subCategories" component={SubCategoriesScreen} />
          <StackMain.Screen name="tag" component={TagScreen} />
          <StackMain.Screen name="contact" component={ContactScreen} />
          <StackMain.Screen name="page" component={PageScreen} />
          <StackMain.Screen name="author" component={AuthorScreen} />
          <StackMain.Screen name="contactForm" component={ContactFormScreen} />
          <StackMain.Screen name="category" component={CategoriesScreen} />
          <StackMain.Screen name="demo" component={DemoScreen} />
          <StackMain.Screen name="linkDemo" component={LinkDemoScreen} />
          <StackMain.Screen name="comment" component={CommentScreen} />
          <StackMain.Screen name="appIntro" component={AppIntroScreen} />
          <StackMain.Screen name="radio" component={RadioScreen} />
          <StackMain.Screen name="cookie" component={CookieScreen} />
          <StackMain.Screen name="about" component={AboutUs} />
        </StackMain.Navigator>
      </Root>
    )
  }
}

export default RootMain;

