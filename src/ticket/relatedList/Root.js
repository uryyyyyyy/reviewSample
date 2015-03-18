'use strict';
import React  from 'react';

import _ from 'lodash';
import Logger  from '../../utils/functions/Logger';
import ConfirmDialog  from '../../utils/myComponents/ConfirmDialog';
import AsyncUtil  from '../../utils/functions/AsyncUtil';
import OutlineTable  from './OutlineTable';
import Global  from '../../utils/Global';
import IntegerForm  from '../../utils/myComponents/IntegerForm';

export default React.createClass({
	propTypes: {
		ticketIds: React.PropTypes.array,
		onAddId: React.PropTypes.func,
		onRemoveId: React.PropTypes.func
	},
	getInitialState() {
		return {
			ticketId: undefined
		};
	},
	showSearchDialog(){
		this.refs.searchDialog.show();
	},
	addTicket(){
		this.props.onAddId(this.state.ticketId);
	},
	removeTicket(ticket){
		var cb = () => {
			this.props.onRemoveId(ticket.id);
		};
		this.refs.confirmDialog.show({
			callback: cb.bind(this),
			title: 'remove this ticket',
			content: '<p>are you sure to remove this ticket?</p>'
		});
	},
	changeTicketId(value){
		this.setState({ticketId: value});
	},
	render() {
		return (
			<div>
				<OutlineTable ticketIds={this.props.ticketIds}
				onClickRow={this.removeTicket} />
				<IntegerForm
					onChange={this.changeTicketId}
					onPressEnter={this.addTicket}
					placeholder="add new ticketId"
					value={this.state.ticketId} />
				<ConfirmDialog ref='confirmDialog'/>
			</div>
		);
	}
});
