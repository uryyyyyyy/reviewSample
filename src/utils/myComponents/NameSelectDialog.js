'use strict';
import React  from 'react';
import TextForm  from '../../utils/myComponents/TextForm';

export default React.createClass({
	getInitialState() {
		return {
			callback: undefined,
			title: undefined,
			content: undefined,
			name: ''
		};
	},
	show(obj){
		$(this.getDOMNode()).modal('show');
		this.setState({
			callback: obj.callback,
			title: obj.title,
			content: obj.content
		});
	},
	componentDidMount(){
		var $selector = $(this.getDOMNode());
		this.setState({$selector: $selector});
		$selector.modal({
			keyboard: true,
			show: false
		});
	},
	changeName(value){
		this.setState({name: value});
	},
	pressEnter(){
		$(this.getDOMNode()).modal('hide');
		this.state.callback(this.state.name);
	},
	render() {
		return (
			<div className="modal" tabIndex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">{this.state.title}</h4>
						</div>
						<div className="modal-body">
							<div dangerouslySetInnerHTML={{__html: this.state.content}} />
							<TextForm
								onChange={this.changeName}
								onPressEnter={this.pressEnter}
								value={this.state.name} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});