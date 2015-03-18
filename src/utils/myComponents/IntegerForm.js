'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		onPressEnter: React.PropTypes.func,
		placeholder: React.PropTypes.string,
		value: React.PropTypes.number
	},
	onChange(e) {
		var num = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
		this.props.onChange(num);
	},
	onKeyPress(e){
		if(e.which === 13 && this.props.onPressEnter){
			this.props.onPressEnter();
			this.props.onChange(0);
		}
	},
	render() {
		return (
			<input type="text"
			className="form-control"
			value={this.props.value}
			onKeyPress={this.onKeyPress}
			placeholder={this.props.placeholder}
			onChange={this.onChange}
			/>
		);
	}
});
