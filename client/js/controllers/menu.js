;(function() {
	'use strict';
	var menuController = function($scope, $location, Session) {

		$scope.isLoggedIn = function() {
			return Session.isLoggedIn();
		};

		$scope.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		};
	};

	menuController.$inject = ['$scope', '$location', 'Session'];
	angular.module('daikinControllers').controller('menuController', menuController);
})();
