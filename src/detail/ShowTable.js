'use strict';
import React  from 'react';

import AsyncUtil  from '../utils/functions/AsyncUtil';
import Logger  from '../utils/functions/Logger';
import Escape  from '../utils/functions/Escape';

export default React.createClass({
	propTypes: {
		detailList: React.PropTypes.array
	},
	getInitialState() {
		return {
			$selector: null,
			matterOutlines: []
		};
	},
	componentDidMount(e){
		var $selector = $(this.getDOMNode()).bootstrapTable({data: []});
		this.setState({$selector: $selector});
	},

	convertToTableHtml(values){
		return values.map( v => {
			return {
				//check XSS. number => Number(var), String => Escape.escapeHTML(var)
				id: `<a class="navbar-form" href="#/detail/${Number(v.id)}" target="_blank">${Number(v.id)}</a>`,
				count: Number(v.count),
				status: Escape.escapeHTML(v.status),
				date: Escape.dateToStr(v.date)
			};
		});
	},
	render() {
		if(this.state.$selector){
			var newData = this.convertToTableHtml(this.props.detailList);
			this.state.$selector.bootstrapTable('load', newData);
		}
		return (
			<table className="table" data-toggle="table" data-height="200"
				data-pagination="false">
				<thead>
					<tr>
						<th data-field="id" data-sortable="true">ID</th>
						<th data-field="count" data-sortable="true">Count</th>
						<th data-field="status" data-sortable="true">Status</th>
						<th data-field="date" data-sortable="true">Date</th>
					</tr>
				</thead>
			</table>
		);
	}
});