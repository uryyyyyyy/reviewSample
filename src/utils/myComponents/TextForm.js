'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		value: React.PropTypes.string,
		onPressEnter: React.PropTypes.func,
		placeholder: React.PropTypes.string
	},
	onChange: function (e) {
		this.props.onChange(e.target.value);
	},
	onKeyPress(e){
		if(e.which === 13 && this.props.onPressEnter){
			this.props.onPressEnter();
			this.props.onChange("");
		}
	},
	render: function() {
		return (
			<input type="text"
			className="form-control"
			placeholder={this.props.placeholder}
			onKeyPress={this.onKeyPress}
			value={this.props.value}
			onChange={this.onChange}
			/>
		);
	}
});
