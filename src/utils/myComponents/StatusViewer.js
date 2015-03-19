'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		status: React.PropTypes.string
	},
	render() {
		if(this.props.status === 'Fail'){
			return <span><span className="glyphicon glyphicon-remove-sign" style={{color:"#d9534f"}} /></span>;
		}else if(this.props.status === 'Conditional'){
			return <span><span className="glyphicon glyphicon-info-sign" style={{color:"#eea236"}} /></span>;
		}else if(this.props.status === 'Pass'){
			return <span><span className="glyphicon glyphicon-ok-sign" style={{color:"#5cb85c"}} /></span>;
		}else{
			return <span><span className="glyphicon glyphicon-question-sign" /></span>;
		}
	}
});
