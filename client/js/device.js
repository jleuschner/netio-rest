(function () {

	var app = angular.module('device', []);

	app.controller('deviceCtrl', ['$scope', '$routeParams', 'Device', function ($scope, $routeParams, Device) {
		$scope.Devicetypes = ['PIO - V1', 'PIO - V2', 'NetIO'];
		$scope.objList = [];
		$scope.selectedObj = {};


		// Aufruf per /:id
		if ($routeParams.id) {
			Device.findById({ id: $routeParams.id })
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
			Device.find()
			.$promise
			.then(function (list) {
				console.log(list);
				$scope.objList = list;
			});
		};


		$scope.selectObj = function (obj) {
			$scope.selectedObj = obj;
			$scope.IoData(obj);
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
				Device.create(obj).$promise.then(function(){ $scope.getList(); $scope.selectedObj={}; });
			}
		}

		$scope.checkDevice = function(obj) {
			Device.ping({ id: obj.id })
				.$promise
				.then( function(result){
					console.log(result);
					$scope.testout=result;
				});
		}

	$scope.commands = function(obj,cmdstr) {
		Device.commands({ id : obj.id},{commands : Array(cmdstr)})
			.$promise
			.then( function(result){
				//console.log(result);
			})
	}


	$scope.IoData = function(obj,data) {
		Device.data({ id : obj.id},{dataObject:data})
			.$promise
			.then( function(result){
				obj.data=result;
			})
	}


		$scope.getList();
	} ]);

})();
