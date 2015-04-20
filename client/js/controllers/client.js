;(function() {
	'use strict';

	var clientCtrl = function($scope, dataClient, Data, addClient, $location) {
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.clients = dataClient;
		// Data.client().$promise.then(function done(response) {
		// 	$scope.clients = response;
		// });
		$scope.addClient = function() {
			console.log($scope.client);
			addClient($scope.client);
			if ($scope.client) {
				$location.path('/clients');
			}
		}
	}

	clientCtrl.$inject = ['$scope', 'dataClient', 'Data', 'addClient', '$location'];
	angular.module('daikinControllers').controller('clientCtrl', clientCtrl);
})();
