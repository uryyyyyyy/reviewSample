'use strict';
import React  from 'react';

export default React.createClass({
	render() {
		return (
			<li className="dropdown">
				<a href="#" className="dropdown-toggle" data-toggle="dropdown">
					Settings<span className="caret"></span>
				</a>
				<ul className="dropdown-menu" role="menu">
					<li><a href="#/settings/Login">Login</a></li>
					<li><a href="#/settings/cacheClear">Cache Clear</a></li>
				</ul>
			</li>
		);
	}
});
