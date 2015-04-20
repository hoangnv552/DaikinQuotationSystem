;(function() {
	'use strict';

	var dashbroadCtrl = function($scope, dataQuotation) {
		$scope.title = 'Dashbroad';
        $scope.currentPage = 1;
        $scope.quotations = [];

        dataQuotation().$loaded().then(function(quotations) {
            quotations.forEach(function(quotation) {
                $scope.quotations.push(quotation);
            });
        });
	}

	dashbroadCtrl.$inject = ['$scope', 'dataQuotation'];
	angular.module('daikinControllers').controller('dashbroadCtrl', dashbroadCtrl);
})();
