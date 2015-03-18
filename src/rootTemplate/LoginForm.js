'use strict';
import React  from 'react';

import TextForm  from '../utils/myComponents/TextForm';
import PasswordForm  from '../utils/myComponents/PasswordForm';
import LanguageSelector  from '../utils/myComponents/LanguageSelector';

import Global  from '../utils/Global';

export default React.createClass({
	propTypes: {
		onLogin: React.PropTypes.func
	},
	getInitialState() {
		return {
			accountId: '',
			password: '',
			languageCode: 'ja'
		};
	},

	changeAccountId(accountId){
		this.setState({accountId: accountId});
	},
	changePassword(password){
		this.setState({password: password});
	},
	changeLangCode(langCode){
		this.setState({languageCode: langCode});
	},
	logIn(){
		Global.login(this.state);
		this.props.onLogin();
	},

	render() {
		return (
			<div>
				<TextForm onChange={this.changeAccountId} placeholder="Account ID" />
				<PasswordForm onChange={this.changePassword} placeholder="Password" />
				<LanguageSelector onChange={this.changeLangCode} value={this.state.languageCode} />
				<button className="btn btn-success"
				onClick={this.logIn} children='Sign in' />
			</div>
		);
	}

});
