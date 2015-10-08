var mainApp = angular.module('mainApp', [
			'ngRoute', 'lbServices', 'ui.bootstrap', 'ngAnimate',
			'location', 'device'
			]);


mainApp.config(function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html', 
			controller: 'locationCtrl'
		})
		.when('/locations/:id?', {
			templateUrl: 'views/location.html', 
			controller: 'locationCtrl'
		})
		.when('/devices/:id?', {
			templateUrl: 'views/device.html', 
			controller: 'deviceCtrl'
		});

});



mainApp.controller('mainCtrl', ['$scope', '$location', function ($scope, $location) {


}
]);

