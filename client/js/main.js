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
			controller: 'portCtrl'
		})
		.when('/devices/:id?', {
			templateUrl: 'views/device.html', 
			controller: 'deviceCtrl as ctrl'
		});

});



mainApp.controller('mainCtrl', ['$scope', '$location', function ($scope, $location) {


}
]);

