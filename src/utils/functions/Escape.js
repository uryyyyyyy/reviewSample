'use strict';

export default {
	escapeHTML(html) {
		//put dummy DOM and get escaped string
		return $('<div />').text(html).html();
	},
	dateToStr(dateNum) {
		var d = new Date(dateNum);
		return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
	}
}
