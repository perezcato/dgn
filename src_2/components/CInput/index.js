/** 
 * Layout text input
 * _placeholder_________________
 * 
*/
import React from 'react';
import { TextInput } from 'react-native';

class CInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: (props.value ? props.value : '')
		};
	}

	/** FUNCTIONS */
	_changeText = (text) => {
		if (this.props.afterChangeText) {
			this.props.afterChangeText(text);
		}
		this.setState({ text });
	}

	clear = () => {
		this.setState({ text: '' });
	}

	focus = () => {
		this.refs._inputRef.focus();
	}

	get value() {
		return this.state.text;
	}

	/** RENDER */
	render() {
		return (
			<TextInput {...this.props}
				ref={'_inputRef'}
				underlineColorAndroid={'transparent'}
				onChangeText={this._changeText}
				value={this.state.text}
			/>
		)
	}
}

export default CInput;