'use strict';
import React  from 'react';

import AsyncUtil  from '../../utils/functions/AsyncUtil';
import Logger  from '../../utils/functions/Logger';
import Global  from '../../utils/Global';
import Escape  from '../../utils/functions/Escape';

var buttonTag = `<button><span class="glyphicon glyphicon-remove"></span></button>`

export default React.createClass({
	propTypes: {
		ticketIds: React.PropTypes.array,
		onClickRow: React.PropTypes.func
	},
	getInitialState() {
		return {
			$selector: null,
			ticketOutlines: []
		};
	},
	componentDidMount(e){
		var $selector = $(this.getDOMNode()).bootstrapTable({data: []});
		$selector.on('click-row.bs.table', this.selectTicket);
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

	selectTicket(e, row, $element) {
		if($element.context.innerHTML !== buttonTag){return;}
		var selectedTicket = this.state.ticketOutlines.filter(v => v.id === row.id)[0];
		this.props.onClickRow(selectedTicket);
	},
	convertToTableHtml(values, bts){
		return values.map( v => {
			var btsUrl;
			if(bts.appName === 'redmine'){
				btsUrl = `http://${bts.host}/issues/${Number(v.id)}`
			}
			return {
				//check XSS. number => Number(var), String => Escape.escapeHTML(var)
				button: buttonTag,
				id: Number(v.id),
				title: `<a class="navbar-form" href="${btsUrl}" target="_blank">${Escape.escapeHTML(v.title)}</a>`,
				progress: Escape.escapeHTML(v.progress.name)
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
				data-pagination="true" data-page-list="[100]">
				<thead>
					<tr>
						<th data-field="button"></th>
						<th data-field="id" data-sortable="true">ID</th>
						<th data-field="title" data-sortable="true">Title</th>
						<th data-field="progress" data-sortable="true">Progress</th>
					</tr>
				</thead>
			</table>
		);
	}
});
