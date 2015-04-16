;(function() {
	'use strict';

	var quotationCtrl = function($scope, dataQuotation, Data, $routeParams, dataProject, dataClient, ngDialog) {

		/*
		* List quotation information
		*/
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.quotations = dataQuotation();

		/*
		* View quotation
		*/
		var id = $routeParams.id;
		if (id) {
			$scope.quotation = dataQuotation(id);
			console.log($scope.quotation);
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
				controller: ['$scope', function($scope) {
					$scope.title = 'aaaaaa';
				}],
				className: 'ngdialog-theme-plain',
				showClose: true
			});
		}

	}

	quotationCtrl.$inject = ['$scope', 'dataQuotation', 'Data', '$routeParams', 'dataProject', 'dataClient', 'ngDialog'];
	angular.module('daikinControllers').controller('quotationCtrl', quotationCtrl);
})();
