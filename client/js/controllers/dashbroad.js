;(function() {
	'use strict';

	var dashbroadCtrl = function($scope) {
		$scope.title = 'Dashbroad';
	}

	dashbroadCtrl.$inject = ['$scope'];
	angular.module('daikinControllers').controller('dashbroadCtrl', dashbroadCtrl);
})();
