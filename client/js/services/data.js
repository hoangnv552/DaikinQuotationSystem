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

	// get client with id
	angular.module('daikinServices').factory('dataClientWithId', ['$firebaseObject', function($firebaseObject) {
		return function(id) {
			var url;
			if (id) {
				url = urlTmp + 'client/' + id;
			}

			var ref = new Firebase(url);

			return $firebaseObject(ref);
		}
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

	// Data models
	angular.module('daikinServices').factory('dataModels', ['$firebaseArray', function($firebaseArray) {
		return function(id) {
			var url;
			if (id) {
				url = urlTmp + 'models/' + id;
			} else {
				url = urlTmp + 'models/';
			}

			var ref = new Firebase(url);

			return $firebaseArray(ref);
		}
	}]);

	// Data models hard data
	angular.module('daikinServices').factory('dataModelsHard', ['$firebaseArray', function($firebaseArray) {

		var url = urlTmp + 'modelsHard/';
		var ref = new Firebase(url);

		return $firebaseArray(ref);
	}]);
	// Data client
	angular.module('daikinServices').factory('addModel', ['$firebaseArray', function($firebaseArray) {
		return function(id) {
			var url;
			if (id) {
				url = urlTmp + 'quotation/' + id + '/models/';
			}

			var ref = new Firebase(url);

			return $firebaseArray(ref);
		}
	}]);

	// delete model
	angular.module('daikinServices').factory('deleteModel', ['$firebaseObject', function($firebaseObject) {
		return function(id, model) {
			var url;
			if (id) {
				url = urlTmp + 'quotation/' + id + '/models/' + model;
			}

			var ref = new Firebase(url);


			return $firebaseObject(ref).$remove();
		}
	}]);

	// add quotation
	angular.module('daikinServices').factory('addQuotation', ['$firebaseArray', function($firebaseArray) {
		return function(quotation) {

			var url = urlTmp + 'quotation/';
			var ref = new Firebase(url);

			return $firebaseArray(ref).$add(quotation);
		}
	}]);

	// add client
	angular.module('daikinServices').factory('addClient', ['$firebaseArray', function($firebaseArray) {
		return function(client) {

			var url = urlTmp + 'client/';
			var ref = new Firebase(url);

			return $firebaseArray(ref).$add(client);
		}
	}]);

	// add project
	angular.module('daikinServices').factory('addProject', ['$firebaseArray', function($firebaseArray) {
		return function(client) {

			var url = urlTmp + 'project/';
			var ref = new Firebase(url);

			return $firebaseArray(ref).$add(client);
		}
	}]);

	// get client with id
	angular.module('daikinServices').factory('dataProjecttWithId', ['$firebaseObject', function($firebaseObject) {
		return function(id) {
			var url;
			if (id) {
				url = urlTmp + 'project/' + id;
			}

			var ref = new Firebase(url);

			return $firebaseObject(ref);
		}
	}]);

})();
