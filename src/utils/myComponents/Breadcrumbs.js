'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		crumb: React.PropTypes.array
	},
	getInitialState() {
		return {
			atsp_import: {name: 'import', url: '#/atspMatter/import'},
			atsp_list: {name: 'list', url: '#/atspMatter/import'},
			dev_create: {name: 'create', url: '#/devMatter/create'},
			dev_edit: {name: 'edit', url: ''},
			dev_list: {name: 'list', url: '#/devMatter/list'}
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
