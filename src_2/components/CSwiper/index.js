/** LIBRARY */
import React from 'react';
import { View, FlatList } from 'react-native';
/** COMPONENTS */
import Item from '~/components/CItem';
/** STYLES */
import style from './style';
import { Device } from '~/config';

export default class CSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _activeIdx: 0
    }
  }

  render() {
    let { data, refreshing } = this.props;

    if (data.length > 0) {
      return (
        <View style={{ height: Device.width * 9 / 14, width: Device.width }}>
          <FlatList
            style={{ flex: 1 }}
            ref={(ref) => this.listRef = ref}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <Item data={item}
                  touchOpacity={1}
                  hasTitle={true}
                  hasIcon={false}
                  hasNoImages={false}
                  hasAgo={true}
                  flatImage={true}
                  borderRadius={false}
                  layoutCard
                  heightImage={Device.width * 9 / 14}
                  widthImage={Device.width} />
              )
            }}
            getItemLayout={(item, index) => (
              { length: Device.width, offset: Device.width * index, index }
            )}
            extraData={refreshing}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              let _activeIdx = event.nativeEvent.contentOffset.x ? event.nativeEvent.contentOffset.x / Device.width : 0;
              this.setState({ _activeIdx });
            }}
          />

          <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
            {this.viewDot(data, this.state._activeIdx)}
          </View>
        </View>
      )
    }
    return null;
  }

  componentDidMount() {
    if (this.props.autoScroll) {
      this.interval = setInterval(() => {
        let { _activeIdx } = this.state;
        let nextIndex = 0, maxSlider = this.props.data.length - 1;

        if (_activeIdx < maxSlider) {
          nextIndex = _activeIdx + 1;
        } else {
          nextIndex = 0;
        }

        this.scrollToIndex(nextIndex, true);
        this.setState({ _activeIdx: nextIndex });
      }, 4000);
    }
  }

  componentWillUnmount() {
    if (this.props.autoScroll) {
      clearInterval(this.interval);
    }
  }

  /**
   * Functions
   */
  scrollToIndex = (index, animated) => {
    this.listRef && this.listRef.scrollToIndex({ animated, index })
  }

  viewDot = (data, activeIdx) => {
    return (
      <FlatList
        style={{ marginTop: 10 }}
        data={data}
        renderItem={({ item, index }) =>
          <View style={index === activeIdx ? style.dotActive : style.dotUnactive} />
        }
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
    )
  }
}

CSwiper.defaultProps = {
  autoScroll: true
}