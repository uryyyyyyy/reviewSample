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
	componentDidMount() {
		AsyncUtil.getAjaxAsync('webAPI/account/all')
			.then(this.convertToSelect)
			.then(this.setData);
	},
	setData(arr) {
		Logger.debug(arr);
		this.setState({options: arr});
	},

	convertToSelect(accounts) {
		return accounts.map( v =>{
			return {
				value: v.id,
				label: v.name
			};
		});
	},
	convertToValue(accountIds) {
		return _.isEmpty(accountIds) ? null : accountIds.join(',');
	},
	convertToAccount(selectedValues) {
		return selectedValues.map( v => {
			return {
				id: v.value,
				name: v.label
			};
		});
	},
	onChange(val, selectedValues) {
		var accounts = this.convertToAccount(selectedValues);
		this.props.onChange(accounts);
	},
	filterOption(oneOfList, inputStr){
		if(inputStr === ''){
			return false;
		}
		return (oneOfList.label.indexOf(inputStr) === -1) ? false : true;
	},
	render: function() {//if options don't contain value, show value directly.
		var values = this.state.options ?
				this.convertToValue(this.props.value) : undefined;
		return (
			<Select
			multi={true}
			value={values}
			delimiter={','}
			options={this.state.options}
			filterOption={this.filterOption}
			onChange={this.onChange}
			/>
		);
	}
});
