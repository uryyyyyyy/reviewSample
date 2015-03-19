'use strict';
import React  from 'react';
import Outline  from './Outline';
import Global  from '../utils/Global';
import Menu  from './Menu';
import Logger  from '../utils/functions/Logger';
import AsyncUtil  from '../utils/functions/AsyncUtil';

import Breadcrumbs  from '../utils/myComponents/Breadcrumbs';

export default React.createClass({
	propTypes: {},
	getInitialState() {
		return {
			ticketId: undefined,
			ticketTitle: undefined,
		};
	},
	fetchData(ticketId) {
		AsyncUtil.getAjaxAsync(`webAPI/ticket/id/${ticketId}`)
			.then(res => this.setState({
				ticketId: res.id,
				ticketTitle: res.title
			}));
	},
	render() {
		var ticketId = Number(Global.getUrl().params.ticketId);
		var outlineId = Number(Global.getUrl().params.outlineId);
		if(ticketId !== this.state.ticketId){
			this.fetchData(ticketId);
		}
		if(outlineId){
			var vDOM = <Outline outlineId={outlineId} />;
		}else{
			var vDOM = <div>select reviewType</div>
		}
		return (
			<div>
				<h2>ticketId: {this.state.ticketId}, title:{this.state.ticketTitle}</h2>
				<Breadcrumbs crumb={['devMatter', 'dev_list']}/>
				<div className='col-sm-3'>
					<Menu ticketId={ticketId} outlineId={outlineId}/>
				</div>
				<div className='col-sm-9'>
					{vDOM}
				</div>
			</div>
		);
	}
});
