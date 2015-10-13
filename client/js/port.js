(function () {

	var app = angular.module('port', []);

	app.controller('portCtrl', ['$scope', '$routeParams', 'Port', function ($scope, $routeParams, Port) {

		$scope.portTypes=['Relay','PWM'];
		$scope.portTypeTags=['white','red','green','blue'];

		$scope.portList = [];
		$scope.selectedObj = {};

		$scope.IoValue = "";


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

		$scope.IoStatus = function(id,value) {
			Port.iostatus({ id : id },{ value : value})
			.$promise
			.then(function (obj) {
				$scope.IoValue=obj;
			});
		};


		$scope.getPortList = function() {
			Port.find({ filter : { include : ['device','actor'] }})
			.$promise
			.then(function (list) {
				$scope.portList = list;
			});
		};


		$scope.selectObj = function (obj) {
			$scope.selectedObj = obj;
			$scope.IoValue = null;
		}

		$scope.new= function () {
			$scope.selectedObj = {};
			$scope.selectedObj.id = 0;
		}

		$scope.save = function (obj) {
			console.log(obj);
			if (obj.id>0) {
				$scope.selectedObj.$save().then(function(){ $scope.getPortList(); $scope.selectedObj={}; });
			} else {
				Port.create(obj).$promise.then(function(){ $scope.getPortList(); $scope.selectedObj={}; });
			}
		}


	} ]);

	/*
	mainApp.directive('portId', function() {
		return {
			controller: function($scope) { }
		}
	});
	*/

	app.directive('ioport', function () {
		return {
			restrict: 'AE',
			//require: '^portId',
			scope: {
				portId: '@'
			},
			controller: ['$scope', 'Port', function ($scope, Port) {
				$scope.obj = {};
				$scope.portStatus = function (Id,value) {
					Port.iostatus({ id: Id },{value : value})
						.$promise
						.then(function (obj) {
							$scope.obj = obj;
							console.log(obj)
						});
				};
			} ],
			link: function (scope, elem, attr) {
				scope.$watch('portId', function (newValue) {
					console.log("NEW: ",newValue);
					if (newValue) scope.portStatus(newValue);
				})
			},
			templateUrl: '/js/templates/ioport.html'
			/*
			template: function (elem, attr) {
				var html = "<p>Type: {{obj.type}}<p><input type='number' ng-model='obj.value' ng-change='portStatus(portId,obj.value)'>";
				html += "<button class='btn btn-xs btn-default' ng-click='portStatus(portId,obj.value)' >Set</button>";
				return html;
			}
			*/
		}
	});



})();
