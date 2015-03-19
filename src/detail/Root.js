'use strict';
import React  from 'react';
import Router  from 'react-router';

import DatePicker  from '../utils/myComponents/DatePicker';
import StatusViewer  from '../utils/myComponents/StatusViewer';
import AccountMultiSelector  from '../utils/myComponents/AccountMultiSelector';
import TicketShowTable  from '../ticket/ShowTable';
import AttachedFileForm  from './AttachedFileForm';

export default React.createClass({
	propTypes: {},
	getInitialState: function() {
		return {
			detailId: Number(Global.getUrl().params.detailId)
		};
	},
	componentDidMount() {
		this.fetchData(this.props.outlineId);
	},
	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Review Outline</div>
				<dl className="dl-horizontal">
					<dt>Review Type</dt>
					<dd>type</dd>
					<dt>Status</dt>
					<dd>
						<StatusViewer status="Fail"/>
					</dd>
					<dt>Participants</dt>
					<dd>
						<AccountMultiSelector
							value={[]}
							onChange={this.changeAccountIds} />
					</dd>
					<dt>Review Date</dt>
					<dd>
						<DatePicker
							value={0}
							onChange={this.changeNextDate}/>
					</dd>
					<dt>Todo List</dt>
					<dd>
						<TicketShowTable ticketIds={[]} />
					</dd>
					<dt>Todo List</dt>
					<dd>
						<AttachedFileForm devMatterId={this.state.detailId} />
					</dd>
				</dl>
			</div>
		);
	}
});