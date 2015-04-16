;(function() {
	'use strict';

	var clientCtrl = function($scope, dataClient) {
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.clients = dataClient;
	}

	clientCtrl.$inject = ['$scope', 'dataClient'];
	angular.module('daikinControllers').controller('clientCtrl', clientCtrl);
})();
