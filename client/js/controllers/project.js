;(function() {
	'use strict';

	var projectCtrl = function($scope, dataProject, Data, addProject, $location, dataClient, dataProjecttWithId, $routeParams) {
		$scope.currentPage = 1;
		$scope.projects = [];
		$scope.clients = dataClient;

		if (dataProject) {
			dataProject.$loaded().then(function(projects) {
				projects.forEach(function(project, key) {
					project['key'] = key;
					$scope.projects.push(project);
				});
			});
		}

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
		};

		var id = $routeParams.id;

		if (id) {
			$scope.project = dataProjecttWithId(id);
		}

		$scope.backProject = function() {
			$location.path('/projects');
		};

	}

	projectCtrl.$inject = ['$scope', 'dataProject', 'Data', 'addProject', '$location', 'dataClient', 'dataProjecttWithId', '$routeParams'];
	angular.module('daikinControllers').controller('projectCtrl', projectCtrl);
})();
