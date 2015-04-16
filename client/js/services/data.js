;(function() {
	'use strict';

	angular.module('daikinServices', ['ngResource']);

	angular.module('daikinServices').factory('Data', ['$resource', function($resource){
		return $resource('data/:dataId.json', {}, {
			project: {
				method: 'GET',
				params: {
					dataId: 'project'
				},
				isArray: true
			},
			client: {
				method: 'GET',
				params: {
					dataId: 'client'
				},
				isArray: true
			},
			quotation: {
				method: 'GET',
				params: {
					dataId: 'quotation'
				},
				isArray: true
			}
		});
	}]);

	var urlTmp = 'https://daikin.firebaseio.com/';

	// Data client
	angular.module('daikinServices').factory('dataClient', ['$firebaseObject', function($firebaseObject) {

		var url = urlTmp + 'client/';
		var ref = new Firebase(url);

		return $firebaseObject(ref);
	}]);

	// Data project
	angular.module('daikinServices').factory('dataProject', ['$firebaseObject', function($firebaseObject) {

		var url = urlTmp + 'project/';
		var ref = new Firebase(url);

		return $firebaseObject(ref);
	}]);

	// Data quotation
	angular.module('daikinServices').factory('dataQuotation', ['$firebaseObject', function($firebaseObject) {
		return function(id) {
			var url;
			if (id) {
				url = urlTmp + 'quotation/' + id;
			} else {
				url = urlTmp + 'quotation/';
			}

			var ref = new Firebase(url);

			return $firebaseObject(ref);
		}
	}]);
})();
