;(function() {
	'use strict';

	var projectCtrl = function($scope, dataProject, Data) {
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		// if (dataProject) {
		// 	$scope.currentPage = 1;
		// 	$scope.pageSize = 10;
		// 	$scope.projects = dataProject;
		// }
		Data.project().$promise.then(function done(response) {
			$scope.projects = response;
			console.log(response);
		});
	}

	projectCtrl.$inject = ['$scope', 'dataProject', 'Data'];
	angular.module('daikinControllers').controller('projectCtrl', projectCtrl);
})();
