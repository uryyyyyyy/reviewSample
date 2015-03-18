'use strict';

toastr.options = {
	'closeButton': false,
	'debug': false,
	'newestOnTop': false,
	'progressBar': false,
	'positionClass': 'toast-bottom-right',
	'preventDuplicates': false,
	'onclick': null,
	'showDuration': '300',
	'hideDuration': '1000',
	'timeOut': '5000',
	'extendedTimeOut': '1000',
	'showEasing': 'swing',
	'hideEasing': 'linear',
	'showMethod': 'fadeIn',
	'hideMethod': 'fadeOut'
};

export default {
	info(obj, title) {
		toastr.info(obj, title);
		console.info(obj);
	},
	debug(obj) {
		console.debug(obj);
	},
	error(msg, title) {
		toastr.error(msg, title);
		console.log(msg);
	},
	networkError(obj) {
		toastr.error('please check log, and confirm to ATE', 'networkError');
		console.log(obj);
		throw new Error('network error');
	},
	success(message, title) {
		toastr.success(message, title);
		console.info(message);
	}
}
