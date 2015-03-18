'use strict';
import React  from 'react';

import LoginForm  from './LoginForm';
import LogoutForm  from './LogoutForm';
import Global  from '../utils/Global';

export default React.createClass({
	getInitialState() {
		return {
			isLogin: false
		};
	},
	onChange(){
		this.forceUpdate();
	},
	getLoginForm(account){
		if(!account){
			return <LoginForm onLogin={this.onChange} />;
		}else{
			return (<LogoutForm name={account.name}
				onLogout={this.onChange} />);
		}
	},
	render() {
		var vDOM = this.getLoginForm(Global.getAccount());
		return (
			<section className={this.props.className}>
			{vDOM}
			</section>
		);
	}

});
