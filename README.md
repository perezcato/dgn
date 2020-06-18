## CHANGE LOG

### V1.3.6:
> * Add OneSignal Notification

### V1.3.5 Hotfix:
> * Fix bug back on News detail
> * Change UI Homepage to origin UI
> * Optimize code

### V1.3.4:
> * Add notification (Send from wordpress backend)
> * Add HTML entities to remove key entities
> * Optimize code

### V1.3.3:
> * Custom Tab homepage color
> * Choose Tab homepage can show/hide on app
> * Fix choose multi language app from setting web

### V1.3.3:
> * Custom Tab homepage color
> * Choose Tab homepage can show/hide on app
> * Fix choose multi language app from setting web

### V1.3.2:
> * Fix support Youtube with format youtu.be
> * Fix settings privacy + term and condition from backend plugin
> * Fix crash app when has multi-categories 

### V1.3.1:
> * Add post audio module: Can play/pause audio with post type audio

### V1.3:
> * Support page builder 
> * Fix Tab homepage auto scroll to index when swipe
> * Add common plugins: popular posts + related post
> * Add rating module: generating and displaying interactive star ratings
> * Add author screen: Show information of author and popular posts
> * Optimize app perfomance x2 speed
> * Optimize category

### V1.2.5:
> * Update Fontawesome package token when installing
> * Fix bug when add new post with no feature image
> * Change Tab homepage to multi color
> * Fix splash screen
> * Fix bug feature image on post screen

### V1.2.4 Hotfix:
> * Fix bug show no data when gallery is empty
> * Add Interstitial Admob for post detail page
> * String translation when have no data

### V1.2.3 Hotfix:
> * Fix crash when open app on android >= 9.

### V1.2.2:
> * Fix bug featured image for video.

### V1.2.2:
> * Fix display empty layout when gallery has no data  
> * Fix text translation 

### V1.2.1:
> * Remove slide of category.
> * Add category description.
> * Apply setting for lastest posts on homepage: user can select layouts: Left Thumb, Right Thumb,  Grid Thumb, Card Thumb
> * Fix app performance.

### V1.2.0:
> * Change default image when load list posts.
> * Fix search function.
> * Fix scroll app to refresh on the home page.
> * Fix swiper action to delete bookmark items.
> * Add a gradient to layout two-column and carousel.

### V1.1.1 Hotfix
> * Fix WordPress Version >4.7: filter by post-format
> * Add video user guide on Youtube.

### V1.1.0
> * Add Firebase Push Notification
> * Add AdMob
> * Add Firebase Crashlytic
> * Bookmark page: Add to favorite
> * Fix UI icon
> * Fix the ratio of thumbnails on the homepage

### V1.0 Release initial version
> * Home page: Show featured posts and latest posts by categories. 
> * Category page: Show list of post by: Grid, List,... 
> * Article page: View WordPress post content.
> * Bookmark page: Add to favorite. 
> * Gallery page: Display gallery of images. 
> * Video page: View YouTube video on app.

## YOUTUBE VIDEOS
### Intro
<a href="http://www.youtube.com/watch?feature=player_embedded&v=PxFg-KzySew
" target="_blank"><img src="http://img.youtube.com/vi/PxFg-KzySew/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

### How to use
<a href="http://www.youtube.com/watch?feature=player_embedded&v=lRJBzo2Dvgc
" target="_blank"><img src="http://img.youtube.com/vi/lRJBzo2Dvgc/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## COMMANDLINE REFERS
### Export APK debug:
rm -rf android/app/build && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew assembleDebug

### Export APK Release:
cd android && ./gradlew assembleRelease

### Check Keystore cert:
keytool -list -keystore my-release.keystore