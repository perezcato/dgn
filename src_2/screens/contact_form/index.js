/**
 * @Description: Contact Form Screen
 * @Created by ZiniTeam
 * @Date create: 02/01/2019
 */
/** LIBRARY */
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-fontawesome-pro';

/** COMPONENT */
import CInput from '~/components/CInput';

/** STYLES */
import contactFormStyle from './style';


class ContactFormScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={contactFormStyle.container}>
				{/* Contact Form Header */}
				<View style={contactFormStyle.header_container}>
					<View style={contactFormStyle.header_statusBar} />
					{/* HEADER CONTENT */}
					<View style={contactFormStyle.header_content}>
						<TouchableOpacity style={contactFormStyle.container_left_header} onPress={this._onPressBack}>
							<Icon name={'chevron-left'} size={25} color={'black'} type={'light'} />
						</TouchableOpacity>

						<Text style={contactFormStyle.title_page}>Feed back</Text>

						<TouchableOpacity style={contactFormStyle.container_right_header} onPress={this._onPressSend}>
							<Text style={contactFormStyle.btn_send}>Send</Text>
						</TouchableOpacity>
					</View>
				</View>

				<ScrollView style={contactFormStyle.content}>
					<View style={contactFormStyle.item_row}>
						<CInput 
							placeholder={'To:'}
							style={contactFormStyle.input_form}
							value={''}
						/>
					</View>
					<View style={contactFormStyle.item_row}>
						<CInput 
							placeholder={'Cc:'}
							style={contactFormStyle.input_form}
							value={''}
						/>
					</View>
					<View style={contactFormStyle.item_row}>
						<CInput 
							placeholder={'Bcc:'}
							style={contactFormStyle.input_form}
							value={''}
						/>
					</View>
					<View style={contactFormStyle.item_row}>
						<CInput 
							placeholder={'Subject:'}
							style={contactFormStyle.input_form}
							value={''}
						/>
					</View>
					<View style={[contactFormStyle.item_row,{borderBottomWidth: 0}]}>
						<CInput 
							placeholder={'Content:'}
							style={contactFormStyle.input_form}
							value={''}
							multiline={true}
						/>
					</View>
				</ScrollView>
			</View>
		)
	}

	/**
	 * Functions
	 */
	_onPressBack = () => {
		this.props.navigation.navigate('contact');
	}

	_onPressSend = () => {
		this.props.navigation.goBack();
	}
}

export default ContactFormScreen;
