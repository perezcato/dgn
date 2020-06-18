import React from 'react';
import { ScrollView, Animated, RefreshControl } from 'react-native';

export default class CScrollView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _scrollY: new Animated.Value(0),
    }
  }

  /** FUNCTIONS */
  _isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  _loadMoreData = async () => {
    if (this.props.loadMore) {
      this.props.loadMore();
    }
  }

  /** RENDER */
  render() {
    let { style, refreshing, onRefresh } = this.props;

    return (
      <ScrollView ref="scrScroll" style={[{ flex: 1, flexDirection: 'column' }, style ? style : {}]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state._scrollY } } }],
          {
            listener: event => {
              if (this._isCloseToBottom(event.nativeEvent)) {
                this._loadMoreData()
              }
            }
          }
        )}
        onMomentumScrollEnd={({ nativeEvent }) => {
          if (this._isCloseToBottom(nativeEvent)) {
            this._loadMoreData()
          }
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        keyboardShouldPersistTaps={'handled'}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}