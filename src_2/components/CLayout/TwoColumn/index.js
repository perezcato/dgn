/** LIBRARY */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
/** COMPONENT */
import Item from '~/components/CItem';
/** COMMON */
import { Device, Config } from '~/config';
/** STYLES */
import style from './style';
import { Colors } from '~/utils/colors';

class TwoColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data, hasTitle, hasIcon, icNameOfGroup, icCloOfGroup } = this.props;
    console.log('data', data)
    return (
      <View style={this.props.style}>
        {hasTitle && data.title != undefined && data.title != '' &&
          <View style={[style.title_wrapper, { marginLeft: Config.layout_offset.left }, !hasIcon ? { borderWidth: 0, borderLeftColor: 'black', borderLeftWidth: 3 } : {}]}>
            {hasIcon &&
              <Icon name={icNameOfGroup} size={Device.s * 30} color={Colors.cloHeadline != '' ? Colors.cloHeadline : icCloOfGroup} type={'regular'} />
            }
            <Text style={[style.title, Colors.cloHeadline != '' ? { color: Colors.cloHeadline } : {}]}>{data.title.toUpperCase()}</Text>
          </View>
        }
        {data.arrItems && data.arrItems.length > 0 &&
          <FlatList contentContainerStyle={{ paddingHorizontal: Config.layout_offset.left, marginVertical: Config.layout_offset.vertical }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            data={data.arrItems}
            renderItem={({ item, index }) => {
              return (
                <View style={style.item_wrapper}>
                  <Item data={item} twoColumn={true} />
                </View>
              )
            }}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        }
        {data && data.length > 0 &&
          <FlatList contentContainerStyle={{ paddingHorizontal: Config.layout_offset.left, marginVertical: Config.layout_offset.vertical }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            data={data.arrItems}
            renderItem={({ item, index }) => {
              return (
                <View style={style.item_wrapper}>
                  <Item data={item} twoColumn={true} />
                </View>
              )
            }}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        }
      </View>
    )
  }
}

TwoColumn.defaultProps = {
  hasTitle: true,
  hasIcon: false,
  icNameOfGroup: '',
  icCloOfGroup: 'black'
}

export default function (props) {
  const navigation = useNavigation();

  return <TwoColumn {...props} navigation={navigation} />;
}
