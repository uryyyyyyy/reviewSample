'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		value: React.PropTypes.string
	},
	onChange: function (e) {
		this.props.onChange(e.target.value);
	},
	render: function() {
		return (
			<textarea className="form-control" rows="10"
			value={this.props.value}
			onChange={this.onChange}
			/>
		);
	}
});
