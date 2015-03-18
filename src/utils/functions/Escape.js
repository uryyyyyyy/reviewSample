'use strict';

export default {
	escapeHTML(html) {
		//put dummy DOM and get escaped string
		return $('<div />').text(html).html();
	}
}
