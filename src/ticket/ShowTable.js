'use strict';
import React  from 'react';

import AsyncUtil  from '../utils/functions/AsyncUtil';
import Logger  from '../utils/functions/Logger';
import Global  from '../utils/Global';
import Escape  from '../utils/functions/Escape';

export default React.createClass({
	propTypes: {
		ticketIds: React.PropTypes.array
	},
	getInitialState() {
		return {
			$selector: null,
			ticketOutlines: []
		};
	},
	componentDidMount(e){
		var $selector = $(this.getDOMNode()).bootstrapTable({data: []});
		this.setState({$selector: $selector});
		this.fetchData(this.props.ticketIds);
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.ticketIds === this.props.ticketIds){return;}
		this.fetchData(nextProps.ticketIds);
	},
	fetchData(ticketIds){
		var idsCsv = ticketIds.join(',');
		AsyncUtil.getAjaxAsync(`webAPI/ticket/multi/${idsCsv}`)
			.then((v => this.setState({ticketOutlines: v})).bind(this));
	},

	convertToTableHtml(values, bts){
		return values.map( v => {
			var btsUrl;
			if(bts.appName === 'redmine'){
				btsUrl = `http://${bts.host}/issues/${Number(v.id)}`
			}
			return {
				//check XSS. number => Number(var), String => Escape.escapeHTML(var)
				id: Number(v.id),
				title: `<a class="navbar-form" href="${btsUrl}" target="_blank">${Escape.escapeHTML(v.title)}</a>`,
				progress: Escape.escapeHTML(v.progress)
			};
		});
	},
	render() {
		var config = Global.getConfig();
		var newData = this.convertToTableHtml(this.state.ticketOutlines, config.bts);
		if(this.state.$selector){
			this.state.$selector.bootstrapTable('load', newData);
		}
		return (
			<table className="table" data-toggle="table" data-height="200"
				data-pagination="false">
				<thead>
					<tr>
						<th data-field="id" data-sortable="true">ID</th>
						<th data-field="title" data-sortable="true">Title</th>
						<th data-field="progress" data-sortable="true">Progress</th>
					</tr>
				</thead>
			</table>
		);
	}
});
