'use strict';
import React  from 'react';

import AsyncUtil  from '../../utils/functions/AsyncUtil';
import Logger  from '../../utils/functions/Logger';
import Global  from '../../utils/Global';
import Escape  from '../../utils/functions/Escape';

var buttonTag = `<button><span class="glyphicon glyphicon-remove"></span></button>`

export default React.createClass({
	propTypes: {
		fileDetails: React.PropTypes.array,
		onClickRow: React.PropTypes.func
	},
	getInitialState() {
		return {
			$selector: null
		};
	},
	componentDidMount(e){
		var $selector = $(this.getDOMNode()).bootstrapTable({data: []});
		$selector.on('click-row.bs.table', this.selectFile);
		this.setState({$selector: $selector});
	},

	selectFile(e, row, $element) {
		if($element.context.innerHTML !== buttonTag){return;}
		var selectedFile = this.props.fileDetails.filter(v => v.id === row.id)[0];
		this.props.onClickRow(selectedFile.fileName);
	},
	convertToTableHtml(values){
		return values.map( v => {
			return {
				//check XSS. number => Number(var), String => Escape.escapeHTML(var)
				button: buttonTag,
				fileName: `<a class="navbar-form" href="${v.url}" target="_blank">${Escape.escapeHTML(v.fileName)}</a>`,
				size: Escape.escapeHTML(v.fileSize) + ' Byte'
			};
		});
	},
	render() {
		var newData = this.convertToTableHtml(this.props.fileDetails);
		if(this.state.$selector){
			this.state.$selector.bootstrapTable('load', newData);
		}
		return (
			<table className="table" data-toggle="table" data-height="200"
				data-pagination="true" data-page-list="[100]">
				<thead>
					<tr>
						<th data-field="button"></th>
						<th data-field="fileName" data-sortable="true">fileName</th>
						<th data-field="size" data-sortable="true">Size</th>
					</tr>
				</thead>
			</table>
		);
	}
});
