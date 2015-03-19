'use strict';
import React  from 'react';
import Router  from 'react-router';
import SettingMenu  from './SettingMenu';
import LoginLogoutForm  from './LoginLogoutForm';

import Global  from '../utils/Global';

export default React.createClass({
	mixins: [ Router.State ],
	render() {
		Global.setUrl({
			params: this.getParams(),
			queries: this.getQuery(),
			url: new URL(location.href)
		});
		return (
			<div className='container'>
				<header className="navbar navbar-inverse">
					<a className="navbar-brand"
						href="#">Review-Management</a>
					<ul className="nav navbar-nav">
						<li><a href="#/outline/finder">outline</a></li>
						<li><a href="#/report/">Report</a></li>
						<SettingMenu />
					</ul>
					<LoginLogoutForm className="navbar-form navbar-right" />
				</header>
				<Router.RouteHandler />
				<footer className='footer'>
					<p children='supported by ATE' />
				</footer>
			</div>
		);
	}
});
