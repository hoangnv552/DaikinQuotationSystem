;(function() {
	'use strict';

	var loginCtrl = function($scope) {
		$scope.login = true;
	}

	loginCtrl.$inject = ['$scope'];
	angular.module('daikinControllers').controller('loginCtrl', loginCtrl);
})();
