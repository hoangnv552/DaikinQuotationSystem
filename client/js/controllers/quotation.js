;(function() {
	'use strict';

	var quotationCtrl = function($scope, dataQuotation, Data, $routeParams, dataProject, dataClient) {

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

	}

	quotationCtrl.$inject = ['$scope', 'dataQuotation', 'Data', '$routeParams', 'dataProject', 'dataClient'];
	angular.module('daikinControllers').controller('quotationCtrl', quotationCtrl);
})();
