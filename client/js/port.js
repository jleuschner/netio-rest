(function () {

	var app = angular.module('port', []);

	app.controller('portCtrl', ['$scope', '$routeParams', 'Port', function ($scope, $routeParams, Port) {

		$scope.portTypes=['Relay','PWM'];

		$scope.portList = [];
		$scope.selectedObj = {};


		// Aufruf per /:id
		if ($routeParams.id) {
			Port.findById({ id: $routeParams.id })
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


		$scope.getPortList = function() {
			Port.find({ filter : { include : 'device' }})
			.$promise
			.then(function (list) {
				$scope.portList = list;
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
				Port.create(obj).$promise.then(function(){ $scope.getPortList(); $scope.selectedObj={}; });
			}
		}


	} ]);

})();
