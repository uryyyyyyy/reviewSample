'use strict';
import React  from 'react';

import OutlineTable  from '../file/relatedList/OutlineTable';
import _ from 'lodash';
import Logger  from '../utils/functions/Logger';
import ConfirmDialog  from '../utils/myComponents/ConfirmDialog';
import AsyncUtil  from '../utils/functions/AsyncUtil';

import FileSelector  from '../utils/myComponents/FileSelector';

export default React.createClass({
	propTypes: {
		detailId: React.PropTypes.number
	},
	getInitialState() {
		return {
			fileDetails: [],
			newFile: undefined,
		};
	},
	setData(fileDtos){
		var files = _.map(fileDtos, v => {
			return {
				fileSize: v.fileSize,
				fileName: v.fileName,
				url: `webAPI/detail/id/${this.props.detailId}/file/${v.fileName}/get`
			}
		});
		this.setState({fileDetails: files});
	},
	fetchData(){
		AsyncUtil.getAjaxAsync(`webAPI/detail/id/${this.props.detailId}/fileList`)
			.then(this.setData);
	},
	componentDidMount(){
		this.fetchData();
	},
	changeFile(file){
		this.setState({newFile: file});
	},
	removeFile(fileName){
		var url = `webAPI/devMatter/id/${this.props.devMatterId}/file/${fileName}/remove`
		this.refs.confirmDialog.show({
			callback: () => AsyncUtil.getAjaxAsync(url).then(this.fetchData),
			title: 'remove file',
			content: '<p>are you sure to remove this file?</p>'
		});
	},
	addFile(){
		AsyncUtil.uploadFile(`webAPI/devMatter/id/${this.props.devMatterId}/file/add`, this.state.newFile)
			.then(this.fetchData);
	},
	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Attached File Form</div>
				<div className="panel-body">
					<OutlineTable fileDetails={this.state.fileDetails}
						onClickRow={this.removeFile} />
					<FileSelector onChange={this.changeFile} />
					<button className="btn btn-primary"
						onClick={this.addFile}
						children="Upload" />
					<ConfirmDialog ref='confirmDialog'/>
				</div>
			</div>
		);
	}
});