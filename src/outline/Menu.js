'use strict';
import React  from 'react';
import _ from 'lodash';

import Logger  from '../utils/functions/Logger';
import AsyncUtil  from '../utils/functions/AsyncUtil';
import TextForm  from '../utils/myComponents/TextForm';
import StatusViewer  from '../utils/myComponents/StatusViewer';

export default React.createClass({
	propTypes: {
		ticketId: React.PropTypes.number,
		outlineId: React.PropTypes.number
	},
	getInitialState() {
		return {
			reviewOutlines: []
		};
	},
	componentDidMount() {
		AsyncUtil.getAjaxAsync(`webAPI/outline/ticketId/${this.props.ticketId}`)
			.then(res => this.setState({reviewOutlines: res}));
	},

	createListDOM(reviewOutlines, outlineId){
		var createElement = outline => {
			var url = `#/outline/${this.props.ticketId}/${outline.id}`;
			if(outline.id === outlineId){
				return (<a href={url}
					className="list-group-item active"
					key={outline.id}>
					{outline.reviewType.name} <StatusViewer status={outline.status}/>
					</a>);
			}else{
				return (<a href={url}
					className="list-group-item"
					key={outline.id}>
					{outline.reviewType.name} <StatusViewer status={outline.status}/>
					</a>);
			}
		};

		var sortedList = _.sortBy(reviewOutlines, v => v.nextDate);
		return _.map(sortedList, createElement);
	},

	render() {
		var vDOMs = this.createListDOM(
			this.state.reviewOutlines, this.props.outlineId);
		return (
			<div>
				<div className="list-group">
					{vDOMs}
				</div>
			</div>
		);
	}
});