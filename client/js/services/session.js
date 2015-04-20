;(function() {
	'use strict';

	angular.module('daikinServices').factory('Session', ['$location', function($location) {
		var isLoggedIn = false;

		return {
			isLoggedIn: function() {
				return isLoggedIn;
			},
			login: function() {
				isLoggedIn = true;

				$location.path('/dashbroad');
			},
			logout: function(needRedirect) {
				isLoggedIn = false;

				if (needRedirect) {
					$location.path('/login');
				}
			}
		};
	}]);

}());
