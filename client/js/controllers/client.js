;(function() {
	'use strict';

	var clientCtrl = function($scope, dataClient, Data, addClient, $location, $routeParams, dataClientWithId) {
		$scope.currentPage = 1;
		$scope.clients = [];

		dataClient.$loaded().then(function(clients) {
			clients.forEach(function(client, key) {
				client.key = key;
				$scope.clients.push(client);
			});

			$scope.clients.sort(function(c1, c2) {
				return c2.updateAt - c1.updateAt;
			});
		});

		$scope.addClient = function() {
			$scope.client.updateAt = Date.now();
			addClient($scope.client).then(function() {
				$location.path('/clients');
			});
		};

		var id = $routeParams.id;
		if (id) {
			dataClient.$loaded().then(function(clients) {
				clients.forEach(function(client, key) {
					if (client.Name === id) {
						$scope.client = client;
					}
				});
			});
		}

		$scope.backClient = function() {
			$location.path('/clients');
		};

	};

	clientCtrl.$inject = ['$scope', 'dataClient', 'Data', 'addClient', '$location', '$routeParams', 'dataClientWithId'];
	angular.module('daikinControllers').controller('clientCtrl', clientCtrl);
})();
