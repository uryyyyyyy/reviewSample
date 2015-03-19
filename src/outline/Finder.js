'use strict';
import React  from 'react';
import Router  from 'react-router';
import IntegerForm  from '../utils/myComponents/IntegerForm';

export default React.createClass({
	propTypes: {},
	getInitialState() {
		return {
			ticketId: undefined
		};
	},
	goMatterUrl(){
		location.hash = `outline/${this.state.ticketId}/`;
	},
	changeTicketId(value){
		this.setState({ticketId: value});
	},
	render() {
		return (
			<div>
				<IntegerForm
					onChange={this.changeTicketId}
					onPressEnter={this.goMatterUrl}
					placeholder="select ticketId"
					value={this.state.ticketId} />
			</div>
		);
	}
});