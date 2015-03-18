require("babel/polyfill");
'use strict';

import React  from 'react';
import Router  from 'react-router';
import NotFoundPage  from './rootTemplate/NotFoundPage';
import AppTemplate  from './rootTemplate/AppTemplate';

import OutlineRoot  from './outline/Root';

import DetailRoot  from './detail/Root';

import Global  from './utils/Global';

var routes = (
	<Router.Route path='/' handler={AppTemplate}>

		<Router.Route path='ticketId/:ticketId' handler={OutlineRoot}>
			<Router.Route path='outlineId:outlineId' handler={OutlineRoot} />
		</Router.Route>

		<Router.Route path='detail/:detailId' handler={DetailRoot} />

		<Router.NotFoundRoute handler={NotFoundPage}/>
	</Router.Route>
);

Global.checkLogin();

Router.run(routes, function(Handler) {
	React.render(<Handler/>, document.body);
});
