'use strict';
import React  from 'react';

export default React.createClass({
	render() {
		return (
			<li className="dropdown">
				<a href="#" className="dropdown-toggle" data-toggle="dropdown">
					@sp<span className="caret"></span>
				</a>
				<ul className="dropdown-menu" role="menu">
					<li><a href="#/atspMatter/find">@sp matter</a></li>
					<li><a href="#/atspTrouble/find">@sp trouble</a></li>
				</ul>
			</li>
		);
	}
});