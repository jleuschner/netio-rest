var mainApp = angular.module('mainApp', [
			'ngRoute', 'lbServices', 'ui.bootstrap', 'ngAnimate',
			'location', 'device', 'port', 'actor'
			]);


mainApp.config(function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html', 
			controller: 'locationCtrl'
		})
		.when('/actors/:id?', {
			templateUrl: 'views/actor.html', 
			controller: 'actorCtrl as ctrl'
		})
		.when('/locations/:id?', {
			templateUrl: 'views/location.html', 
			controller: 'locationCtrl'
		})
		.when('/ports/:id?', {
			templateUrl: 'views/port.html', 
			controller: 'portCtrl as ctrl'
		})
		.when('/devices/:id?', {
			templateUrl: 'views/device.html', 
			controller: 'deviceCtrl as ctrl'
		});

});

mainApp.directive('bindHeightToWidth', function(){
    var directive = {
        restrict: 'A',
        link: function (scope, instanceElement, instanceAttributes, controller, transclude) {
            var heightFactor = 1;

            if (instanceAttributes['bindHeightToWidth']) {
                heightFactor = instanceAttributes['bindHeightToWidth'];
            }

            var updateHeight = function () {
                instanceElement.outerHeight(instanceElement[0].getBoundingClientRect().width * heightFactor);
            };

            scope.$watch(instanceAttributes['bindHeightToWidth'], function (value) {
                heightFactor = value;
                updateHeight();
            });

            $(window).resize(updateHeight);
            updateHeight();

            scope.$on('$destroy', function () {
                $(window).unbind('resize', updateHeight);
            });
        }
    };

    return directive;
});

mainApp.controller('mainCtrl', ['$scope', '$location', function ($scope, $location) {


}
]);

