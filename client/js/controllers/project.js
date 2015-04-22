;(function() {
	'use strict';

	var projectCtrl = function($scope, dataProject, dataQuotation, Data, addProject, $location, dataClient, dataProjecttWithId, $routeParams, $q) {
		$scope.currentPage = 1;
		$scope.projects = [];
		$scope.projectToDisplay = [];
		$scope.clients = dataClient;
		$scope.quotations = [];

		if (dataProject) {
			var loadJob = [];
			var promise;

			promise = dataProject.$loaded().then(function(projects) {
				projects.forEach(function(project, key) {
					project.key = key;
					$scope.projects.push(project);
				});
			});
			loadJob.push(promise);

			var arrContains = function(arr, elementToSearch, keyName) {
				var isContained = false;

				angular.forEach(arr, function(element) {
					if (element[keyName] === elementToSearch[keyName]) {
						isContained = true;
						return;
					}
				});

				return isContained;
			};

			//Sort by projectName
			var compareSubjectFunction = function(a, b) {
				if (a.projectName < b.projectName) {
					return -1;
				}
				if (a.projectName > b.projectName) {
					return 1;
				}
				return 0;
			};

			promise = dataQuotation().$loaded().then(function(quotations) {
				quotations.forEach(function(quotation, key) {
					quotation.key = key;
					$scope.quotations.push(quotation);
				});

				$scope.quotations.sort(compareSubjectFunction);
			});
			loadJob.push(promise);

			$q.all(loadJob).then(function() {
				//Get all quotations to display
				$scope.projectToDisplay = $scope.quotations;

				//Add projects
				angular.forEach($scope.projects, function(project) {
					if (!arrContains($scope.projectToDisplay, project, 'projectName')) {
						$scope.projectToDisplay.push({
							projectName: project.projectName,
							clientName: project.clientName,
							updateAt: project.updateAt
						});
					}
				});
				// console.log($scope.projectToDisplay);
				$scope.projectToDisplay.sort(function(c1, c2) {
					return c2.updateAt - c1.updateAt;
				});
			});
		}

		$scope.addProject = function() {
			var projectObj = $scope.project;
			projectObj.updateAt = Date.now();
			if (projectObj) {
				addProject(projectObj).then(function() {
					$location.path('/projects');
				});
			}
		};

		var id = $routeParams.id;

		if (id) {
			dataProject.$loaded().then(function(projects) {
				projects.forEach(function(project, key) {
					if (project.projectName === id) {
						$scope.project = project;
					}
				});
			});
		}

		$scope.backProject = function() {
			$location.path('/projects');
		};

	};

	projectCtrl.$inject = ['$scope', 'dataProject', 'dataQuotation', 'Data', 'addProject', '$location', 'dataClient', 'dataProjecttWithId', '$routeParams', '$q'];
	angular.module('daikinControllers').controller('projectCtrl', projectCtrl);
})();
