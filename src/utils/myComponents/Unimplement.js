'use strict';
import React  from 'react';

export default React.createClass({
	render: function() {
		return (
			<div className="alert alert-danger" role="alert">
				<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				unimplement: {this.props.text}
			</div>
		);
	}
});
