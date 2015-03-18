'use strict';
import Logger  from './Logger';

export default {
	getAjaxAsync(url) {
		Logger.debug('GET url:' + url);
		var self = this;
		return new Promise( (resolve, reject) => {
			var req = new XMLHttpRequest();
			req.open('GET', url);
			req.onload = () => {
				if (req.status === 200) {//XXX only 200?
					var resJson = self.onSuccessHandle(req.response);
					resolve(resJson);
				}
				else {
					self.onErrorHandle(req);
					reject(req);
				}
			};
			req.send();
		});
	},
	postAjaxAsync(url, postObj) {
		Logger.debug('POST url:' + url);
		Logger.debug(postObj);
		var self = this;
		return new Promise( (resolve, reject) => {
			var req = new XMLHttpRequest();
			req.open('POST', url);
			req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			req.onload = () => {
				if (req.status === 200) {//XXX only 200?
					var resJson = self.onSuccessHandle(req.response);
					resolve(resJson);
				}
				else {
					self.onErrorHandle(req);
					reject(req);
				}
			};
			req.send(JSON.stringify(postObj));
		});
	},
	dummyPromise() {
		return new Promise( (resolve, reject) => {
			resolve();
		});
	},
	getAjaxSync(url) {
		Logger.debug('GET url:' + url);
		var req = new XMLHttpRequest();
		req.open('GET', url, false); // `false` makes the request synchronous
		req.send();
		if (req.status === 200) {//XXX only 200?
			var resJson = JSON.parse(req.response);
			Logger.debug(resJson);
			return resJson;
		}else{
			this.onErrorHandle(req);
		}
	},
	postAjaxSync(url, postObj) {
		Logger.debug('POST url:' + url);
		Logger.debug(postObj);
		var req = new XMLHttpRequest();
		req.open('POST', url, false);
		req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		req.send(JSON.stringify(postObj));
		if (req.status === 200) {//XXX only 200?
			var resJson = JSON.parse(req.response);
			Logger.debug(resJson);
			return resJson;
		}else{
			this.onErrorHandle(req);
		}
	},
	//FIXME jQuery使いたくなかったけど上手く行かなかった。。。
	uploadFile(url, file) {
		var self = this;
		var formData = new FormData();
		formData.append("file", file);
		return new Promise( (resolve, reject) => {
			$.ajax(
				url,
				{
					type: 'post',
					processData: false,
					contentType: false,
					data: formData,
					success: function(req) {
						Logger.success(req.message, 'Server Response');
						resolve();
					},
					error: function(res) {
						self.onErrorHandle(res);
						reject(res);
					}
			});
		});
	},

	onSuccessHandle(res) {
		var resJson = JSON.parse(res);
		Logger.debug(resJson);
		if(resJson.message){
			Logger.success(resJson.message, 'Server Response');
		}
		return resJson;
	},
	onErrorHandle(res) {
		try{
			var resJson = JSON.parse(res.response);
			Logger.error(resJson.message, 'Server Error');
		}catch(e){
			Logger.error(res.response, 'Network Error');
		}
	}

}
