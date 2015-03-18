'use strict';
import React  from 'react';

export default React.createClass({
	getInitialState() {
		return {
			callback: undefined,
			title: undefined,
			content: undefined
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
	onKeyPress(e){
		if(e.which === 13){
			$(this.getDOMNode()).modal('hide');
			this.state.callback();
		}
	},
	render() {
		return (
			<div className="modal" tabIndex="-1" role="dialog" aria-hidden="true" onKeyPress={this.onKeyPress}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">{this.state.title}</h4>
						</div>
						<div className="modal-body" dangerouslySetInnerHTML={{__html: this.state.content}}>
						</div>
						<div className="modal-footer">
							<button className="btn btn-primary" data-dismiss="modal"
							onClick={this.state.callback}
							children="OK" />
						</div>
					</div>
				</div>
			</div>
		);
	}
});
