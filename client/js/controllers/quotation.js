;(function() {
	'use strict';

	var quotationCtrl = function($scope, dataQuotation, Data, $routeParams, dataProject, dataClient, ngDialog, $route, dataModels, deleteModel, addQuotation, $rootScope, $location) {

		/*
		* List quotation information
		*/
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.quotations = dataQuotation();
		$rootScope.models = {};


		/*
		* View quotation
		*/
		var id = $routeParams.id;
		if (id) {
			$scope.quotation = dataQuotation(id);
			$scope.isView = true;

		} else {
			$scope.isView = false;
			$scope.saveQuotation = function(quotation) {
				var quotation;
				var i;
				for (i = 0; i < $rootScope.models.length; i++) {

					quotation = angular.extend({
						models: $rootScope.models
					}, $scope.quotation);

				}

				console.log(quotation);

				// var quotationsItem =

				addQuotation(quotation).then(function(response) {
					console.log(response.path.o[1]);

					$location.path('/quotations');
				});
			}
		}

		$scope.amount = function(model) {
			var totalTemp = 0;
			if (model) {
				totalTemp = model.qty * model.price;
			}

			return totalTemp;
		};

		$scope.totalAmount = function() {
			var total = 0;

			if ($scope.quotation) {
				angular.forEach($scope.quotation.models, function(model) {
					total += $scope.amount(model);
				});
			}
			return total;
		};

		// Remove model
		$scope.removeQoute = function(model) {
			console.log(model);
			var deletea = deleteModel(id, model);
			console.log(deletea);
		};

		// Remove model add
		$scope.removeQouteAdd = function(models, key) {
			console.log(key);
			$rootScope.models.splice(key, 1);
		}

		// Get project name
		$scope.projectName = dataProject;

		// Get client name
		$scope.clientName = dataClient;

		/*
		* Edit quotation
		*/
		Data.quotation().$promise.then(function done(response) {
			$scope.quotationsEdit = response;
		});

		/*
		* Show dialog import
		*/
		$scope.importDialog = function() {
			ngDialog.open({
				template: 'views/popup/import.html',
				controller: ['$scope', 'dataModels', 'dataQuotation', 'addModel', '$rootScope', function($scope, dataModels, dataQuotation, addModel, $rootScope) {
					$scope.models = dataModels();

					$scope.selectedIds = {};
					$scope.modelId = [];

					// Add models
					$scope.selectModelId = function() {
						var keys = Object.keys($scope.selectedIds);
						var index;
						var model;
						var models = [];

						for (var i = 0; i < keys.length; i++) {
							index = keys[i];
							if ($scope.selectedIds[index]) {

								if (id) {
									model = angular.extend({
										addAt: Date.now()
									}, $scope.models[index]);

									console.log(model);

									addModel(id).$add(model);
								} else {
									models = models.concat($scope.models[index]);
								}
							}
						}
						// $scope.models = models;
						$rootScope.models = models;
						console.log($rootScope.models);
						$scope.closeThisDialog();
					}
				}],
				className: 'ngdialog-theme-plain',
				showClose: true
			});
		}

		/*
		* View detail
		*/
		$scope.viewDetailDialog = function(quotation) {
			ngDialog.open({
				template: 'views/popup/detail.html',
				controller: ['$scope', function($scope) {
					$scope.qoutationView = quotation;
					console.log($scope.qoute);
				}],
				className: 'ngdialog-theme-dialog',
				showClose: false
			});
		}
	}

	quotationCtrl.$inject = ['$scope', 'dataQuotation', 'Data', '$routeParams', 'dataProject', 'dataClient', 'ngDialog', '$route', 'dataModels', 'deleteModel', 'addQuotation', '$rootScope', '$location'];
	angular.module('daikinControllers').controller('quotationCtrl', quotationCtrl);
})();
