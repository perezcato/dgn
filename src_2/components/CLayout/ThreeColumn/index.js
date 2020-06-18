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

class ThreeColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data, hasTitle, hasIcon, icNameOfGroup, icCloOfGroup } = this.props;
    let text_headline_color = Colors.cloHeadline;

    return (
      <View style={this.props.style}>
        {hasTitle && data.title != undefined && data.title != '' &&
          <View style={[style.title_wrapper, { marginLeft: Config.layout_offset.left }, !hasIcon ? { borderWidth: 0, borderLeftColor: 'black', borderLeftWidth: 3 } : {}]}>
            {hasIcon &&
              <Icon name={icNameOfGroup} size={Device.s * 30} color={text_headline_color != '' ? text_headline_color : icCloOfGroup} type={'regular'} />
            }
            <Text style={[style.title, text_headline_color != '' ? { color: text_headline_color } : {}]}>{data.title.toUpperCase()}</Text>
          </View>
        }
        {data.arrItems &&
          <View style={[style.container, { paddingLeft: Config.layout_offset.left, paddingRight: Config.layout_offset.left / 2 }]}>
            <FlatList
              style={{ flex: 1 }}
              data={data.arrItems}
              renderItem={({ item, index }) => {
                return (
                  <View style={style.item_wrapper}>
                    <Item data={item} threeColumn={true} hideDes={true} hasTitle={false} hasAgo={false} />
                  </View>
                )
              }}
              numColumns={3}
              columnWrapperStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        }
        {data && data.length > 0 &&
          <View style={[style.container, { paddingLeft: Config.layout_offset.left, paddingRight: Config.layout_offset.left / 2, paddingTop: 0 }]}>
            <FlatList
              style={{ flex: 1 }}
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <View style={style.item_wrapper}>
                    <Item data={item} threeColumn={true} hideDes={true} hasTitle={false} hasAgo={false} />
                  </View>
                )
              }}
              numColumns={3}
              columnWrapperStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        }
      </View>
    )
  }
}

ThreeColumn.defaultProps = {
  hasTitle: true,
  hasIcon: false,
  icNameOfGroup: '',
  icCloOfGroup: 'black',
}

export default function (props) {
  const navigation = useNavigation();

  return <ThreeColumn {...props} navigation={navigation} />;
}