;(function() {
    'use strict';

    var quotationCtrl = function($scope, dataQuotation, Data, $routeParams, dataProject, dataClient, ngDialog, $route, dataModels, deleteModel, addQuotation, $rootScope, $location) {

        /*
        * List quotation information
        */
        $scope.currentPage = 1;
        $scope.quotations = [];
        $rootScope.models = {};

        dataQuotation().$loaded().then(function(quotations) {
        	quotations.forEach(function(quotation) {
        		$scope.quotations.push(quotation);
        	});
        });

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
        $scope.importDialog = function(tabId) {
            ngDialog.open({
                template: 'views/popup/import.html',
                controller: ['$scope', 'dataModels', 'dataQuotation', 'addModel', '$rootScope', function($scope, dataModels, dataQuotation, addModel, $rootScope) {
                    $scope.models = dataModels();

                    $scope.selectedIds = {};
                    $scope.modelId = [];

                    $scope.selectedTab = tabId;

                    /*
                    * Check if a model is exist in a model list or not
                    */
                    var modelExist = function(models, model) {
                        var ret = false;
                        angular.forEach(models, function(aModel) {
                            if (aModel.$id == model.$id) {
                                ret = true
                                return;
                            }
                        });

                        return ret;
                    };

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

                        if ($rootScope.models.length) {
                            // Add only newly added models
                            angular.forEach(models, function(model) {
                                if (!modelExist($rootScope.models, model)) {
                                    $rootScope.models.push(model);
                                }
                            });
                        } else {
                            $rootScope.models = models;
                        }

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
