'use strict';
import React  from 'react';
import Select  from 'react-select/src/Select';
import Logger  from '../functions/Logger';
import AsyncUtil  from '../functions/AsyncUtil';
import _  from 'lodash';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		value: React.PropTypes.array
	},
	getInitialState() {
		return {options: undefined};
	},
	convertToSelect(progressList) {
		return progressList.map( v => {
			return {
				value: String(v.id),
				label: v.name
			};
		});
	},
	convertToValue(progressIds) {
		return _.isEmpty(progressIds) ? null : progressIds.join(',');
	},
	convertToProgress(selectedValues) {
		var progressList = selectedValues.map( v => {
			return {
				id: Number(v.value),
				name: v.label
			};
		});
		return progressList;
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
		var values = this.state.options ?
				this.convertToValue(this.props.value) : undefined;
		return (
			<Select
			value={values}
			multi={true}
			options={this.state.options}
			onChange={this.onChange}
			/>
		);
	}
});
