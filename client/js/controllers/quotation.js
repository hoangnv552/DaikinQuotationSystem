;(function() {
	'use strict';

	var quotationCtrl = function($scope, dataQuotation, Data, $routeParams, dataProject, dataClient, ngDialog, $route, dataModels, deleteModel, addQuotation, $rootScope, $location) {

		/*
		* List quotation information
		*/
		$scope.currentPage = 1;
		$scope.quotations = [];
		$rootScope.models = {};
		$scope.quotationStatuses = ['Approval', 'Pending'];
		$scope.projectName = [];
		$scope.clientName = [];

		dataProject.$loaded().then(function(projects) {
			projects.forEach(function(project, key) {
				project.key = key;
				$scope.projectName.push(project);
			});
		});

		dataClient.$loaded().then(function(clients) {
			clients.forEach(function(client, key) {
				client.key = key;
				$scope.clientName.push(client);
			});
		});

		dataQuotation().$loaded().then(function(quotations) {
			quotations.forEach(function(quotation, key) {
				quotation.key = key;
				$scope.quotations.push(quotation);
			});
			console.log($scope.quotations);
			$scope.quotations.sort(function(c1, c2) {
				return c2.updateAt - c1.updateAt;
			});
		});

		/*
		* View quotation
		*/
		var id = $routeParams.id;
		if (id) {

			// If id is name
			dataQuotation().$loaded().then(function(quotations) {
				quotations.forEach(function(quotation, key) {
					if (quotation.estimationName === id) {
						$scope.quotation = quotation;
					}
				});
			});

			// If id is key
			$scope.quotation = dataQuotation(id);

			$scope.isView = true;

			// Save quotation if id
			$scope.saveQuotation = function(quotation) {
				addQuotation(quotation).then(function(response) {
					//$location.path('/quotations');
				});
			};

		} else {
			$scope.isView = false;
			$scope.saveQuotation = function(quotation) {
				var i;
				for (i = 0; i < $rootScope.models.length; i++) {

					quotation = angular.extend({
						models: $rootScope.models
					}, $scope.quotation);

				}

				// var quotationsItem =
				quotation.updateAt = Date.now();
				addQuotation(quotation).then(function(response) {
					$location.path('/quotations');
				});
			};
		}

		var totalModelPrice = function(models) {
			var total = 0;
			angular.forEach(models, function(model) {
				total += $scope.amount(model);
			});

			return total;
		};

		$scope.amount = function(model) {
			var totalTemp = 0;
			if (model) {
				totalTemp = model.qty * model.price;
			}

			return totalTemp;
		};

		$scope.totalAmount = function() {
			if ($scope.quotation && $scope.quotation.models) {
				return totalModelPrice($scope.quotation.models);
			} else {
				return totalModelPrice($rootScope.models);
			}
		};

		// Remove model
		$scope.removeQoute = function(model) {
			deleteModel(id, model);
		};

		// Remove model add
		$scope.removeQouteAdd = function(models, key) {
			$rootScope.models.splice(key, 1);
		};

		/*
		* Edit quotation
		*/
		Data.quotation().$promise.then(function done(response) {
			$scope.quotationsEdit = response;
		});

		/*
		* Show dialog import
		*/
		$scope.importDialog = function(tabId) {
			ngDialog.open({
				template: 'views/popup/import.html',
				controller: ['$scope', 'dataModels', 'dataQuotation', 'addModel', '$rootScope', 'dataModelsHard', function($scope, dataModels, dataQuotation, addModel, $rootScope, dataModelsHard) {
					$scope.models = [];
					$scope.selectedIds = [];
					$scope.modelId = [];
					$scope.selectedTab = tabId;

					dataModels().$loaded().then(function(models) {
						models.forEach(function(model, key) {
							model.key = key;
							$scope.models.push(model);
						});
					});

					var getModelByKey = function(models, key) {
						var ret = null;

						angular.forEach(models, function(model) {
							if (model.key === key) {
								ret = model;
								return;
							}
						});

						return ret;
					};

					var addModelToQuotation = function(models) {
						if ($rootScope.models.length) {
							angular.forEach(models, function(model) {
								$rootScope.models.push(model);
							});
						} else {
							$rootScope.models = models;
						}
					};

					$scope.toggleSelection = function(modelKey) {
						var idx = $scope.selectedIds.indexOf(modelKey);
						if (idx < 0) {
							$scope.selectedIds.push(modelKey);
						} else {
							$scope.selectedIds.splice(idx, 1);
						}
					};

					// Add models
					$scope.selectModelId = function() {
						var keys = $scope.selectedIds;
						var model;
						var models = [];

						for (var i = 0; i < keys.length; i++) {
							if (id) {
								model = angular.extend({
									addAt: Date.now()
								}, getModelByKey($scope.models, keys[i]));

								addModel(id).$add(model);
							} else {
								models = models.concat(getModelByKey($scope.models, keys[i]));
							}
						}

						addModelToQuotation(models);

						$scope.closeThisDialog();
					};

					$scope.importCSV = function() {
						var csvFile = document.getElementById('csv-file');

						if (csvFile.files.length === 0) {
							return;
						}

						var modelToAdd = [];

						dataModelsHard.forEach(function(data, key) {
							modelToAdd.push(data);
						});

						addModelToQuotation(modelToAdd);

						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-plain',
				showClose: true
			});
		};

		/*
		* View detail
		*/
		$scope.viewDetailDialog = function(quotation) {
			ngDialog.open({
				template: 'views/popup/detail.html',
				controller: ['$scope', function($scope) {
					$scope.qoutationView = quotation;
				}],
				className: 'ngdialog-theme-dialog',
				showClose: false
			});
		};
	};

	quotationCtrl.$inject = ['$scope', 'dataQuotation', 'Data', '$routeParams', 'dataProject', 'dataClient', 'ngDialog', '$route', 'dataModels', 'deleteModel', 'addQuotation', '$rootScope', '$location'];
	angular.module('daikinControllers').controller('quotationCtrl', quotationCtrl);
})();
