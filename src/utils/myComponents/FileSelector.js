'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func
	},
	change: function(e) {
		var self = this;
		var file = e.target.files[0];
		this.props.onChange(file);
	},
	render: function() {
		return (
			<input type="file" onChange={this.change} />
		);
	}
});
