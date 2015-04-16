;(function() {
	'use strict';

	var clientCtrl = function($scope, dataClient, Data) {
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		// $scope.clients = dataClient;
		Data.client().$promise.then(function done(response) {
			$scope.clients = response;
		});
	}

	clientCtrl.$inject = ['$scope', 'dataClient', 'Data'];
	angular.module('daikinControllers').controller('clientCtrl', clientCtrl);
})();
