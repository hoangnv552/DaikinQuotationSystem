;(function() {
	'use strict';

	var loginCtrl = function($scope) {
		$scope.demo = 'aaaaaaaaaa';
	}

	loginCtrl.$inject = ['$scope'];
	angular.module('daikinControllers').controller('loginCtrl', loginCtrl);
})();
