;(function() {
	'use strict';

	var loginCtrl = function($scope, $location, Session) {
		$scope.user = {};

		$scope.login = function() {
			if ($scope.user) {
				if ($scope.user.name != 'admin') {
					$scope.errorName = 'Invalid user name';
				} else if ($scope.user.password != '123456') {
					$scope.errorPass = 'Invalid password';
				} else {
					// login
					Session.login();
				}
			}
		}
	}

	loginCtrl.$inject = ['$scope', '$location', 'Session'];
	angular.module('daikinControllers').controller('loginCtrl', loginCtrl);
})();
