;(function() {
	'use strict';

	var daikinApp = angular.module('daikinApp', [
			'ngRoute',
			'daikinControllers',
			'daikinServices',
			'firebase',
			'ngDialog',
			'daikinDirective',
			'ngCookies'
		]);

	daikinApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/login', {
				templateUrl: 'views/login.html',
				controller: 'loginCtrl'
			}).
			when('/dashbroad', { //dashboard
				templateUrl: 'views/dashbroad.html',
				controller: 'dashbroadCtrl'
			}).
			when('/quotations', {
				templateUrl: 'views/quotation.html',
				controller: 'quotationCtrl'
			}).
			when('/quotations/new', {
				templateUrl: 'views/quotation-detail.html',
				controller: 'quotationCtrl'
			}).
			when('/quotations/edit/:id', {
				templateUrl: 'views/quotation-detail.html',
				controller: 'quotationCtrl'
			}).
			// when('/quotation-edit', {
			// 	templateUrl: 'views/quotation-edit.html',
			// 	controller: 'quotationCtrl'
			// }).
			when('/projects', {
				templateUrl: 'views/project.html',
				controller: 'projectCtrl'
			}).
			when('/projects/new', {
				templateUrl: 'views/project-new.html',
				controller: 'projectCtrl'
			}).
			when('/clients', {
				templateUrl: 'views/client.html',
				controller: 'clientCtrl'
			}).
			when('/clients/new', {
				templateUrl: 'views/client-new.html',
				controller: 'clientCtrl'
			}).
			when('/create-quotation', {
				templateUrl: 'views/create-quotation.html',
				controller: 'quotationCtrl'
			}).
			otherwise({
				redirectTo: '/dashbroad'
			});
	}]).run(['$location', '$rootScope', 'Session', function($location, $rootScope, Session) {
		$rootScope.$on('$locationChangeStart', function(event, next, prev) {

			if (next.split('#')[1] !== '/login') {
				if (!Session.isLoggedIn()) {
					event.preventDefault();
					$location.path('/login');
				}
			} else {
				Session.logout(false);
			}
		});
	}]);
})();
