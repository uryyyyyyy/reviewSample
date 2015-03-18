'use strict';

import AsyncUtil  from './functions/AsyncUtil';
import Logger  from './functions/Logger';

//XXX browser must support localStorage.

export default {
	checkLogin(){
		var session = AsyncUtil.getAjaxSync('webAPI/auth/checkLogin');
		if(session){
			localStorage.setItem('account', JSON.stringify(session.account));
			localStorage.setItem('config', JSON.stringify(session.config));
		}else{
			localStorage.clear();
			window.location.hash = `/`;
		}
	},
	logout(){
		var config = AsyncUtil.postAjaxSync('webAPI/auth/logout', {});
		if(config){
			Logger.info('logout success');
		}
		localStorage.clear();
	},
	login(idAndPass){
		var session = AsyncUtil.postAjaxSync('webAPI/auth/login', idAndPass);
		if(session){
			Logger.info('login success');
			localStorage.setItem('account', JSON.stringify(session.account));
			localStorage.setItem('config', JSON.stringify(session.config));
		}else{
			localStorage.clear();
		}
	},
	getConfig() {
		return JSON.parse(localStorage.getItem('config'));
	},

	getAccount() {
		return JSON.parse(localStorage.getItem('account'));
	},

	getUrl() {
		return JSON.parse(sessionStorage.getItem('url'));
	},
	setUrl(params) {
		sessionStorage.setItem('url', JSON.stringify(params));
	}
};
