;(function() {
	'use strict';

	var clientCtrl = function($scope, dataClient, Data, addClient, $location) {
		$scope.currentPage = 1;
		$scope.clients = [];

		dataClient.$loaded().then(function(clients) {
			clients.forEach(function(client) {
				$scope.clients.push(client);
			});
		});

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
