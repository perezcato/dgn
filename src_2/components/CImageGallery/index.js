/**
 * @Description: Post screen
 * @Created by ZiniTeam
 * @Date create: 14/01/2019
 */
/* LIBRARY */
import React from 'react';
import { View, Text } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
/** COMMON **/
import { Device } from '~/config';
/** COMPONENTS **/
import CImage from '~/components/CImage';
import Lightbox from '~/components/CPopup/Lightbox';

const TYPE_GALARY = {
  ONE_PIC: 1,
  TWO_PIC: 2,
  THREE_PIC: 3,
}
const SPRING_CONFIG = {
  TENSION: 1000000,
  FRICTION: 1000000
}

class CImageGallery extends React.PureComponent {
  constructor(props) {
    super(props);
    this._id = props.id;
    this._data = props.data;
    this._photoCount = props.photoCount;
  }

  /** RENDER */
  render() {
    console.log(this.props.data)
    let _randomTypeShow = -1;
    if (this._photoCount == 2) _randomTypeShow = Math.floor(Math.random() * 3);
    else if (this._photoCount >= 3) _randomTypeShow = Math.floor(Math.random() * 4);

    if (this._photoCount === TYPE_GALARY.ONE_PIC && _randomTypeShow === -1) { // 1 photo
      return (
        <Lightbox
          style={{ marginVertical: 20, marginHorizontal: 10 }}
          underlayColor={'black'}
          springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
          swipeToDismiss={false}
          renderContent={() =>
            <RenderSwiper
              data={this._data}
              curIndex={0}
            />
          }
        >
          <CImage
            style={{ height: Device.h_scale('50%'), width: '100%', padding: Device.s * 5, borderRadius: Device.s * 10, overflow: 'hidden' }}
            src={{ uri: this._data[0].image.sizes.medium_large }}
            resizeMode={'cover'}
          />
        </Lightbox>
      )
    } else if (this._photoCount === TYPE_GALARY.TWO_PIC && _randomTypeShow === 0) { // 2 photo horizontal
      return (
        <View style={{ flexDirection: 'row', height: Device.h_scale('50%'), justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 10 }}>
          <Lightbox
            style={{ height: '100%', width: '49.5%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={0}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[0].image.sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <Lightbox
            style={{ height: '100%', width: '49.5%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={1}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[1].image.sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>
        </View>
      )
    } else if (this._photoCount === TYPE_GALARY.TWO_PIC && _randomTypeShow === 1) { // 2 photo vertical
      return (
        <View style={{ flexDirection: 'column', height: Device.h_scale('50%'), justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 10 }}>
          <Lightbox
            style={{ height: '49.5%', width: '100%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={0}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[0].image.sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <Lightbox
            style={{ height: '49.5%', width: '100%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={1}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[1].image.sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>
        </View>
      )
    } else if (this._photoCount === TYPE_GALARY.TWO_PIC && _randomTypeShow === 2) { // 2 photo square
      return (
        <View style={{ flexDirection: 'row', height: Device.h_scale('25%'), justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 10 }}>
          <Lightbox
            style={{ height: '100%', width: '49.5%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={0}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[0].image.sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <Lightbox
            style={{ height: '100%', width: '49.5%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={1}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[1].image.sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>
        </View>
      )
    } else if (this._photoCount >= TYPE_GALARY.THREE_PIC && _randomTypeShow === 0) { // 3 photo vertical with frist photo is large
      return (
        <View style={{ flexDirection: 'row', height: Device.h_scale('50%'), justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 10 }}>
          <Lightbox
            style={{ height: '100%', width: '68%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={0}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[0].image.sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <View style={{ height: '100%', width: '31%', justifyContent: 'space-between' }}>
            <Lightbox
              style={{ height: '49.5%', width: '100%' }}
              underlayColor={'black'}
              springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
              swipeToDismiss={false}
              renderContent={() =>
                <RenderSwiper
                  data={this._data}
                  curIndex={1}
                />
              }
            >
              <CImage
                style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
                src={{ uri: this._data[1].image.sizes.medium_large }}
                resizeMode={'cover'}
              />
            </Lightbox>

            <Lightbox
              style={{ height: '49.5%', width: '100%' }}
              underlayColor={'black'}
              springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
              swipeToDismiss={false}
              renderContent={() =>
                <RenderSwiper
                  data={this._data}
                  curIndex={2}
                />
              }
            >
              <CImage
                style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
                src={{ uri: this._data[2].image.sizes.medium_large }}
                resizeMode={'cover'}
              />
            </Lightbox>

            {this._photoCount > 3 &&
              <Lightbox
                style={{ borderRadius: Device.s * 10, backgroundColor: 'rgba(0,0,0,.5)', position: 'absolute', bottom: 0, height: '49.5%', width: '100%' }}
                underlayColor={'black'}
                springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
                swipeToDismiss={false}
                renderContent={() =>
                  <RenderSwiper
                    data={this._data}
                    curIndex={2}
                  />
                }
              >
                <View style={{ height: '100%', width: '100%', justifyContent: 'center', overflow: 'hidden' }}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: Device.fS(30), fontFamily: Device.fontSlabBold, color: 'white' }}>+{this._photoCount - 3}</Text>
                </View>
              </Lightbox>
            }
          </View>
        </View>
      )
    } else if (this._photoCount >= TYPE_GALARY.THREE_PIC && _randomTypeShow === 1) { // 3 photo horizontal,, with frist photo is large
      return (
        <View style={{ flexDirection: 'column', height: Device.h_scale('50%'), justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 10 }}>
          <Lightbox
            style={{ height: '68%', width: '100%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={0}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[0].image.sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <View style={{ flexDirection: 'row', height: '31%', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Lightbox
              style={{ height: '100%', width: '49.5%' }}
              underlayColor={'black'}
              springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
              swipeToDismiss={false}
              renderContent={() =>
                <RenderSwiper
                  data={this._data}
                  curIndex={1}
                />
              }
            >
              <CImage
                style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
                src={{ uri: this._data[1].sizes.medium_large }}
                resizeMode={'cover'}
              />
            </Lightbox>

            <Lightbox
              style={{ height: '100%', width: '49.5%' }}
              underlayColor={'black'}
              springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
              swipeToDismiss={false}
              renderContent={() =>
                <RenderSwiper
                  data={this._data}
                  curIndex={2}
                />
              }
            >
              <CImage
                style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
                src={{ uri: this._data[2].sizes.medium_large }}
                resizeMode={'cover'}
              />
            </Lightbox>

            {this._photoCount > 3 &&
              <Lightbox
                style={{ borderRadius: Device.s * 10, backgroundColor: 'rgba(0,0,0,.5)', position: 'absolute', right: 0, height: '100%', width: '49.5%' }}
                underlayColor={'black'}
                springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
                swipeToDismiss={false}
                renderContent={() =>
                  <RenderSwiper
                    data={this._data}
                    curIndex={2}
                  />
                }
              >
                <View style={{ height: '100%', width: '100%', justifyContent: 'center', overflow: 'hidden' }}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: Device.fS(30), fontFamily: Device.fontSlabBold, color: 'white' }}>+{this._photoCount - 3}</Text>
                </View>
              </Lightbox>
            }
          </View>
        </View>
      )
    } else if (this._photoCount >= TYPE_GALARY.THREE_PIC && _randomTypeShow === 2) { // 3 photo horizontal and square
      return (
        <View style={{ flexDirection: 'row', height: Device.h_scale('50%'), justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 10 }}>
          <Lightbox
            style={{ height: '100%', width: '49.5%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={0}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[0].image.sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <View style={{ height: '100%', width: '49.5%', justifyContent: 'space-between' }}>
            <Lightbox
              style={{ height: '49.5%', width: '100%' }}
              underlayColor={'black'}
              springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
              swipeToDismiss={false}
              renderContent={() =>
                <RenderSwiper
                  data={this._data}
                  curIndex={1}
                />
              }
            >
              <CImage
                style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
                src={{ uri: this._data[1].sizes.medium_large }}
                resizeMode={'cover'}
              />
            </Lightbox>

            <Lightbox
              style={{ height: '49.5%', width: '100%' }}
              underlayColor={'black'}
              springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
              swipeToDismiss={false}
              renderContent={() =>
                <RenderSwiper
                  data={this._data}
                  curIndex={2}
                />
              }
            >
              <CImage
                style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
                src={{ uri: this._data[2].sizes.medium_large }}
                resizeMode={'cover'}
              />
            </Lightbox>

            {this._photoCount > 3 &&
              <Lightbox
                style={{ borderRadius: Device.s * 10, backgroundColor: 'rgba(0,0,0,.5)', position: 'absolute', bottom: 0, height: '49.5%', width: '100%' }}
                underlayColor={'black'}
                springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
                swipeToDismiss={false}
                renderContent={() =>
                  <RenderSwiper
                    data={this._data}
                    curIndex={2}
                  />
                }
              >
                <View style={{ height: '100%', width: '100%', justifyContent: 'center', overflow: 'hidden' }}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: Device.fS(30), fontFamily: Device.fontSlabBold, color: 'white' }}>+{this._photoCount - 3}</Text>
                </View>
              </Lightbox>
            }
          </View>
        </View>
      )
    } else if (this._photoCount >= TYPE_GALARY.THREE_PIC && _randomTypeShow === 3) { // 3 photo vertical and square
      return (
        <View style={{ flexDirection: 'column', height: Device.h_scale('50%'), justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 10 }}>
          <Lightbox
            style={{ height: '49.5%', width: '100%' }}
            underlayColor={'black'}
            springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
            swipeToDismiss={false}
            renderContent={() =>
              <RenderSwiper
                data={this._data}
                curIndex={0}
              />
            }
          >
            <CImage
              style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
              src={{ uri: this._data[0].sizes.medium_large }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <View style={{ flexDirection: 'row', height: '49.5%', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Lightbox
              style={{ height: '100%', width: '49.5%' }}
              underlayColor={'black'}
              springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
              swipeToDismiss={false}
              renderContent={() =>
                <RenderSwiper
                  data={this._data}
                  curIndex={1}
                />
              }
            >
              <CImage
                style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
                src={{ uri: this._data[1].sizes.medium_large }}
                resizeMode={'cover'}
              />
            </Lightbox>

            <Lightbox
              style={{ height: '100%', width: '49.5%' }}
              underlayColor={'black'}
              springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
              swipeToDismiss={false}
              renderContent={() =>
                <RenderSwiper
                  data={this._data}
                  curIndex={2}
                />
              }
            >
              <CImage
                style={{ height: '100%', width: '100%', borderRadius: Device.s * 10, overflow: 'hidden' }}
                src={{ uri: this._data[2].sizes.medium_large }}
                resizeMode={'cover'}
              />
            </Lightbox>

            {this._photoCount > 3 &&
              <Lightbox
                style={{ borderRadius: Device.s * 10, backgroundColor: 'rgba(0,0,0,.5)', position: 'absolute', right: 0, height: '100%', width: '49.5%' }}
                underlayColor={'black'}
                springConfig={{ tension: SPRING_CONFIG.TENSION, friction: SPRING_CONFIG.FRICTION }}
                swipeToDismiss={false}
                renderContent={() =>
                  <RenderSwiper
                    data={this._data}
                    curIndex={2}
                  />
                }
              >
                <View style={{ height: '100%', width: '100%', justifyContent: 'center', overflow: 'hidden' }}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: Device.fS(30), fontFamily: Device.fontSlabBold, color: 'white' }}>+{this._photoCount - 3}</Text>
                </View>
              </Lightbox>
            }
          </View>
        </View>
      )
    } else { // other photo (do nothing)
      return null;
    }
  }
}

/**
 * SWIPER
 */
class RenderSwiper extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  /** RENDER */
  render() {
    let { data, curIndex } = this.props;

    return (
      <ViewPager initialPage={curIndex}>
        {data.map((item, index) =>
          <ItemSwiper
            key={'cImage' + index}
            data={item}
            length={data.length}
            pos={index}
          />
        )}
      </ViewPager>
    )
  }
}

/**
 * SWIPER ITEM
 */
class ItemSwiper extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  /** RENDER */
  render() {
    let { data } = this.props;

    return (
      <View style={{ position: 'relative' }}>
        <CImage
          src={{ uri: data.url }}
          resizeMode={'contain'}
          style={{ height: '100%', width: '100%' }}
        />
      </View>
    )
  }
}
export default CImageGallery;
