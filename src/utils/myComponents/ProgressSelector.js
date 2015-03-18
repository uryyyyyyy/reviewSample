'use strict';
import React  from 'react';
import Select  from 'react-select/src/Select';
import Logger  from '../functions/Logger';
import AsyncUtil  from '../functions/AsyncUtil';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		value: React.PropTypes.number
	},
	getInitialState() {
		return {options: []};
	},
	convertToSelect(progressList) {
		return progressList.map( v => {
			return {
				value: String(v.id),
				label: v.name
			};
		});
	},
	convertToProgress: function(selectedValues) {
		var progressArray = selectedValues.map( v => {
			return {
				id: Number(v.value),
				name: v.label
			};
		});
		return progressArray[0];
	},
	onChange(val, selectedValues) {
		var progress = this.convertToProgress(selectedValues);
		this.props.onChange(progress);
	},
	setData(arr) {
		Logger.debug(arr);
		this.setState({options: arr});
	},
	componentDidMount() {
		AsyncUtil.getAjaxAsync('webAPI/progress/all')
			.then(this.convertToSelect)
			.then(this.setData);
	},
	render() {
		var _value = this.props.value ? String(this.props.value) : null;
		return (
			<Select
			value={_value}
			options={this.state.options}
			onChange={this.onChange}
			/>
		);
	}
});
