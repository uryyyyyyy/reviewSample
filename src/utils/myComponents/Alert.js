'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		content: React.PropTypes.string,
		isHide: React.PropTypes.bool
	},
	componentDidMount(){
		var $selector = $(this.getDOMNode());
		var title = this.props.title || 'Alert!';
		var content = this.props.content || 'something alert';
		$selector.popover({
			trigger: 'hover',
			title: title,
			content: content
		});
	},
	render() {
		if(this.props.isHide){
			return <span></span>;
		}else{
			return (
				<span className="glyphicon glyphicon-exclamation-sign"></span>
			);
		}
	}
});
