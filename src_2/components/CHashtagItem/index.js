
/**
 * @Description: Hashtag of all Screens
 * @Created by ZiniTeam
 * @Date create: 09/01/2019
 */
/** LIBRARY */
import React from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
/** STYLES **/
import styles from './style';

class HashTagItem extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	/** FUNCTIONS */
	_onPress = () => {
		this.props.navigation.navigate('tag', {
			id: this.props.id,
			name: this.props.name
		});
	}

	/** RENDER */
	render() {
		let { name, style } = this.props;

		return (
			<TouchableOpacity style={[styles.container_hashtag_item, (style ? style : {})]}
				onPress={this._onPress}>
				<Text style={styles.txt_hashtag_item}>#{name}</Text>
			</TouchableOpacity>
		)
	}
}

export default function (props) {
	const navigation = useNavigation();
	return <HashTagItem {...props} navigation={navigation} />;
}