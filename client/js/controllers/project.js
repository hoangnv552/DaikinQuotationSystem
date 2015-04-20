;(function() {
	'use strict';

	var projectCtrl = function($scope, dataProject, Data, addProject, $location, dataClient) {
		$scope.currentPage = 1;
		$scope.pageSize = 10;

		if (dataProject) {
			$scope.projects = dataProject;
		}

		$scope.clients = dataClient;
		// Data.project().$promise.then(function done(response) {
		// 	$scope.projects = response;
		// 	console.log(response);
		// });

		$scope.addProject = function() {
			console.log($scope.project);

			var projectObj = angular.extend({
				revison: "1.0",
				createDate: "07-Apr-2015",
				endDate: "20-Apr-2015",
				status: "Unapproval",
				quotation: "Estimation 1"

			}, $scope.project);

			if (projectObj) {
				addProject(projectObj);
				$location.path('/projects');
			}
		}
	}

	projectCtrl.$inject = ['$scope', 'dataProject', 'Data', 'addProject', '$location', 'dataClient'];
	angular.module('daikinControllers').controller('projectCtrl', projectCtrl);
})();
