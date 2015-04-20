;(function() {
	'use strict';

	angular.module('daikinDirective', [])
	.directive('daikinTabs', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: function($scope) {
				var panes = $scope.panes = [];

			$scope.select = function(pane) {
				angular.forEach(panes, function(pane) {
					pane.selected = false;
				});
				pane.selected = true;
			};

			this.addPane = function(pane) {
				if (panes.length === 1) {
					$scope.select(pane);
				}
				panes.push(pane);
			};
			},
			templateUrl: 'views/popup/tabs.html'
		};
	})
	.directive('daikinPane', function() {
	return {
		require: '^daikinTabs',
		restrict: 'E',
		transclude: true,
		scope: {
			title: '@'
		},
		link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addPane(scope);
		},
		templateUrl: 'views/popup/pane.html'
		};
	});
})();
