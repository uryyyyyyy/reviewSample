'use strict';
import React  from 'react';

import AccountMultiSelector  from '../utils/myComponents/AccountMultiSelector';
import TicketShowTable  from '../ticket/ShowTable';
import DetailShowTable  from '../detail/ShowTable';
import Logger  from '../utils/functions/Logger';
import AsyncUtil  from '../utils/functions/AsyncUtil';
import DatePicker  from '../utils/myComponents/DatePicker';
import StatusViewer  from '../utils/myComponents/StatusViewer';

export default React.createClass({
	propTypes: {
		outlineId: React.PropTypes.number
	},
	getInitialState() {
		return {
			id: undefined,
			reviewType: undefined,
			status: undefined,
			nextDate: undefined,
			participantIds: [],
			todoList: [],
			detailList: []
		};
	},
	componentDidMount() {
		this.fetchData(this.props.outlineId);
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.outlineId === this.props.outlineId){return;}
		this.fetchData(nextProps.outlineId);
	},
	changeAccountIds(accounts){
		this.setState({participantIds: _.map(accounts, v=>v.id)});
	},
	changeNextDate(value){
		this.setState({nextDate: value});
	},

	fetchData(outlineId) {
		AsyncUtil.getAjaxAsync(`webAPI/outline/id/${outlineId}/`)
			.then(res => this.setState({
				id: res.id,
				reviewType: res.reviewType,
				status: res.status,
				nextDate: res.nextDate,
				participantIds: res.participantIds,
				todoList: res.todoList,
				detailList: res.detailList
			}));
	},

	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Review Outline</div>
				<dl className="dl-horizontal">
					<dt>Review Type</dt>
					<dd>{this.state.reviewType ? this.state.reviewType.name : ''}</dd>
					<dt>Status</dt>
					<dd>
						<StatusViewer status={this.state.status}/> {this.state.status}
					</dd>
					<dt>Participants</dt>
					<dd>
						<AccountMultiSelector
							value={this.state.participantIds}
							onChange={this.changeAccountIds} />
					</dd>
					<dt>Next Review Date</dt>
					<dd>
						<DatePicker
							value={this.state.nextDate}
							onChange={this.changeNextDate}/>
					</dd>
					<dt>Todo List</dt>
					<dd>
						<TicketShowTable ticketIds={this.state.todoList} />
					</dd>
					<dt>Detail List</dt>
					<dd>
						<DetailShowTable detailList={this.state.detailList} />
					</dd>
				</dl>
			</div>
		);
	}
});