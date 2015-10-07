(function () {

	var app = angular.module('location', []);

	app.controller('locationCtrl', ['$scope', '$routeParams', 'Location', function ($scope, $routeParams, Location) {
		$scope.floors = ['UG', 'EG', '1OG'];
		$scope.locationList = [];
		$scope.selectedObj = {};


		// Aufruf per /:id
		if ($routeParams.id) {
			Location.findById({ id: $routeParams.id })
				.$promise
				.then(function (result) {
					if (result) {
						$scope.selectObj(result);
					} else {
						$scope.noResults = true;
					}
				});
		}
		// ----------------


		$scope.getList = function() {
			Location.find()
			.$promise
			.then(function (list) {
				console.log(list);
				$scope.locationList = list;
			});
		};


		$scope.selectObj = function (obj) {
			$scope.selectedObj = obj;
		}

		$scope.new= function () {
			$scope.selectedObj = {};
			$scope.selectedObj.id = 0;
			$scope.selectedObj.floor = 'EG';
		}

		$scope.save = function (obj) {
			console.log(obj);
			if (obj.id>0) {
				$scope.selectedObj.$save().then(function(){ $scope.selectedObj={}; });
			} else {
				Location.create(obj).$promise.then(function(){ $scope.getList(); $scope.selectedObj={}; });
			}
		}


		$scope.getList();
	} ]);

})();
