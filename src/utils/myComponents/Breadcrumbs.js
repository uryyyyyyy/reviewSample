'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		crumb: React.PropTypes.array
	},
	getInitialState() {
		return {
			outline: {name: 'outline', url: '#/outline/find'}
		};
	},

	mapping(str){
		var obj = this.state[str];
		if(obj){
			return <li key={str}><a href={obj.url}>{obj.name}</a></li>;
		}else{
			return <li key={str}>{str}</li>;
		}
	},
	render() {
		var list = this.props.crumb.map(this.mapping);
		return (
			<ul className="breadcrumb">
				<li><a href="#">Home</a></li>
				{list}
			</ul>
		);
	}
});
