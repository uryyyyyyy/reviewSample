'use strict';
import React  from 'react';
import DateTimePicker  from 'react-widgets/lib/DateTimePicker';
import _  from 'lodash';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		value: React.PropTypes.number,
		style: React.PropTypes.object
	},
	onChange(date){
		if(!this.props.onChange){return;}
		this.props.onChange(date.getTime());
	},
	createStyle(obj){
		return _.reduce(obj, (result, n, key) => {
			result[key] = n;
			return result;
		}, {width: 200});
	},
	render() {
		var _style = this.createStyle(this.props.style);
		var _value = this.props.value ? new Date(this.props.value) : undefined;
		return (
			<DateTimePicker
			format="yyyy/MM/dd HH:mm"
			time={true}
			value={_value}
			style={_style}
			onChange={this.onChange}/>
		);
	}
});
