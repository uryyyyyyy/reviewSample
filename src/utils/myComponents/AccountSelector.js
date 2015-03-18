'use strict';
import React  from 'react';
import Select  from 'react-select/src/Select';
import Logger  from '../functions/Logger';
import AsyncUtil  from '../functions/AsyncUtil';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		value: React.PropTypes.string,
		disabled: React.PropTypes.bool
	},
	getInitialState() {
		return {options: []};
	},
	convertToSelect(accounts) {
		return accounts.map( v => {
			return {
				value: v.id,
				label: v.name
			};
		});
	},
	convertToAccount(selectedValues) {
		var accounts = selectedValues.map( v => {
			return {
				id: v.value,
				name: v.label
			};
		});
		return accounts[0];
	},
	onChange(val, selectedValues) {
		var account = this.convertToAccount(selectedValues);
		this.props.onChange(account);
	},
	setData(arr) {
		Logger.debug(arr);
		this.setState({options: arr});
	},
	componentDidMount() {
		AsyncUtil.getAjaxAsync('webAPI/account/all')
			.then(this.convertToSelect)
			.then(this.setData);
	},
	filterOption(oneOfList, inputStr){
		if(inputStr === ''){return false;}
		return (oneOfList.label.indexOf(inputStr) === -1) ? false : true;
	},
	render() {
		return (
			<Select
			value={this.props.value}
			options={this.state.options}
			disabled={this.props.disabled}
			filterOption={this.filterOption}
			onChange={this.onChange}
			/>
		);
	}
});
