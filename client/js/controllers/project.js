;(function() {
	'use strict';

	var projectCtrl = function($scope, dataProject) {
		if (dataProject) {
			$scope.currentPage = 1;
			$scope.pageSize = 10;
			$scope.projects = dataProject;
		}
	}

	projectCtrl.$inject = ['$scope', 'dataProject'];
	angular.module('daikinControllers').controller('projectCtrl', projectCtrl);
})();
