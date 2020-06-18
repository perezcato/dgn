/**
 * @Description: CCarousel
 * @Created by ZiniTeam
 * @Date create: 11/01/2019
 */
/** LIBRARY */
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-fontawesome-pro';
/** COMPONENTS */
import SliderEntry from './SliderEntry';
/** COMMON */
import { Config, Device } from '~/config';
/** STYLES */
import style from './style';
import style_slider_entry from './style_slider_entry';
import { sliderWidth, itemWidth } from './style_slider_entry';
import { Colors } from '~/utils/colors';

/** CLASSES */
class CCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  /** FUNCTIONS */
  _getMedia = async () => {
    let { data } = this.props, y;
    if (data.arrItems.length > 0) {
      for (y in data.arrItems) {
        if (data.arrItems[y].thumbnail) {
          data.arrItems[y].thumbnail = data.arrItems[y].thumbnail.sizes.large;
        }
        
        //data.arrItems[y].thumbnail = data.arrItems[y].thumbnail.sizes.medium; // Can try with large img
      }

    }
    this.setState({ ready: true })
  }

  /** OTHER RENDER */
  _renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        hasIcon={true}
        even={false}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    )
  }

  /** RENDER */
  render() {
    let { refreshing, data, hasTitle, hasIcon, icNameOfGroup, icCloOfGroup, autoplay } = this.props;
    let { ready } = this.state;
    let text_headline_color = Colors.cloHeadline;

    return (
      <View style={this.props.style}>
        {hasTitle && data.title != '' &&
          <View style={[style.title_wrapper, !hasIcon ? { borderWidth: 0, borderLeftColor: 'black', borderLeftWidth: 3 } : {}]}>
            {hasIcon &&
              <Icon name={icNameOfGroup} size={Device.s * 30} color={icCloOfGroup} type={'regular'} />
            }
            <Text style={[style.title, text_headline_color != '' ? { color: text_headline_color } : {}]}>{data.title.toUpperCase()}</Text>
          </View>
        }

        {(ready && !refreshing) ?
          <Carousel
            data={data.arrItems}
            renderItem={this._renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            layout={'default'}
            firstItem={1}
            autoplay={autoplay}
            autoplayInterval={3000}
            loop={true}
            loopClonesPerSide={1}
            inactiveSlideScale={0.92}
            inactiveSlideOpacity={0.2}
            containerCustomStyle={style_slider_entry.slider}
            contentContainerCustomStyle={style_slider_entry.sliderContentContainer}
            hasParallaxImages={true}
            useScrollView={true}
          />
          :
          <ActivityIndicator style={{ height: Device.s * 50, justifyContent: 'center' }} size={'small'} />
        }
      </View>
    )
  }

  /** LIFE CYCLE */
  componentDidMount = () => {
    this._getMedia();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ready) {
      if (prevProps.refreshing && !this.props.refreshing) {
        this.setState({ ready: false });
        this._getMedia();
      }
    }
  }
}

CCarousel.defaultProps = {
  refreshing: false,
  hasTitle: true,
  hasIcon: false,
  icNameOfGroup: '',
  icCloOfGroup: 'black',
  autoplay: true
}

export default CCarousel;
