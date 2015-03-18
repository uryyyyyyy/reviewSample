'use strict';
import React  from 'react';
import Global  from '../utils/Global';

export default React.createClass({
	propTypes: {
		onLogout: React.PropTypes.func,
		name: React.PropTypes.string
	},
	logOut(){
		Global.logout();
		this.props.onLogout();
	},
	render() {
		return (
			<div>
				<a className="navbar-form" href="#"
				children={this.props.name} />
				<button className="btn btn-info"
				onClick={this.logOut} children='Sign out' />
			</div>
		);
	}
});
