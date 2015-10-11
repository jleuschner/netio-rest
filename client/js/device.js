(function () {

	var app = angular.module('device', []);

	app.controller('deviceCtrl', ['$scope', '$routeParams', 'Device', function ($scope, $routeParams, Device) {
		$scope.Devicetypes = ['PIO - V1', 'PIO - V2', 'NetIO'];
		$scope.deviceList = [];
		$scope.selectedDevice = {};


		// Aufruf per /:id
		if ($routeParams.id) {
			Device.findById({ id: $routeParams.id })
				.$promise
				.then(function (result) {
					if (result) {
						$scope.selectDevice(result);
					} else {
						$scope.noResults = true;
					}
				});
		}
		// ----------------


		$scope.getDeviceList = function() {
			Device.find()
			.$promise
			.then(function (list) {
				console.log(list);
				$scope.deviceList = list;
			});
		};

		$scope.selectDevice = function (obj) {
			$scope.selectedDevice = obj;
			$scope.IoData(obj);
		}

		$scope.newDevice = function () {
			$scope.selectedDevice = {};
			$scope.selectedDevice.id = 0;
			$scope.selectedDevice.floor = 'EG';
		}

		$scope.saveDevice = function (obj) {
			console.log(obj);
			console.log($scope.ctrl.frm.$dirty);
			if (obj.id>0) {
				$scope.selectedDevice.$save().then(function(){ $scope.selectedDevice={}; });
			} else {
				Device.create(obj).$promise.then(function(){ $scope.getDeviceList(); $scope.selectedDevice={}; });
			}
		}

		$scope.IoData = function(obj,data) {
			Device.data({ id : obj.id},{dataObject:data})
				.$promise
				.then( function(result){
					obj.data=result;
				})
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
				})
		}



	} ]);

})();
