;(function() {
	'use strict';
	var menuController = function($scope, $location) {
		$scope.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		}
	}

	menuController.$inject = ['$scope', '$location'];
	angular.module('daikinControllers').controller('menuController', menuController);
})();
