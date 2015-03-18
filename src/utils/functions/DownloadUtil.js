'use strict';
import Logger  from './Logger';

export default {
	/**
	* Ajaxでpostするとファイルのダウンロードが出来ないので仮想のformを作っている。
	* form要素はサーバー側で使いにくかったので、postjson項目にStringifyしたものを詰めている。
	*/
	post(url, data) {
		var $form = $('<form/>', {'action': url, 'method': 'post'});
		$form.append($('<input/>', {'type': 'hidden', 'name': 'postJson', 'value': JSON.stringify(data)}));
		$form.appendTo(document.body);
		$form.submit();
	}
}
